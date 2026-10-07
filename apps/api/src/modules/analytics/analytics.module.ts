/**
 * ------------------------------------------------------------
 * @file: src\modules\analytics\analytics.module.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalyticsController } from './analytics.controller';
import { AnalyticsRepository } from './repositories/analytics.repository';
import { AnalyticsService } from './analytics.service';
import { AiUsageEntity } from './entities/ai-usage.entity';
import { AnalyticsSeed } from './analytics.seed';

@Module({
  imports: [TypeOrmModule.forFeature([AiUsageEntity])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsRepository, AnalyticsSeed],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
