import {
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function WelcomeBanner() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        bgcolor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight={700}>
          Enterprise Command Center
        </Typography>

        <Typography>
          Monitor AI agents, knowledge bases, documents, workflows, and enterprise analytics from one unified platform.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="secondary">
            Upload Document
          </Button>

          <Button variant="outlined" color="inherit">
            Start AI Chat
          </Button>

          <Button variant="outlined" color="inherit">
            Create Workflow
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}