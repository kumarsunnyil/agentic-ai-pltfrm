/**
 * ------------------------------------------------------------
 * @file: src\modules\analytics\analytics.service.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';

import { AnalyticsRepository } from './repositories/analytics.repository';
import type { AiUsage } from './types/analytics.types';

@Injectable()
export class AnalyticsService {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async getAiUsage(): Promise<AiUsage[]> {
    return this.analyticsRepository.findAiUsage();
  }
}
