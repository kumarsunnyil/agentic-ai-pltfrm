import { Controller, Get } from '@nestjs/common';

import { DashboardService } from './dashboard.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';

@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboard(): DashboardResponseDto {
    return this.dashboardService.getDashboard();
  }
}
