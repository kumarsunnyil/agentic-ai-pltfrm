import { Injectable } from '@nestjs/common';

import type { DashboardData } from './types/dashboard.types';
import { DashboardRepository } from './repositories/dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  getDashboard(): DashboardData {
    return this.dashboardRepository.getDashboard();
  }
}
