"use client";

import { Grid } from "@mui/material";

import { KPI_DATA } from "../constants/dashboard.constants";

import KpiCard from "./KpiCard";

export default function KpiGrid() {
  return (
    <Grid container spacing={3}>
      {KPI_DATA.map((item) => (
        <Grid
          key={item.id}
          size={{ xs: 12, sm: 6, lg: 3 }}
        >
          <KpiCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
}