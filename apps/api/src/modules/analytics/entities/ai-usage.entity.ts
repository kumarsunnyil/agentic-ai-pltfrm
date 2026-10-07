/**
 * ------------------------------------------------------------
 * @file: src\modules\analytics\entities\ai-usage.entity.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ai_usage')
export class AiUsageEntity {
  @PrimaryColumn({ type: 'date' })
  usageDate!: string;

  @Column({ type: 'integer', default: 0 })
  requests!: number;

  @Column({ type: 'bigint', default: 0 })
  tokens!: number;
}
