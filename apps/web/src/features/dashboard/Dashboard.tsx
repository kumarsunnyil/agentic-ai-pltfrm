/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/Dashboard.tsx
 * @description: Enterprise AI Platform Command Center.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import { Box, Grid, Stack } from "@mui/material";

import ActivityTimeline from "./components/ActivityTimeline";
import AgentHealth from "./components/AgentHealth";
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
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minWidth: 0,

        "&::before": {
          content: '""',
          position: "fixed",
          width: {
            xs: 220,
            md: 420,
          },
          height: {
            xs: 220,
            md: 420,
          },
          top: {
            xs: 80,
            md: 100,
          },
          right: {
            xs: -120,
            md: -160,
          },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        },

        "&::after": {
          content: '""',
          position: "fixed",
          width: {
            xs: 180,
            md: 320,
          },
          height: {
            xs: 180,
            md: 320,
          },
          bottom: {
            xs: -80,
            md: -100,
          },
          left: {
            xs: -80,
            md: -120,
          },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <Stack
        spacing={{
          xs: 2,
          sm: 2.5,
          md: 3,
        }}
        sx={{
          position: "relative",
          zIndex: 1,
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
    </Box>
  );
}