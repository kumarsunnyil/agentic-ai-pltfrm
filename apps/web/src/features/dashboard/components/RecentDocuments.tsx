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

import type { DashboardDocument } from "../types/dashboard.types";

interface RecentDocumentsProps {
  documents: DashboardDocument[];
}

export default function RecentDocuments({
  documents,
}: RecentDocumentsProps) {
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
              letterSpacing: -0.2,
            }}
          >
            Recent Documents
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
            Latest knowledge base activity
          </Typography>
        </Box>

        <IconButton
          size="small"
          aria-label="More document options"
          sx={{
            flexShrink: 0,
            borderRadius: 2,
            transition: "background-color 180ms ease",
            "&:hover": {
              backgroundColor: "rgba(59,130,246,0.10)",
            },
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>

      <Stack
        spacing={{
          xs: 0.75,
          sm: 1,
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
                sm: 1.5,
                md: 2,
              },
              p: {
                xs: 1,
                sm: 1.25,
                md: 1.5,
              },
              borderRadius: 2,
              minWidth: 0,
              border: "1px solid transparent",
              cursor: "pointer",
              transition: "background-color 180ms ease, border-color 180ms ease, transform 180ms ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.035)",
                borderColor: "rgba(148,163,184,0.10)",
                transform: "translateX(2px)",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 36,
                  sm: 40,
                  md: 42,
                },
                height: {
                  xs: 36,
                  sm: 40,
                  md: 42,
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
              <DescriptionOutlinedIcon
                sx={{
                  fontSize: {
                    xs: 19,
                    sm: 21,
                    md: 22,
                  },
                }}
              />
            </Box>

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
                  fontSize: {
                    xs: 12,
                    sm: 13,
                    md: 14,
                  },
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
                  fontSize: {
                    xs: 10,
                    sm: 11,
                    md: 12,
                  },
                }}
              >
                {document.type} • {document.time}
              </Typography>
            </Box>

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
                height: {
                  sm: 24,
                  md: 26,
                },
                display: {
                  xs: "none",
                  sm: "inline-flex",
                },
                fontSize: {
                  sm: 10,
                  md: 11,
                },
                fontWeight: 600,
              }}
            />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}