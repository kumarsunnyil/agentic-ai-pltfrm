/**
 * ------------------------------------------------------------
 * @file: src/ui/layout/Logo.tsx
 * @description: Responsive Enterprise AI Platform logo.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import {
  Box,
  Typography,
} from "@mui/material";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",

        gap: {
          xs: 1.5,
          md: 0,
          lg: 2,
        },

        p: {
          xs: 2,
          md: 1,
          lg: 3,
        },

        minHeight: {
          xs: 72,
          md: 72,
          lg: 80,
        },

        justifyContent: {
          xs: "flex-start",
          md: "center",
          lg: "flex-start",
        },

        flexShrink: 0,
      }}
    >
      <AutoAwesomeRoundedIcon
        color="primary"
        sx={{
          fontSize: {
            xs: 32,
            md: 30,
            lg: 36,
          },

          flexShrink: 0,
        }}
      />

      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
            lg: "block",
          },

          minWidth: 0,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Agentic AI
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
          Enterprise Platform
        </Typography>
      </Box>
    </Box>
  );
}