/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/WorkflowStatus.tsx
 * @description: Responsive enterprise workflow status widget.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface Workflow {
  id: string;
  name: string;
  status: "Running" | "Completed" | "Queued";
  progress: number;
}

const workflows: Workflow[] = [
  {
    id: "wf-001",
    name: "Document Ingestion",
    status: "Running",
    progress: 72,
  },
  {
    id: "wf-002",
    name: "Knowledge Synchronization",
    status: "Running",
    progress: 48,
  },
  {
    id: "wf-003",
    name: "Daily AI Evaluation",
    status: "Queued",
    progress: 0,
  },
  {
    id: "wf-004",
    name: "Vector Index Refresh",
    status: "Completed",
    progress: 100,
  },
];

const statusColor = {
  Running: "info",
  Completed: "success",
  Queued: "warning",
} as const;

export default function WorkflowStatus() {
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
          alignItems: "center",
          gap: 1.5,
          mb: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: 38,
              sm: 42,
            },
            height: {
              xs: 38,
              sm: 42,
            },
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "primary.light",
            background: "rgba(59,130,246,0.09)",
            border: "1px solid rgba(59,130,246,0.12)",
          }}
        >
          <AccountTreeOutlinedIcon
            sx={{
              fontSize: {
                xs: 20,
                sm: 22,
              },
            }}
          />
        </Box>

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
            Workflow Status
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
            Active platform workflows
          </Typography>
        </Box>
      </Box>

      <Stack
        spacing={{
          xs: 1.75,
          sm: 2,
          md: 2.5,
        }}
      >
        {workflows.map((workflow) => (
          <Box
            key={workflow.id}
            sx={{
              p: {
                xs: 1.25,
                sm: 1.5,
              },
              borderRadius: 2,
              border: "1px solid rgba(148,163,184,0.08)",
              backgroundColor: "rgba(255,255,255,0.015)",
              transition: "background-color 180ms ease, border-color 180ms ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.035)",
                borderColor: "rgba(148,163,184,0.14)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },
                gap: 1.5,
                mb: 1,
              }}
            >
              <Typography
                variant="body2"
                noWrap
                sx={{
                  minWidth: 0,
                  fontWeight: 600,
                  fontSize: {
                    xs: 12,
                    sm: 13,
                    md: 14,
                  },
                }}
              >
                {workflow.name}
              </Typography>

              <Chip
                label={workflow.status}
                color={statusColor[workflow.status]}
                size="small"
                sx={{
                  flexShrink: 0,
                  height: {
                    xs: 23,
                    sm: 25,
                  },
                  fontSize: {
                    xs: 10,
                    sm: 11,
                  },
                  fontWeight: 600,
                }}
              />
            </Box>

            <LinearProgress
              variant="determinate"
              value={workflow.progress}
              sx={{
                height: {
                  xs: 6,
                  sm: 7,
                },
                borderRadius: 10,
                backgroundColor: "rgba(148,163,184,0.12)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 10,
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 0.75,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: 10,
                    sm: 11,
                  },
                }}
              >
                Progress
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: 10,
                    sm: 11,
                  },
                  fontWeight: 600,
                }}
              >
                {workflow.progress}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}