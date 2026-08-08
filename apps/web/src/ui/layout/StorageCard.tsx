"use client";

import {
  Box,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

export default function StorageCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mx: 2,
        mb: 2,
        borderRadius: 3,
        bgcolor: "background.default",
      }}
    >
      <Typography
        variant="body2"
        sx={{

            "fontWeight":600
        }}
      >
        Storage
      </Typography>

      <LinearProgress
        variant="determinate"
        value={82}
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
        }}
      >
        <Typography variant="caption">
          82 GB Used
        </Typography>

        <Typography variant="caption">
          100 GB
        </Typography>
      </Box>
    </Paper>
  );
}