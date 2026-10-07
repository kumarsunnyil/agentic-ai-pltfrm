/**
 * ------------------------------------------------------------
 * @file: src\modules\workflows\entities\workflow.entity.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { WorkflowStatus } from '../types/workflow.types';

@Entity('workflows')
export class WorkflowEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({
    type: 'enum',
    enum: WorkflowStatus,
  })
  status!: WorkflowStatus;

  @Column({ type: 'integer', default: 0 })
  progress!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
