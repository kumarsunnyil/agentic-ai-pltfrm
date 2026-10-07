/**
 * ------------------------------------------------------------
 * @file: src\modules\analytics\analytics.controller.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Controller, Get } from '@nestjs/common';

import { AnalyticsService } from './analytics.service';
import type { AiUsage } from './types/analytics.types';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('ai-usage')
  async getAiUsage(): Promise<AiUsage[]> {
    return this.analyticsService.getAiUsage();
  }
}
