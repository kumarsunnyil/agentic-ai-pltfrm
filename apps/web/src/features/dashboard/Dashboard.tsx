/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/Dashboard.tsx
 * @description: Responsive Enterprise AI Platform Command Center.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import {
  Grid,
  Stack,
} from "@mui/material";

import AgentHealth from "./components/AgentHealth";
import ActivityTimeline from "./components/ActivityTimeline";
import AiUsageChart from "./components/AiUsageChart";
import DashboardHeader from "./components/DashboardHeader";
import KpiGrid from "./components/KpiGrid";
import RecentConversations from "./components/RecentConversations";
import RecentDocuments from "./components/RecentDocuments";
import SystemAlerts from "./components/SystemAlerts";
import WelcomeBanner from "./components/WelcomeBanner";
import WorkflowStatus from "./components/WorkflowStatus";

export default function Dashboard() {
  return (
    <Stack
      spacing={{
        xs: 2,
        sm: 2.5,
        md: 3,
      }}
      sx={{
        width: "100%",
        minWidth: 0,
      }}
    >
      <DashboardHeader />
      <WelcomeBanner />
      <KpiGrid />
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 2.5,
          md: 3,
        }}
      >
        <Grid
          size={{
            xs: 12,
            lg: 8,
          }}
        >
          <AiUsageChart />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <AgentHealth />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 2.5,
          md: 3,
        }}
      >
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <RecentDocuments />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <RecentConversations />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 2.5,
          md: 3,
        }}
      >
        <Grid
          size={{
            xs: 12,
            md: 7,
          }}
        >
          <WorkflowStatus />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
        >
          <SystemAlerts />
        </Grid>
      </Grid>
      <ActivityTimeline />
    </Stack>
  );
}