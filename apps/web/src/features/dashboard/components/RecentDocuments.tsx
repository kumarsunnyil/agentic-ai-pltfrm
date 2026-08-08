/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/RecentDocuments.tsx
 * @description: Responsive recent enterprise documents widget.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface DocumentItem {
  id: string;
  title: string;
  type: string;
  time: string;
  status: "Indexed" | "Processing" | "Failed";
}

const documents: DocumentItem[] = [
  {
    id: "doc-001",
    title: "Enterprise AI Architecture.pdf",
    type: "PDF",
    time: "10 min ago",
    status: "Indexed",
  },
  {
    id: "doc-002",
    title: "AI Governance Policy.docx",
    type: "DOCX",
    time: "24 min ago",
    status: "Indexed",
  },
  {
    id: "doc-003",
    title: "Agent Security Guidelines.pdf",
    type: "PDF",
    time: "41 min ago",
    status: "Processing",
  },
  {
    id: "doc-004",
    title: "Knowledge Management Strategy.pdf",
    type: "PDF",
    time: "1 hour ago",
    status: "Indexed",
  },
];

export default function RecentDocuments() {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: {
          xs: 360,
          sm: 390,
          md: 420,
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
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: {
            xs: 2,
            md: 3,
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
            Recent Documents
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Latest knowledge base activity
          </Typography>
        </Box>

        <IconButton
          size="small"
          aria-label="More document options"
          sx={{
            flexShrink: 0,
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>

      {/* Documents */}

      <Stack
        spacing={{
          xs: 1,
          sm: 1.5,
        }}
      >
        {documents.map((document) => (
          <Box
            key={document.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 1.25,
                sm: 2,
              },

              p: {
                xs: 1,
                sm: 1.5,
              },

              borderRadius: 2,

              minWidth: 0,

              transition: "background-color 0.2s ease",

              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            {/* Icon */}

            <Box
              sx={{
                width: {
                  xs: 36,
                  sm: 42,
                },

                height: {
                  xs: 36,
                  sm: 42,
                },

                borderRadius: 2,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                flexShrink: 0,

                backgroundColor: "action.hover",
                color: "primary.main",
              }}
            >
              <DescriptionOutlinedIcon
                sx={{
                  fontSize: {
                    xs: 20,
                    sm: 22,
                  },
                }}
              />
            </Box>

            {/* Content */}

            <Box
              sx={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography
                variant="body2"
                noWrap
                sx={{
                  fontWeight: 600,
                }}
              >
                {document.title}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
                sx={{
                  display: "block",
                  mt: 0.25,
                }}
              >
                {document.type} • {document.time}
              </Typography>
            </Box>

            {/* Status */}

            <Chip
              label={document.status}
              size="small"
              color={
                document.status === "Indexed"
                  ? "success"
                  : document.status === "Processing"
                    ? "warning"
                    : "error"
              }
              sx={{
                flexShrink: 0,

                display: {
                  xs: "none",
                  sm: "inline-flex",
                },
              }}
            />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}