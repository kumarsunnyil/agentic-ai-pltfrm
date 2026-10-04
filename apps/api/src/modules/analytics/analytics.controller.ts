import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import type { AiUsage } from './types/analytics.types';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('ai-usage')
  getAiUsage(): AiUsage[] {
    return this.analyticsService.getAiUsage();
  }
}
