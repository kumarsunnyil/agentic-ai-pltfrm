/**
 * ------------------------------------------------------------
 * @file: src\modules\documents\entities\document.entity.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import type { DocumentStatus } from '../types/document.types';

@Entity('documents')
export class DocumentEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 32 })
  type!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column({ type: 'varchar', length: 32 })
  status!: DocumentStatus;
}
