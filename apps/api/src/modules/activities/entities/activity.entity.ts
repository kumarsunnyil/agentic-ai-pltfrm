/**
 * ------------------------------------------------------------
 * @file: src\modules\activities\entities\activity.entity.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import type { ActivityType } from '../types/activity.types';

@Entity('activities')
export class ActivityEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 32 })
  type!: ActivityType;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
