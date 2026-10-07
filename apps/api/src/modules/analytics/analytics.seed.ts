/**
 * ------------------------------------------------------------
 * @file: src\modules\analytics\analytics.seed.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AiUsageEntity } from './entities/ai-usage.entity';

@Injectable()
export class AnalyticsSeed implements OnModuleInit {
  constructor(
    @InjectRepository(AiUsageEntity)
    private readonly repository: Repository<AiUsageEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const count = await this.repository.count();

    if (count > 0) {
      return;
    }

    const now = new Date();

    const usage: AiUsageEntity[] = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (6 - index));

      return {
        usageDate: date.toISOString().slice(0, 10),
        requests: 120 + index * 35,
        tokens: 85000 + index * 12500,
      };
    });

    await this.repository.save(usage);

    console.log(`Seeded ${usage.length} AI usage records.`);
  }
}
