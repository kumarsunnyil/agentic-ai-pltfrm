/**
 * ------------------------------------------------------------
 * @file: src\modules\auth\auth.service.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 08-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { DataSource, Repository } from 'typeorm';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from './entities/user.entity';
import { AuthenticatedUser, UserRole } from './types/auth.types';
import { RoleAuditLogEntity } from './entities/role-audit-log.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async register(registerDto: RegisterDto) {
    const email = registerDto.email.trim().toLowerCase();

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 12);

    const user = this.userRepository.create({
      email,
      passwordHash,
      firstName: registerDto.firstName.trim(),
      lastName: registerDto.lastName.trim(),
      roles: [UserRole.Reader],
      isActive: true,
    });

    const savedUser = await this.userRepository.save(user);

    return this.toPublicUser(savedUser);
  }

  async login(loginDto: LoginDto) {
    const email = loginDto.email.trim().toLowerCase();

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: AuthenticatedUser = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: this.toPublicUser(user),
    };
  }

  async validateUser(userId: string): Promise<AuthenticatedUser> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isActive: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
  }

  private toPublicUser(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      isActive: user.isActive,
    };
  }
  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isActive: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return this.toPublicUser(user);
  }

  async listUsers() {
    const users = await this.userRepository.find({
      order: { createdAt: 'DESC' },
    });

    return users.map((user) => this.toPublicUser(user));
  }

  async updateUserRoles(actorUserId: string, userId: string, roles: UserRole[]) {
    const uniqueRoles = [...new Set(roles)];

    if (uniqueRoles.length === 0) {
      throw new BadRequestException('At least one role must be assigned');
    }

    return this.dataSource.transaction(async (manager) => {
      // Serialize role changes to prevent concurrent demotions
      // from removing the final active Super Admin.
      await manager.query('SELECT pg_advisory_xact_lock($1)', [1791634440]);

      const userRepository = manager.getRepository(UserEntity);
      const auditRepository = manager.getRepository(RoleAuditLogEntity);

      const user = await userRepository.findOne({
        where: { id: userId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isRemovingSuperAdmin =
        user.isActive &&
        user.roles.includes(UserRole.SuperAdmin) &&
        !uniqueRoles.includes(UserRole.SuperAdmin);

      if (isRemovingSuperAdmin) {
        const activeSuperAdminCount = await userRepository
          .createQueryBuilder('user')
          .where('user.isActive = :isActive', { isActive: true })
          .andWhere(':role = ANY(user.roles)', {
            role: UserRole.SuperAdmin,
          })
          .getCount();

        if (activeSuperAdminCount <= 1) {
          throw new ForbiddenException('Cannot remove the last active Super Admin');
        }
      }

      const previousRoles = [...user.roles];

      // Avoid creating unnecessary audit entries for no-op updates.
      const rolesChanged =
        previousRoles.length !== uniqueRoles.length ||
        previousRoles.some((role) => !uniqueRoles.includes(role));

      if (!rolesChanged) {
        return this.toPublicUser(user);
      }

      user.roles = uniqueRoles;

      const savedUser = await userRepository.save(user);

      await auditRepository.save(
        auditRepository.create({
          actorUserId,
          targetUserId: savedUser.id,
          targetEmail: savedUser.email,
          action: 'USER_ROLES_UPDATED',
          previousRoles,
          newRoles: [...savedUser.roles],
        }),
      );

      return {
        ...this.toPublicUser(savedUser),
        roleChange: {
          previousRoles,
          newRoles: savedUser.roles,
        },
      };
    });
  }
}
