/**
 * ------------------------------------------------------------
 * @file: src\modules\alerts\alerts.controller.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Controller, Get } from '@nestjs/common';

import { AlertsService } from './alerts.service';
import type { Alert } from './types/alert.types';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  async getAlerts(): Promise<Alert[]> {
    return this.alertsService.getAlerts();
  }
}
