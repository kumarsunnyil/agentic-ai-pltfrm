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
  Snackbar,
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

interface NewUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const ROLE_OPTIONS: UserRole[] = ["SUPER_ADMIN", "ADMIN", "AUTHOR", "READER"];

interface Props {
  currentUserId: string;
  canManageRoles: boolean;
  canCreateUsers: boolean;
}

const EMPTY_NEW_USER: NewUser = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

function responseMessage(data: unknown, fallback: string): string {
  if (typeof data === "object" && data !== null && "message" in data) {
    if (typeof data.message === "string") {
      return data.message;
    }

    if (
      Array.isArray(data.message) &&
      data.message.every((item) => typeof item === "string")
    ) {
      return data.message.join(", ");
    }
  }

  return fallback;
}

export default function UsersManagement({
  currentUserId,
  canManageRoles,
  canCreateUsers,
}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [savingRoles, setSavingRoles] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({ ...EMPTY_NEW_USER });
  const [creatingUser, setCreatingUser] = useState(false);
  const [createError, setCreateError] = useState("");

  const [statusTarget, setStatusTarget] = useState<User | null>(null);
  const [savingStatus, setSavingStatus] = useState(false);
  const [statusError, setStatusError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

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
          setError(responseMessage(data, "Unable to load users."));
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

    return () => controller.abort();
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
    if (!savingRoles) {
      setEditingUser(null);
      setSelectedRoles([]);
    }
  }

  function toggleRole(role: UserRole, checked: boolean) {
    setSelectedRoles((current) => {
      if (checked) {
        return current.includes(role) ? current : [...current, role];
      }

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

    setSavingRoles(true);
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
        setError(responseMessage(data, "Unable to update user roles."));
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
      setSuccessMessage("User roles updated successfully.");
    } catch {
      setError("Unable to reach the user service.");
    } finally {
      setSavingRoles(false);
    }
  }

  async function createUser() {
    setCreatingUser(true);
    setCreateError("");

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newUser.email.trim(),
          password: newUser.password,
          firstName: newUser.firstName.trim(),
          lastName: newUser.lastName.trim(),
        }),
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        setCreateError(responseMessage(data, "Unable to create user."));
        return;
      }

      setCreateOpen(false);
      setNewUser({ ...EMPTY_NEW_USER });
      setLoading(true);
      setReloadKey((current) => current + 1);
      setSuccessMessage("User created successfully with the Reader role.");
    } catch {
      setCreateError("Unable to reach the user service.");
    } finally {
      setCreatingUser(false);
    }
  }

  async function saveUserStatus() {
    if (!statusTarget) {
      return;
    }

    const target = statusTarget;
    const nextIsActive = !target.isActive;

    setSavingStatus(true);
    setStatusError("");

    try {
      const response = await fetch(
        `/api/admin/users/${encodeURIComponent(target.id)}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: nextIsActive }),
        },
      );

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        setStatusError(
          responseMessage(data, "Unable to update account status."),
        );
        return;
      }

      setStatusTarget(null);
      setLoading(true);
      setReloadKey((current) => current + 1);
      setSuccessMessage(
        nextIsActive
          ? "User activated successfully."
          : "User deactivated successfully.",
      );
    } catch {
      setStatusError("Unable to reach the user service.");
    } finally {
      setSavingStatus(false);
    }
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
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

        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Chip label={`${users.length} users`} variant="outlined" />
          {canCreateUsers && (
            <Button
              variant="contained"
              onClick={() => {
                setCreateError("");
                setNewUser({ ...EMPTY_NEW_USER });
                setCreateOpen(true);
              }}
            >
              Create User
            </Button>
          )}
        </Stack>
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
                      <Stack
                        sx={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() => openRoleDialog(user)}
                        >
                          Edit roles
                        </Button>

                        <Button
                          size="small"
                          color={user.isActive ? "error" : "success"}
                          disabled={user.id === currentUserId && user.isActive}
                          onClick={() => {
                            setStatusError("");
                            setStatusTarget(user);
                          }}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create user dialog */}
      <Dialog
        open={createOpen}
        onClose={() => !creatingUser && setCreateOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            void createUser();
          }}
        >
          <DialogTitle>Create User</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                New accounts are created as Readers. You can assign additional
                roles after creation.
              </Typography>

              {createError && <Alert severity="error">{createError}</Alert>}

              <TextField
                label="First name"
                value={newUser.firstName}
                onChange={(event) =>
                  setNewUser((current) => ({
                    ...current,
                    firstName: event.target.value,
                  }))
                }
                required
                fullWidth
                autoComplete="given-name"
              />

              <TextField
                label="Last name"
                value={newUser.lastName}
                onChange={(event) =>
                  setNewUser((current) => ({
                    ...current,
                    lastName: event.target.value,
                  }))
                }
                required
                fullWidth
                autoComplete="family-name"
              />

              <TextField
                label="Email address"
                type="email"
                value={newUser.email}
                onChange={(event) =>
                  setNewUser((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                required
                fullWidth
                autoComplete="email"
              />

              <TextField
                label="Temporary password"
                type="password"
                value={newUser.password}
                onChange={(event) =>
                  setNewUser((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                required
                fullWidth
                autoComplete="new-password"
                helperText="Provide a secure initial password to the user through a separate channel."
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setCreateOpen(false)}
              disabled={creatingUser}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={creatingUser}>
              {creatingUser ? "Creating…" : "Create user"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Role editing dialog */}
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
                        savingRoles ||
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
          <Button onClick={closeRoleDialog} disabled={savingRoles}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => void saveRoles()}
            disabled={
              savingRoles ||
              !editingUser ||
              selectedRoles.length === 0 ||
              (editingUser.roles.length === selectedRoles.length &&
                editingUser.roles.every((role) => selectedRoles.includes(role)))
            }
          >
            {savingRoles ? "Saving…" : "Save roles"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status confirmation dialog */}
      <Dialog
        open={Boolean(statusTarget)}
        onClose={() => !savingStatus && setStatusTarget(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {statusTarget?.isActive ? "Deactivate user?" : "Activate user?"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography>
              {statusTarget?.isActive
                ? `Deactivate ${statusTarget.email}? They will not be able to sign in while their account is inactive.`
                : `Activate ${statusTarget?.email}? They will be able to sign in again.`}
            </Typography>
            {statusError && <Alert severity="error">{statusError}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusTarget(null)} disabled={savingStatus}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={statusTarget?.isActive ? "error" : "success"}
            onClick={() => void saveUserStatus()}
            disabled={savingStatus}
          >
            {savingStatus
              ? "Saving…"
              : statusTarget?.isActive
                ? "Deactivate"
                : "Activate"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setSuccessMessage("")}
          variant="filled"
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
