/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/KpiGrid.tsx
 * @description: Responsive Enterprise Dashboard KPI grid.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import { Grid } from "@mui/material";

import { KPI_DATA } from "../constants/dashboard.constants";

import KpiCard from "./KpiCard";

export default function KpiGrid() {
  return (
    <Grid
      container
      spacing={{
        xs: 2,
        sm: 2.5,
        md: 3,
      }}
      sx={{
        width: "100%",
      }}
    >
      {KPI_DATA.map((item) => (
        <Grid
          key={item.id}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <KpiCard
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={item.icon}
          />
        </Grid>
      ))}
    </Grid>
  );
}