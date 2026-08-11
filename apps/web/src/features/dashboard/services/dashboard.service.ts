/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/services/dashboard.service.ts
 * @description: Dashboard API data service.
 * @author: Sunil.S.Kumar
 * @date: 09-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import type { DashboardData } from "../types/dashboard.types";

const API_BASE_URL = process.env.BASE_API_URL ?? "http://localhost:5000";

export async function getDashboardData(): Promise<DashboardData> {
  const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch dashboard data: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<DashboardData>;
}
