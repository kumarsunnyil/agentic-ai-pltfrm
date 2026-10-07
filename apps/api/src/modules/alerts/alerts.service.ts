/**
 * ------------------------------------------------------------
 * @file: src\modules\alerts\alerts.service.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';

import { AlertsRepository } from './repositories/alerts.repository';
import type { Alert } from './types/alert.types';

@Injectable()
export class AlertsService {
  constructor(private readonly alertsRepository: AlertsRepository) {}

  async getAlerts(): Promise<Alert[]> {
    return this.alertsRepository.findAll();
  }

  async countAlerts(): Promise<number> {
    return this.alertsRepository.count();
  }
}
