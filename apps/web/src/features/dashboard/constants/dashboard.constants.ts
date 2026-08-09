/**
 * ------------------------------------------------------------
 * @file: src\features\dashboard\constants\dashboard.constants.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { DashboardKpi } from "../types/dashboard.types";

export const KPI_DATA: DashboardKpi[] = [
  {
    id: "agents",
    title: "AI Agents",
    value: 24,
    subtitle: "Active agents",
    icon: "agents",
  },
  {
    id: "documents",
    title: "Documents",
    value: 1248,
    subtitle: "Knowledge documents",
    icon: "documents",
  },
  {
    id: "chats",
    title: "AI Chats",
    value: 386,
    subtitle: "Conversations",
    icon: "chats",
  },
  {
    id: "workflows",
    title: "Workflows",
    value: 16,
    subtitle: "Active workflows",
    icon: "workflows",
  },
];