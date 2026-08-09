/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/services/dashboard.service.ts
 * @description: Dashboard data service.
 * @author: Sunil.S.Kumar
 * @date: 09-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { AI_USAGE_DATA } from "../constants/chart.constants";
import { KPI_DATA } from "../constants/dashboard.constants";

export async function getDashboardData() {
  return {
    kpis: KPI_DATA,
    aiUsage: AI_USAGE_DATA,
  };
}