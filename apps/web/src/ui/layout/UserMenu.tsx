"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import {
  Alert,
  Avatar,
  Box,
  ButtonBase,
  CircularProgress,
  ListItemIcon,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";

interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isActive: boolean;
}

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Administrator",
  AUTHOR: "Author",
  READER: "Reader",
};

export default function UserMenu() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<SessionUser | null>(null);
  const [profileError, setProfileError] = useState(false);

  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
          signal: controller.signal,
        });

        if (response.status === 401) {
          router.replace("/auth/login");
          router.refresh();
          return;
        }

        if (!response.ok) {
          setProfileError(true);
          return;
        }

        const data: unknown = await response.json();

        if (
          typeof data !== "object" ||
          data === null ||
          !("id" in data) ||
          !("email" in data) ||
          !("firstName" in data) ||
          !("lastName" in data) ||
          !("roles" in data) ||
          !("isActive" in data) ||
          typeof data.id !== "string" ||
          typeof data.email !== "string" ||
          typeof data.firstName !== "string" ||
          typeof data.lastName !== "string" ||
          !Array.isArray(data.roles) ||
          !data.roles.every(
            (role): role is string => typeof role === "string",
          ) ||
          typeof data.isActive !== "boolean" ||
          !data.isActive
        ) {
          setProfileError(true);
          return;
        }

        setUser({
          id: data.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          roles: data.roles,
          isActive: data.isActive,
        });
        setProfileError(false);
      } catch {
        if (!controller.signal.aborted) {
          setProfileError(true);
        }
      }
    }

    void loadProfile();

    return () => controller.abort();
  }, [router]);

  function handleOpen(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    if (!isLoggingOut) {
      setAnchorEl(null);
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    setError("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      if (!response.ok) {
        const data: unknown = await response.json().catch(() => null);

        const message =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof data.message === "string"
            ? data.message
            : "Unable to log out. Please try again.";

        throw new Error(message);
      }

      setAnchorEl(null);
      router.replace("/auth/login");
      router.refresh();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to log out. Please try again.",
      );
      setIsLoggingOut(false);
    }
  }

  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : profileError
      ? "Profile unavailable"
      : "Loading profile…";

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase() ||
      user.email.charAt(0).toUpperCase()
    : "…";

  const roleSummary = user
    ? user.roles.map((role) => ROLE_LABELS[role] ?? role).join(" · ") || "User"
    : profileError
      ? "Unable to load roles"
      : " ";

  return (
    <>
      <ButtonBase
        onClick={handleOpen}
        aria-label="Open user menu"
        aria-haspopup="menu"
        aria-expanded={menuOpen ? "true" : undefined}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          cursor: "pointer",
          textAlign: "left",
          borderRadius: 2,
          p: 0.5,
          color: "inherit",
          minWidth: 0,
        }}
      >
        <Avatar sx={{ width: 36, height: 36, flexShrink: 0 }}>
          {initials}
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            noWrap
            sx={{ fontSize: 14, fontWeight: 600, maxWidth: 220 }}
          >
            {displayName}
          </Typography>

          <Typography
            noWrap
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", maxWidth: 220 }}
          >
            {roleSummary}
          </Typography>
        </Box>

        <ExpandMoreRoundedIcon />
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {user && (
          <MenuItem disabled sx={{ opacity: "1 !important" }}>
            <Box sx={{ py: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user.email}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {roleSummary}
              </Typography>
            </Box>
          </MenuItem>
        )}

        <MenuItem onClick={() => void handleLogout()} disabled={isLoggingOut}>
          <ListItemIcon>
            {isLoggingOut ? (
              <CircularProgress size={18} />
            ) : (
              <LogoutRoundedIcon fontSize="small" />
            )}
          </ListItemIcon>
          {isLoggingOut ? "Signing out…" : "Logout"}
        </MenuItem>
      </Menu>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError("")} variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
