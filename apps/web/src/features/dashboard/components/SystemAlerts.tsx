/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/SystemAlerts.tsx
 * @description: Reusable Enterprise Dashboard System Alerts.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import {
  ErrorOutlined,
  InfoOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";

import {
  Alert,
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface SystemAlert {
  id: string;
  severity: "error" | "warning" | "info";
  title: string;
  description: string;
  time: string;
}

const alerts: SystemAlert[] = [
  {
    id: "alert-001",
    severity: "warning",
    title: "High token usage detected",
    description:
      "AI Workspace usage increased by 28% in the last hour.",
    time: "12 min ago",
  },
  {
    id: "alert-002",
    severity: "info",
    title: "Knowledge index updated",
    description:
      "The enterprise knowledge index completed successfully.",
    time: "32 min ago",
  },
  {
    id: "alert-003",
    severity: "error",
    title: "Agent execution failed",
    description:
      "Document Classification Agent failed during execution.",
    time: "48 min ago",
  },
];

const icons = {
  error: <ErrorOutlined />,
  warning: <WarningAmberOutlined />,
  info: <InfoOutlined />,
};

export default function SystemAlerts() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          System Alerts
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,
          }}
        >
          Platform events requiring attention
        </Typography>
      </Box>

      <Stack
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            severity={alert.severity}
            icon={icons[alert.severity]}
            variant="outlined"
            sx={{
              borderRadius: 2,
              alignItems: "flex-start",

              "& .MuiAlert-icon": {
                mt: 0.25,
              },

              "& .MuiAlert-message": {
                width: "100%",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
              }}
            >
              {alert.title}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 0.5,
              }}
            >
              {alert.description}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mt: 0.5,
              }}
            >
              {alert.time}
            </Typography>
          </Alert>
        ))}
      </Stack>
    </Paper>
  );
}