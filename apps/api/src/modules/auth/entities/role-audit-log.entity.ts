import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserRole } from '../types/auth.types';

@Entity('role_audit_logs')
export class RoleAuditLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  actorUserId!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  actorEmail?: string | null;

  @Column({ type: 'varchar', length: 201, nullable: true })
  actorName?: string | null;

  @Column({ type: 'uuid' })
  targetUserId!: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'USER_ROLES_UPDATED',
  })
  action!: string;

  @Column({ type: 'varchar', length: 255 })
  targetEmail!: string;

  @Column({ type: 'varchar', array: true })
  previousRoles!: UserRole[];

  @Column({ type: 'varchar', array: true })
  newRoles!: UserRole[];

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown> | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
