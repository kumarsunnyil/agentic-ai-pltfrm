import { Controller, Get } from '@nestjs/common';

import { DashboardService } from './dashboard.service';
import type { DashboardData } from './types/dashboard.types';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard(): Promise<DashboardData> {
    return this.dashboardService.getDashboard();
  }
}
