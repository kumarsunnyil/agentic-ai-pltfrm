import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from './repositories/analytics.repository';
import type { AiUsage } from './types/analytics.types';

@Injectable()
export class AnalyticsService {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}
  getAiUsage(): AiUsage[] {
    return this.analyticsRepository.getAiUsage();
  }
}
