"use client";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";

import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function WelcomeBanner() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 6,
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#4F8EF7 0%, #3B82F6 100%)",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "2fr 1fr",
          },
          gap: 4,
          alignItems: "center",
          p: 4,
          minHeight: 220,
        }}
      >
        {/* LEFT CONTENT */}

        <Box>
          <Chip
            icon={<AutoAwesomeRoundedIcon />}
            label="Enterprise AI Platform"
            sx={{
              mb: 2,
              bgcolor: "rgba(255,255,255,.15)",
              color: "#fff",

              "& .MuiChip-icon": {
                color: "#fff",
              },
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Enterprise Command Center
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              lineHeight: 1.8,
              opacity: 0.95,
              maxWidth: 1500,
            }}
          >
            Monitor AI agents, enterprise knowledge,
            intelligent workflows, document processing,
            analytics, and real-time platform health from a
            single command center.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              mt: 4,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              startIcon={<CloudUploadRoundedIcon />}
              sx={{
                bgcolor: "#8B5CF6",

                "&:hover": {
                  bgcolor: "#7C3AED",
                },
              }}
            >
              Upload Document
            </Button>

            <Button
              variant="outlined"
              startIcon={<SmartToyRoundedIcon />}
              color="inherit"
            >
              AI Chat
            </Button>

            <Button
              variant="outlined"
              startIcon={<TimelineRoundedIcon />}
              color="inherit"
            >
              Workflow Studio
            </Button>
          </Stack>
        </Box>

        {/* RIGHT PANEL */}

        <Paper
          elevation={0}
          sx={{
            bgcolor: "rgba(255,255,255,.12)",
            backdropFilter: "blur(20px)",
            borderRadius: 5,
            p: 3,
            border: "1px solid rgba(255,255,255,.15)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: "#fff",
              fontWeight: 700,
            }}
          >
            AI Platform Status
          </Typography>

          <Stack spacing={2}>
            <StatusRow
              label="AI Agents"
              value="24"
              color="#22C55E"
            />

            <StatusRow
              label="Documents"
              value="1,248"
              color="#22C55E"
            />

            <StatusRow
              label="Models"
              value="3"
              color="#22C55E"
            />

            <StatusRow
              label="Workflows"
              value="16"
              color="#22C55E"
            />
          </Stack>
        </Paper>
      </Box>
    </Paper>
  );
}

interface StatusRowProps {
  label: string;
  value: string;
  color: string;
}

function StatusRow({
  label,
  value,
  color,
}: StatusRowProps) {
  return (
    <Stack
      sx={{
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",

      }}
    >
      <Typography
        sx={{
          color: "#fff",
        }}
      >
        {label}
      </Typography>

      <Stack
        sx={{

          direction: "row",
        wordSpacing: 1,
          alignItems: "center"
          
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: color,
          }}
        />

        <Typography
          sx={{
            color: "#fff",
            fontWeight:700,
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
}