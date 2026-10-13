'use client';

import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress, Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

interface AuditLog {
  id: string;
  actorUserId: string;
  targetUserId: string;
  targetEmail: string;
  action: string;
  previousRoles: string[];
  newRoles: string[];
  createdAt: string;
}

interface AuditResponse {
  items: AuditLog[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface AuditFilters {
  actorUserId: string;
  targetUserId: string;
  dateFrom: string;
  dateTo: string;
}

const EMPTY_FILTERS: AuditFilters = {
  actorUserId: '',
  targetUserId: '',
  dateFrom: '',
  dateTo: '',
};

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function toIsoStartOfDay(value: string) {
  return value ? new Date(`${value}T00:00:00`).toISOString() : '';
}

function toIsoEndOfDay(value: string) {
  return value ? new Date(`${value}T23:59:59.999`).toISOString() : '';
}

export default function AuditLogsManagement() {
  const [items, setItems] = useState<AuditLog[]>([]);
  const [filters, setFilters] = useState<AuditFilters>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<AuditFilters>(EMPTY_FILTERS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAuditLogs() {
      try {
        const params = new URLSearchParams({
          page: String(page + 1),
          limit: String(rowsPerPage),
        });

        if (appliedFilters.actorUserId.trim()) {
          params.set('actorUserId', appliedFilters.actorUserId.trim());
        }

        if (appliedFilters.targetUserId.trim()) {
          params.set('targetUserId', appliedFilters.targetUserId.trim());
        }

        if (appliedFilters.dateFrom) {
          params.set(
            'dateFrom',
            toIsoStartOfDay(appliedFilters.dateFrom),
          );
        }

        if (appliedFilters.dateTo) {
          params.set('dateTo', toIsoEndOfDay(appliedFilters.dateTo));
        }

        const response = await fetch(
          `/api/admin/audit-logs?${params.toString()}`,
          {
            cache: 'no-store',
            signal: controller.signal,
          },
        );

        const data: unknown = await response.json().catch(() => null);

        if (!response.ok) {
          const message =
            typeof data === 'object' &&
            data !== null &&
            'message' in data &&
            typeof data.message === 'string'
              ? data.message
              : 'Unable to load audit history.';

          setError(message);
          return;
        }

        if (
          typeof data !== 'object' ||
          data === null ||
          !('items' in data) ||
          !Array.isArray(data.items) ||
          !('total' in data) ||
          typeof data.total !== 'number'
        ) {
          setError('The API returned an unexpected audit response.');
          return;
        }

        const result = data as AuditResponse;

        setItems(result.items);
        setTotal(result.total);
        setError('');
      } catch {
        if (!controller.signal.aborted) {
          setError('Unable to reach the audit service.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchAuditLogs();

    return () => controller.abort();
  }, [page, rowsPerPage, appliedFilters, reloadKey]);

  function applyFilters() {
    if (
      filters.dateFrom &&
      filters.dateTo &&
      filters.dateFrom > filters.dateTo
    ) {
      setError('The start date must not be later than the end date.');
      return;
    }

    setError('');
    setLoading(true);
    setPage(0);
    setAppliedFilters({ ...filters });
    setReloadKey((current) => current + 1);
  }

  function resetFilters() {
    setFilters({ ...EMPTY_FILTERS });
    setAppliedFilters({ ...EMPTY_FILTERS });
    setError('');
    setLoading(true);
    setPage(0);
    setReloadKey((current) => current + 1);
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Audit History
        </Typography>
        <Typography color="text.secondary">
          Review role changes made by platform administrators.
        </Typography>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, minmax(0, 1fr))',
              },
              gap: 2,
            }}
          >
            <TextField
              label="Actor user ID"
              value={filters.actorUserId}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  actorUserId: event.target.value,
                }))
              }
              size="small"
              fullWidth
            />

            <TextField
              label="Target user ID"
              value={filters.targetUserId}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  targetUserId: event.target.value,
                }))
              }
              size="small"
              fullWidth
            />

            <TextField
              label="From date"
              type="date"
              value={filters.dateFrom}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  dateFrom: event.target.value,
                }))
              }
              size="small"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              label="To date"
              type="date"
              value={filters.dateTo}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  dateTo: event.target.value,
                }))
              }
              size="small"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>

          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            <Button onClick={resetFilters}>Reset</Button>
            <Button variant="contained" onClick={applyFilters}>
              Apply filters
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setLoading(true);
                setError('');
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
              <TableCell>Timestamp</TableCell>
              <TableCell>Actor ID</TableCell>
              <TableCell>Target user</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Previous roles</TableCell>
              <TableCell>New roles</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={28} sx={{ my: 3 }} />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary" sx={{ py: 3 }}>
                    No audit records found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {formatDate(item.createdAt)}
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ overflowWrap: 'anywhere' }}>
                      {item.actorUserId}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {item.targetEmail}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ overflowWrap: 'anywhere' }}
                    >
                      {item.targetUserId}
                    </Typography>
                  </TableCell>

                  <TableCell>{item.action}</TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {item.previousRoles.map((role) => (
                        <Chip key={role} label={role} size="small" />
                      ))}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {item.newRoles.map((role) => (
                        <Chip key={role} label={role} size="small" />
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10, 20, 50]}
          onPageChange={(_, nextPage) => {
            setLoading(true);
            setPage(nextPage);
          }}
          onRowsPerPageChange={(event) => {
            setLoading(true);
            setPage(0);
            setRowsPerPage(Number(event.target.value));
          }}
        />
      </TableContainer>
    </Box>
  );
}