"use client";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { Box, Typography } from "@mui/material";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        p: 3,
      }}
    >
      <AutoAwesomeRoundedIcon
        color="primary"
        sx={{
          fontSize: 36,
        }}
      />

      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight:700
          }}
          
        >
          Agentic AI
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          Enterprise Platform
        </Typography>
      </Box>
    </Box>
  );
}