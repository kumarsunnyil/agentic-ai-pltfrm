"use client";

import { Box, Typography } from "@mui/material";

export default function VersionInfo() {
  return (
    <Box
      sx={{
        px: 3,
        py: 2,
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
      >
        Version 1.0.0
      </Typography>
    </Box>
  );
}