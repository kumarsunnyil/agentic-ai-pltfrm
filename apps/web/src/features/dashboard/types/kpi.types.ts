/**
 * ------------------------------------------------------------|
 * @file: src\features\dashboard\types\kpi.types.ts
 * @description: Reusable enterprise dashboard widget container.
 * @author: Sunil Kumar
 * @date: 07-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */


import { SvgIconComponent } from "@mui/icons-material";

export interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: SvgIconComponent;
  color: string;
}