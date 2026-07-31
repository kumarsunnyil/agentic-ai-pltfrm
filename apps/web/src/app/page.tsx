import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        sx={{
          p: 5,
          width: 500,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          Agentic AI Platform
        </Typography>

        <Typography mb={3}>
          Next.js 16 + Material UI 9
        </Typography>

        <Button variant="contained">
          Get Started
        </Button>
      </Paper>
    </Box>
  );
}