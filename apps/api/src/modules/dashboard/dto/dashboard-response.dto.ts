import type { DashboardData } from '../types/dashboard.types';

export class DashboardResponseDto implements DashboardData {
  kpis!: DashboardData['kpis'];
  aiUsage!: DashboardData['aiUsage'];
  agents!: DashboardData['agents'];
  documents!: DashboardData['documents'];
  conversations!: DashboardData['conversations'];
  workflows!: DashboardData['workflows'];
  alerts!: DashboardData['alerts'];
  activities!: DashboardData['activities'];
}
