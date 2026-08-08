/**
 * ------------------------------------------------------------
 * @file: src/ui/layout/VersionInfo.tsx
 * @description: Responsive Enterprise Platform version information.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import {
  Box,
  Tooltip,
  Typography,
} from "@mui/material";

const VERSION = "1.0.0";

export default function VersionInfo() {
  return (
    <Box
      sx={{
        px: {
          xs: 2,
          md: 1,
          lg: 3,
        },

        py: {
          xs: 2,
          md: 1.5,
          lg: 2,
        },

        display: "flex",

        alignItems: "center",

        justifyContent: {
          xs: "flex-start",
          md: "center",
          lg: "flex-start",
        },

        flexShrink: 0,
      }}
    >
      {/* Desktop / Mobile */}

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: {
            xs: "block",
            md: "none",
            lg: "block",
          },

          whiteSpace: "nowrap",
        }}
      >
        Version {VERSION}
      </Typography>

      {/* Tablet */}

      <Tooltip title={`Version ${VERSION}`} placement="right">
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: {
              xs: "none",
              md: "block",
              lg: "none",
            },

            fontWeight: 600,

            fontSize: 10,

            lineHeight: 1,

            cursor: "default",
          }}
        >
          v{VERSION}
        </Typography>
      </Tooltip>
    </Box>
  );
}