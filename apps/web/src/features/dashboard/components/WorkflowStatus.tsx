/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/ActivityTimeline.tsx
 * @description: Responsive enterprise platform activity timeline.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "agent" | "document" | "workflow";
}

const activities: Activity[] = [
  {
    id: "activity-001",
    title: "AI Agent completed execution",
    description: "Document Classification Agent processed 128 documents.",
    time: "8 min ago",
    type: "agent",
  },
  {
    id: "activity-002",
    title: "Knowledge document indexed",
    description: "Enterprise AI Architecture was added to the knowledge base.",
    time: "21 min ago",
    type: "document",
  },
  {
    id: "activity-003",
    title: "Workflow completed",
    description: "Knowledge Indexing workflow completed successfully.",
    time: "38 min ago",
    type: "workflow",
  },
];

const activityIcons = {
  agent: SmartToyOutlinedIcon,
  document: DescriptionOutlinedIcon,
  workflow: CheckCircleOutlineIcon,
};

const activityLabels = {
  agent: "AI Agent",
  document: "Knowledge",
  workflow: "Workflow",
};

export default function ActivityTimeline() {
  const agentActivities = activities.filter(
    (activity) => activity.type === "agent",
  ).length;

  const documentActivities = activities.filter(
    (activity) => activity.type === "document",
  ).length;

  const workflowActivities = activities.filter(
    (activity) => activity.type === "workflow",
  ).length;

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        p: { xs: 2, sm: 2.5, md: 3 },
        borderRadius: { xs: 2.5, md: 4 },
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
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: { xs: 2, md: 2.5 },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 16, sm: 17, md: 18 },
            }}
          >
            Recent Activity
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              fontSize: { xs: 12, sm: 13 },
            }}
          >
            Latest platform events
          </Typography>
        </Box>

        <Chip
          label={`${activities.length} Events`}
          size="small"
          variant="outlined"
          color="primary"
          sx={{
            flexShrink: 0,
            height: { xs: 24, sm: 26 },
            fontSize: { xs: 10, sm: 11 },
            fontWeight: 600,
          }}
        />
      </Box>

      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 1.5 }}
        sx={{ mb: { xs: 2.5, md: 3 } }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            px: { xs: 1, sm: 1.25 },
            py: { xs: 0.75, sm: 1 },
            borderRadius: 2,
            backgroundColor: "rgba(59,130,246,0.06)",
            border: "1px solid rgba(59,130,246,0.10)",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Agents
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontWeight: 700,
              fontSize: { xs: 16, sm: 18 },
            }}
          >
            {agentActivities}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            px: { xs: 1, sm: 1.25 },
            py: { xs: 0.75, sm: 1 },
            borderRadius: 2,
            backgroundColor: "rgba(168,85,247,0.06)",
            border: "1px solid rgba(168,85,247,0.10)",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Knowledge
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontWeight: 700,
              fontSize: { xs: 16, sm: 18 },
            }}
          >
            {documentActivities}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            px: { xs: 1, sm: 1.25 },
            py: { xs: 0.75, sm: 1 },
            borderRadius: 2,
            backgroundColor: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.10)",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Workflows
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontWeight: 700,
              fontSize: { xs: 16, sm: 18 },
            }}
          >
            {workflowActivities}
          </Typography>
        </Box>
      </Stack>

      <Stack
        spacing={{ xs: 2, md: 2.5 }}
      >
        {activities.map((activity, index) => {
          const ActivityIcon = activityIcons[activity.type];
          const isLast = index === activities.length - 1;

          return (
            <Box
              key={activity.id}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "flex-start",
                gap: { xs: 1.5, sm: 2 },
                minWidth: 0,
              }}
            >
              {!isLast && (
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 17, sm: 20 },
                    top: { xs: 36, sm: 42 },
                    bottom: { xs: -24, md: -28 },
                    width: 1,
                    backgroundColor: "rgba(148,163,184,0.16)",
                  }}
                />
              )}

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: { xs: 36, sm: 42 },
                  height: { xs: 36, sm: 42 },
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "primary.light",
                  background: "rgba(59,130,246,0.10)",
                  border: "1px solid rgba(59,130,246,0.18)",
                  boxShadow: "0 0 0 4px rgba(15,23,42,0.85)",
                }}
              >
                <ActivityIcon
                  sx={{
                    fontSize: { xs: 18, sm: 21 },
                  }}
                />
              </Box>

              <Box
                sx={{
                  minWidth: 0,
                  flex: 1,
                  pb: isLast ? 0 : 0.25,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                    gap: { xs: 0.5, sm: 2 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: 12, sm: 13, md: 14 },
                      }}
                    >
                      {activity.title}
                    </Typography>

                    <Chip
                      label={activityLabels[activity.type]}
                      size="small"
                      variant="outlined"
                      sx={{
                        display: { xs: "none", md: "inline-flex" },
                        height: 21,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      flexShrink: 0,
                      fontSize: { xs: 10, sm: 11 },
                    }}
                  >
                    {activity.time}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                    fontSize: { xs: 12, sm: 13 },
                    lineHeight: 1.5,
                    maxWidth: 900,
                  }}
                >
                  {activity.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Paper>
  );
}