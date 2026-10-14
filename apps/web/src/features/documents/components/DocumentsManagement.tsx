"use client";

import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

type DocumentStatus = "Uploaded" | "Processing" | "Indexed" | "Failed";

interface DocumentItem {
  id: string;
  title: string;
  type: string;
  time: string;
  status: DocumentStatus;
  originalName?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
}

interface Props {
  canUpload: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const STATUS_COLORS: Record<
  DocumentStatus,
  "info" | "warning" | "success" | "error"
> = {
  Uploaded: "info",
  Processing: "warning",
  Indexed: "success",
  Failed: "error",
};

function getMessage(data: unknown, fallback: string): string {
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

function formatFileSize(size?: number | null): string {
  if (size == null) {
    return "—";
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

export default function DocumentsManagement({ canUpload }: Props) {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDocuments() {
      try {
        const response = await fetch("/api/documents", {
          cache: "no-store",
          signal: controller.signal,
        });

        const data: unknown = await response.json().catch(() => null);

        if (!response.ok) {
          setError(getMessage(data, "Unable to load documents."));
          return;
        }

        if (!Array.isArray(data)) {
          setError("The API returned an unexpected document list.");
          return;
        }

        setDocuments(data as DocumentItem[]);
        setError("");
      } catch {
        if (!controller.signal.aborted) {
          setError("Unable to reach the document service.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadDocuments();

    return () => controller.abort();
  }, [reloadKey]);

  const filteredDocuments = documents.filter((document) => {
    const query = search.trim().toLowerCase();

    return [
      document.title,
      document.originalName ?? "",
      document.type,
      document.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  function handleFileChange(file: File | undefined) {
    setError("");
    setSuccess("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.size === 0) {
      setSelectedFile(null);
      setError("The selected file is empty.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setError("The maximum file size is 10 MB.");
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !["pdf", "docx", "txt"].includes(extension)) {
      setSelectedFile(null);
      setError("Select a PDF, DOCX, or TXT file.");
      return;
    }

    setSelectedFile(file);
  }

  async function uploadDocument() {
    if (!selectedFile || !canUpload) {
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        setError(getMessage(data, "Unable to upload the document."));
        return;
      }

      const uploaded = data as DocumentItem;

      setDocuments((current) => [
        uploaded,
        ...current.filter((document) => document.id !== uploaded.id),
      ]);

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setSuccess(
        `${uploaded.title} uploaded successfully. It has not been indexed yet.`,
      );
    } catch {
      setError("Unable to reach the document service.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Documents
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Upload and manage your enterprise knowledge documents.
          </Typography>
        </Box>

        <Chip label={`${documents.length} documents`} variant="outlined" />
      </Box>

      {canUpload && (
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Upload a document
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Supported formats: PDF, DOCX, TXT. Maximum size: 10 MB.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "stretch", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Button component="label" variant="outlined" disabled={uploading}>
              Choose file
              <input
                ref={fileInputRef}
                hidden
                type="file"
                accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                onChange={(event) => handleFileChange(event.target.files?.[0])}
              />
            </Button>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                color={selectedFile ? "text.primary" : "text.secondary"}
                sx={{ overflowWrap: "anywhere" }}
              >
                {selectedFile?.name ?? "No file selected"}
              </Typography>

              {selectedFile && (
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(selectedFile.size)}
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              onClick={() => void uploadDocument()}
              disabled={!selectedFile || uploading}
            >
              {uploading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Upload"
              )}
            </Button>
          </Box>
        </Paper>
      )}

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

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <TextField
        label="Search documents"
        placeholder="Search by title, type, or status"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2, maxWidth: 480 }}
      />

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Uploaded</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={28} sx={{ my: 3 }} />
                </TableCell>
              </TableRow>
            ) : filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary" sx={{ py: 3 }}>
                    {error
                      ? "Unable to display documents."
                      : "No documents found."}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((document) => (
                <TableRow key={document.id} hover>
                  <TableCell>
                    <Typography
                      sx={{
                        variant: "body",
                        fontWeight: 600,
                      }}
                    >
                      {document.title}
                    </Typography>
                  </TableCell>

                  <TableCell>{document.type}</TableCell>

                  <TableCell>{formatFileSize(document.sizeBytes)}</TableCell>

                  <TableCell>{document.time}</TableCell>

                  <TableCell>
                    <Chip
                      label={document.status}
                      color={STATUS_COLORS[document.status] ?? "default"}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
