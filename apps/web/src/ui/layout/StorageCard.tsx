/**
 * ------------------------------------------------------------
 * @file: src/ui/layout/StorageCard.tsx
 * @description: Responsive Enterprise Platform storage usage card.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";

import {
  Box,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

const STORAGE_USED = 82;
const STORAGE_TOTAL = 100;

export default function StorageCard() {
  return (
    <Box
      sx={{
        px: {
          xs: 2,
          md: 1,
          lg: 2,
        },

        pb: 2,

        flexShrink: 0,
      }}
    >
      {/* ---------------------------------------------------
          Full Storage Card
          --------------------------------------------------- */}

      <Paper
        elevation={0}
        sx={{
          display: {
            xs: "block",
            md: "none",
            lg: "block",
          },

          p: 2,

          borderRadius: 3,

          backgroundColor: "background.default",

          border: "1px solid",

          borderColor: "divider",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
          }}
        >
          Storage
        </Typography>

        <LinearProgress
          variant="determinate"
          value={STORAGE_USED}
          sx={{
            my: 2,

            height: 8,

            borderRadius: 5,
          }}
        />

        <Box
          sx={{
            display: "flex",

            justifyContent: "space-between",

            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            {STORAGE_USED} GB Used
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {STORAGE_TOTAL} GB
          </Typography>
        </Box>
      </Paper>

      {/* ---------------------------------------------------
          Compact Tablet Storage Indicator
          --------------------------------------------------- */}

      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
            lg: "none",
          },

          flexDirection: "column",

          alignItems: "center",

          justifyContent: "center",

          gap: 1,

          py: 1,
        }}
        title={`${STORAGE_USED} GB of ${STORAGE_TOTAL} GB used`}
      >
        <StorageOutlinedIcon
          sx={{
            fontSize: 22,
            color: "text.secondary",
          }}
        />

        <Box
          sx={{
            width: 36,
            height: 4,
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "action.hover",
          }}
        >
          <Box
            sx={{
              width: `${STORAGE_USED}%`,
              height: "100%",
              backgroundColor: "primary.main",
              borderRadius: 2,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}