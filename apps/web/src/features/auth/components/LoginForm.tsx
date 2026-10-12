"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message ?? "Unable to sign in.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to reach the authentication service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: "100%", maxWidth: 440, p: { xs: 3, sm: 5 } }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Knowledge Hub
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Sign in to your Enterprise AI Platform
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Email address"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
                fullWidth
                autoFocus
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                fullWidth
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign in"
                )}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
