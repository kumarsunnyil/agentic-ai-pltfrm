/**
 * ------------------------------------------------------------
 * @file: src\modules\activities\activities.module.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivitiesController } from './activities.controller';
import { ActivitiesSeed } from './activities.seed';
import { ActivityEntity } from './entities/activity.entity';
import { ActivitiesRepository } from './repositories/activities.repository';
import { ActivitiesService } from './activities.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, ActivitiesRepository, ActivitiesSeed],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
