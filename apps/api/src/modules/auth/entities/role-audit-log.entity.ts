import { CreateDateColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserRole } from '../types/auth.types';

@Entity('role_audit_logs')
export class RoleAuditLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  actorUserId!: string;

  @Column({ type: 'uuid' })
  targetUserId!: string;

  @Column({ type: 'varchar', length: 50, default: 'USER_ROLES_UPDATED' })
  action!: string;

  @Column({ type: 'varchar', length: 255 })
  targetEmail!: string;

  @Column({ type: 'varchar', array: true })
  previousRoles!: UserRole[];

  @Column({ type: 'varchar', array: true })
  newRoles!: UserRole[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
