/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/services/dashboard.service.ts
 * @description: Dashboard data service.
 * @author: Sunil.S.Kumar
 * @date: 09-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { DASHBOARD_DATA } from "../constants/dashboard.data";
import type { DashboardData } from "../types/dashboard.types";

export function getDashboardData(): DashboardData {
  return DASHBOARD_DATA;
}