import { Injectable } from '@nestjs/common';

import { AlertsRepository } from './repositories/alerts.repository';
import type { Alert } from './types/alert.types';

@Injectable()
export class AlertsService {
  constructor(private readonly alertsRepository: AlertsRepository) {}

  getAlerts(): Alert[] {
    return this.alertsRepository.getAlerts();
  }
}
