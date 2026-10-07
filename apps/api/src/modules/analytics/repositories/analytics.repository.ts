/**
 * ------------------------------------------------------------
 * @file: src\modules\analytics\repositories\analytics.repository.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AiUsageEntity } from '../entities/ai-usage.entity';
import type { AiUsage } from '../types/analytics.types';

@Injectable()
export class AnalyticsRepository {
  constructor(
    @InjectRepository(AiUsageEntity)
    private readonly repository: Repository<AiUsageEntity>,
  ) {}

  async findAiUsage(): Promise<AiUsage[]> {
    const usage = await this.repository.find({
      order: {
        usageDate: 'ASC',
      },
    });

    return usage.map((item) => this.toDomain(item));
  }

  private toDomain(item: AiUsageEntity): AiUsage {
    return {
      day: this.formatDay(item.usageDate),
      requests: item.requests,
      tokens: item.tokens,
    };
  }

  private formatDay(date: string): string {
    return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
      weekday: 'short',
    });
  }
}
