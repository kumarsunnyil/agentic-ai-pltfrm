import { Controller, Get } from '@nestjs/common';

import { AlertsService } from './alerts.service';
import type { Alert } from './types/alert.types';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsSerivce: AlertsService) {}

  @Get()
  getAlerts(): Alert[] {
    return this.alertsSerivce.getAlerts();
  }
}
