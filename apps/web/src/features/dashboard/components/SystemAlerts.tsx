/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/SystemAlerts.tsx
 * @description: Responsive enterprise system alerts widget.
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
        width: "100%",

        height: "100%",

        minHeight: {
          xs: 390,
          sm: 420,
          md: 450,
        },

        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },

        borderRadius: {
          xs: 2.5,
          md: 4,
        },

        border: "1px solid",

        borderColor:
          "rgba(148,163,184,0.15)",

        background:
          "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.96))",

        boxShadow:
          "0 8px 28px rgba(0,0,0,0.10)",

        transition:
          "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",

        "&:hover": {
          transform: "translateY(-2px)",

          borderColor:
            "rgba(59,130,246,0.28)",

          boxShadow:
            "0 12px 32px rgba(0,0,0,0.16)",
        },
      }}
    >
      <Box
        sx={{
          mb: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,

            fontSize: {
              xs: 16,
              sm: 17,
              md: 18,
            },
          }}
        >
          System Alerts
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,

            fontSize: {
              xs: 12,
              sm: 13,
            },
          }}
        >
          Platform events requiring attention
        </Typography>
      </Box>
      <Stack
        spacing={{
          xs: 1.25,
          sm: 1.5,
          md: 2,
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

              px: {
                xs: 1.25,
                sm: 1.5,
              },

              py: {
                xs: 1,
                sm: 1.25,
              },

              backgroundColor:
                "rgba(255,255,255,0.015)",

              transition:
                "background-color 180ms ease, transform 180ms ease",

              "&:hover": {
                backgroundColor:
                  "rgba(255,255,255,0.035)",

                transform: "translateX(2px)",
              },

              "& .MuiAlert-icon": {
                mt: 0.25,

                mr: {
                  xs: 1,
                  sm: 1.5,
                },
              },

              "& .MuiAlert-message": {
                minWidth: 0,

                width: "100%",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 13,
                  sm: 14,
                },

                fontWeight: 700,

                lineHeight: 1.4,
              }}
            >
              {alert.title}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  sm: 13,
                },

                color: "text.secondary",

                display: "block",

                mt: 0.5,

                lineHeight: 1.5,
              }}
            >
              {alert.description}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 11,
                  sm: 12,
                },

                color: "text.secondary",

                display: "block",

                mt: 0.75,
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