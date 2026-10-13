"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

type UserRole = "SUPER_ADMIN" | "ADMIN" | "AUTHOR" | "READER";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  isActive: boolean;
}

const ROLE_OPTIONS: UserRole[] = ["SUPER_ADMIN", "ADMIN", "AUTHOR", "READER"];

interface Props {
  currentUserId: string;
  canManageRoles: boolean;
}

export default function UsersManagement({
  currentUserId,
  canManageRoles,
}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        const response = await fetch("/api/admin/users", {
          cache: "no-store",
          signal: controller.signal,
        });

        const data: unknown = await response.json().catch(() => null);

        if (!response.ok) {
          const message =
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof data.message === "string"
              ? data.message
              : "Unable to load users.";

          setError(message);
          return;
        }

        if (!Array.isArray(data)) {
          setError("The API returned an unexpected user list.");
          return;
        }

        setUsers(data as User[]);
        setError("");
      } catch {
        if (!controller.signal.aborted) {
          setError("Unable to reach the user service.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchUsers();

    return () => {
      controller.abort();
    };
  }, [reloadKey]);
  const filteredUsers = users.filter((user) => {
    const searchText = search.trim().toLowerCase();

    return [user.firstName, user.lastName, user.email, ...user.roles]
      .join(" ")
      .toLowerCase()
      .includes(searchText);
  });

  function openRoleDialog(user: User) {
    setEditingUser(user);
    setSelectedRoles([...user.roles]);
    setError("");
  }

  function closeRoleDialog() {
    if (!saving) {
      setEditingUser(null);
      setSelectedRoles([]);
    }
  }

  function toggleRole(role: UserRole, checked: boolean) {
    setSelectedRoles((current) => {
      if (checked) {
        return current.includes(role) ? current : [...current, role];
      }

      // The backend requires at least one role.
      if (current.length <= 1) {
        return current;
      }

      return current.filter((item) => item !== role);
    });
  }

  async function saveRoles() {
    if (!editingUser || selectedRoles.length === 0) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/users/${encodeURIComponent(editingUser.id)}/roles`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roles: selectedRoles }),
        },
      );

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          typeof data === "object" && data !== null && "message" in data
            ? Array.isArray(data.message)
              ? data.message.join(", ")
              : String(data.message)
            : "Unable to update user roles.";

        setError(message);
        return;
      }

      const updatedUser = data as User;

      setUsers((current) =>
        current.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        ),
      );

      setEditingUser(null);
      setSelectedRoles([]);
    } catch {
      setError("Unable to reach the user service.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack
        // direction={{ xs: "column", sm: "row" }}
        // alignItems={{ sm: "center" }}
        // justifyContent="space-between"
        // spacing={2}
        sx={{
          mb: 3,
          direction: "row",
          xs: "column",
          md: 4,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 0.75,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            User Management
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Manage platform users and access roles
          </Typography>
        </Box>

        <Chip label={`${users.length} users`} variant="outlined" />
      </Stack>

      <TextField
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name, email, or role"
        label="Search users"
        size="small"
        fullWidth
        sx={{ mb: 2, maxWidth: 480 }}
      />

      {error && !editingUser && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setLoading(true);
                setError("");
                setReloadKey((current) => current + 1);
              }}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Status</TableCell>
              {canManageRoles && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={canManageRoles ? 5 : 4} align="center">
                  <CircularProgress size={28} sx={{ my: 3 }} />
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={canManageRoles ? 5 : 4} align="center">
                  <Typography color="text.secondary" sx={{ py: 3 }}>
                    {error ? "Unable to display users." : "No users found."}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    {`${user.firstName} ${user.lastName}`.trim() || "—"}
                    {user.id === currentUserId && (
                      <Chip label="You" size="small" sx={{ ml: 1 }} />
                    )}
                  </TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        gap: 0.75,
                        flexWrap: "wrap",
                      }}
                    >
                      {user.roles.map((role) => (
                        <Chip key={role} label={role} size="small" />
                      ))}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={user.isActive ? "Active" : "Inactive"}
                      color={user.isActive ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>

                  {canManageRoles && (
                    <TableCell align="right">
                      <Button size="small" onClick={() => openRoleDialog(user)}>
                        Edit roles
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={Boolean(editingUser)}
        onClose={closeRoleDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Assign roles</DialogTitle>

        <DialogContent>
          {editingUser && (
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {editingUser.firstName} {editingUser.lastName}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {editingUser.email}
              </Typography>

              {editingUser.id === currentUserId &&
                editingUser.roles.includes("SUPER_ADMIN") &&
                !selectedRoles.includes("SUPER_ADMIN") && (
                  <Alert severity="warning">
                    Removing Super Admin from your own account removes your
                    role-management access. Ensure another active Super Admin
                    remains.
                  </Alert>
                )}

              {ROLE_OPTIONS.map((role) => (
                <FormControlLabel
                  key={role}
                  label={role}
                  control={
                    <Checkbox
                      checked={selectedRoles.includes(role)}
                      disabled={
                        saving ||
                        (selectedRoles.length === 1 &&
                          selectedRoles.includes(role))
                      }
                      onChange={(event) =>
                        toggleRole(role, event.target.checked)
                      }
                    />
                  }
                />
              ))}

              {error && <Alert severity="error">{error}</Alert>}
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeRoleDialog} disabled={saving}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => void saveRoles()}
            disabled={
              saving ||
              !editingUser ||
              selectedRoles.length === 0 ||
              (editingUser.roles.length === selectedRoles.length &&
                editingUser.roles.every((role) => selectedRoles.includes(role)))
            }
          >
            {saving ? "Saving…" : "Save roles"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
