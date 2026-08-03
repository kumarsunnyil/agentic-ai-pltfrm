import { Box, Typography } from "@mui/material";

export default function DashboardHeader() {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
        }}
      >
        Dashboard
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color: "text.secondary",
        }}
      >
        Welcome back, Sunil 👋
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: "text.secondary",
        }}
      >
        Here's what's happening across your Enterprise AI Platform today.
      </Typography>
    </Box>
  );
}