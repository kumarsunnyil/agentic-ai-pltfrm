/**
 * ------------------------------------------------------------
 * @file: src\modules\alerts\alerts.module.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlertsController } from './alerts.controller';
import { AlertsSeed } from './alerts.seed';
import { AlertEntity } from './entities/alert.entity';
import { AlertsRepository } from './repositories/alerts.repository';
import { AlertsService } from './alerts.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlertEntity])],
  controllers: [AlertsController],
  providers: [AlertsService, AlertsRepository, AlertsSeed],
  exports: [AlertsService],
})
export class AlertsModule {}
