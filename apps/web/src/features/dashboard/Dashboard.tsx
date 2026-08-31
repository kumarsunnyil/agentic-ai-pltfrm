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

import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
import { getDashboardData } from "./services/dashboard.service";
import type { DashboardData } from "./types/dashboard.types";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const data = await getDashboardData();

        if (mounted) {
          setDashboardData(data);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed! Dashboard data loading.",
          );
        }
      }
    }

    void loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return (
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          p: 3,
        }}
      >
        <Typography color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        "&::before": {
          content: '""',
          position: "fixed",
          width: { xs: 220, md: 420 },
          height: { xs: 220, md: 420 },
          top: { xs: 80, md: 100 },
          right: { xs: -120, md: -160 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "fixed",
          width: { xs: 180, md: 320 },
          height: { xs: 180, md: 320 },
          bottom: { xs: -80, md: -100 },
          left: { xs: -80, md: -120 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <Stack
        spacing={{ xs: 2, sm: 2.5, md: 3 }}
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
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
        >
          <Grid size={{ xs: 12, lg: 8 }}>
            <AiUsageChart aiUsage={dashboardData.aiUsage} />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <AgentHealth agents={dashboardData.agents} />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <RecentDocuments documents={dashboardData.documents} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <RecentConversations conversations={dashboardData.conversations} />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
        >
          <Grid size={{ xs: 12, md: 7 }}>
            <WorkflowStatus workflows={dashboardData.workflows} />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <SystemAlerts alerts={dashboardData.alerts} />
          </Grid>
        </Grid>

        <ActivityTimeline activities={dashboardData.activities} />
      </Stack>
    </Box>
  );
}