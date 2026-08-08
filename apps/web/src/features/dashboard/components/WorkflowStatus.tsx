/**
 * ------------------------------------------------------------
 * @file: src\features\dashboard\components\WorkflowStatus.tsx
 * @description: Reusable Enterprise Dashboard Container.
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
        p: 3,
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{

          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}
      >
        <AccountTreeOutlinedIcon />

        <Box>
          <Typography
            variant="h6"
            sx={{

              fontWeight: 700
            }}
          >
            Workflow Status
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Active platform workflows
          </Typography>
        </Box>
      </Box>

      <Stack spacing={2.5}>
        {workflows.map((workflow) => (
          <Box key={workflow.id}>
            <Box
              sx={{

                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{

                  fontWeight: 600,
                }}
              >
                {workflow.name}
              </Typography>

              <Chip
                label={workflow.status}
                color={statusColor[workflow.status]}
                size="small"
              />
            </Box>

            <LinearProgress
              variant="determinate"
              value={workflow.progress}
              sx={{
                height: 6,
                borderRadius: 3,
              }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, display: "block" }}
            >
              {workflow.progress}% complete
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}