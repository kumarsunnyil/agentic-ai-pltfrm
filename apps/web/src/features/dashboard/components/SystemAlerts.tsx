/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/SystemAlerts.tsx
 * @description: Reusable Enterprise Dashboard Container.
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
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { DashboardAlert } from "../types/dashboard.types";

interface SystemAlertsProps {
  alerts: DashboardAlert[];
}

const icons = {
  error: <ErrorOutlined />,
  warning: <WarningAmberOutlined />,
  info: <InfoOutlined />,
};

const severityLabel = {
  error: "Critical",
  warning: "Warning",
  info: "Information",
};

export default function SystemAlerts({
  alerts,
}: SystemAlertsProps) {
  const errorCount = alerts.filter(
    (alert) => alert.severity === "error",
  ).length;

  const warningCount = alerts.filter(
    (alert) => alert.severity === "warning",
  ).length;

  const infoCount = alerts.filter(
    (alert) => alert.severity === "info",
  ).length;

  const highestSeverity =
    errorCount > 0
      ? "error"
      : warningCount > 0
        ? "warning"
        : "info";

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
        borderColor: "rgba(148,163,184,0.15)",
        background: "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.96))",
        boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "rgba(59,130,246,0.28)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          gap: 2,
          mb: {
            xs: 2,
            md: 2.5,
          },
        }}
      >
        <Box
          sx={{
            minWidth: 0,
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

        <Chip
          label={`${alerts.length} Active`}
          color={highestSeverity}
          size="small"
          variant="outlined"
          sx={{
            flexShrink: 0,
            height: {
              xs: 24,
              sm: 26,
            },
            fontSize: {
              xs: 10,
              sm: 11,
            },
            fontWeight: 600,
          }}
        />
      </Box>

      <Stack
        direction="row"
        spacing={{
          xs: 1,
          sm: 1.5,
        }}
        sx={{
          mb: {
            xs: 2,
            md: 2.5,
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            px: {
              xs: 1,
              sm: 1.25,
            },
            py: {
              xs: 0.75,
              sm: 1,
            },
            borderRadius: 2,
            backgroundColor: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.10)",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Critical
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontWeight: 700,
              fontSize: {
                xs: 16,
                sm: 18,
              },
              color:
                errorCount > 0
                  ? "error.light"
                  : "text.primary",
            }}
          >
            {errorCount}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            px: {
              xs: 1,
              sm: 1.25,
            },
            py: {
              xs: 0.75,
              sm: 1,
            },
            borderRadius: 2,
            backgroundColor: "rgba(245,158,11,0.06)",
            border: "1px solid rgba(245,158,11,0.10)",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Warning
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontWeight: 700,
              fontSize: {
                xs: 16,
                sm: 18,
              },
              color:
                warningCount > 0
                  ? "warning.light"
                  : "text.primary",
            }}
          >
            {warningCount}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            px: {
              xs: 1,
              sm: 1.25,
            },
            py: {
              xs: 0.75,
              sm: 1,
            },
            borderRadius: 2,
            backgroundColor: "rgba(59,130,246,0.06)",
            border: "1px solid rgba(59,130,246,0.10)",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Info
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontWeight: 700,
              fontSize: {
                xs: 16,
                sm: 18,
              },
            }}
          >
            {infoCount}
          </Typography>
        </Box>
      </Stack>

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
              backgroundColor: "rgba(255,255,255,0.015)",
              transition: "background-color 180ms ease, transform 180ms ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.035)",
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
            <Box
              sx={{
                display: "flex",
                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },
                justifyContent: "space-between",
                gap: 1,
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
                variant="caption"
                color="text.secondary"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                  flexShrink: 0,
                  fontSize: 10,
                }}
              >
                {severityLabel[alert.severity]}
              </Typography>
            </Box>

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