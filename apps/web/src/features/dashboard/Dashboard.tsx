"use client";

import { Grid, Stack } from "@mui/material";

import DashboardHeader from "./components/DashboardHeader";
import WelcomeBanner from "./components/WelcomeBanner";
import KpiGrid from "./components/KpiGrid";
import AiUsageChart from "./components/AiUsageChart";
import AgentHealth from "./components/AgentHealth";

export default function Dashboard() {
  return (
    <Stack spacing={3}>
      <DashboardHeader />

      <WelcomeBanner />

      <KpiGrid />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AiUsageChart />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <AgentHealth />
        </Grid>
      </Grid>
    </Stack>
  );
}