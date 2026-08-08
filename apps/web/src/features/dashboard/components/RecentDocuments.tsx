/**
 * ------------------------------------------------------------
 * @file: src\features\dashboard\components\RecentDocuments.tsx
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */
"use client";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface RecentDocument {
  id: string;
  name: string;
  type: string;
  status: "Processed" | "Processing" | "Failed";
  updatedAt: string;
}

const documents: RecentDocument[] = [
  {
    id: "doc-001",
    name: "Enterprise Architecture Guidelines.pdf",
    type: "PDF",
    status: "Processed",
    updatedAt: "5 min ago",
  },
  {
    id: "doc-002",
    name: "AI Governance Policy.docx",
    type: "DOCX",
    status: "Processed",
    updatedAt: "18 min ago",
  },
  {
    id: "doc-003",
    name: "Product Knowledge Base.pdf",
    type: "PDF",
    status: "Processing",
    updatedAt: "32 min ago",
  },
  {
    id: "doc-004",
    name: "Security Architecture.md",
    type: "MD",
    status: "Processed",
    updatedAt: "1 hour ago",
  },
];

const statusColor = {
  Processed: "success",
  Processing: "warning",
  Failed: "error",
} as const;

export default function RecentDocuments() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box

        sx={{

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{

              fontWeight: 700,
            }}
          >
            Recent Documents
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Recently processed enterprise knowledge
          </Typography>
        </Box>

        <IconButton size="small">
          <MoreHorizIcon />
        </IconButton>
      </Box>

      <Stack spacing={1}>
        {documents.map((document) => (
          <Box
            key={document.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1.5,
              borderRadius: 2,
              transition: "all .2s ease",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "action.hover",
                flexShrink: 0,
              }}
            >
              <DescriptionOutlinedIcon fontSize="small" />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography

                variant="body2"
                sx={{

                  fontWeight: 600,
                }}
                noWrap
              >
                {document.name}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {document.type} • {document.updatedAt}
              </Typography>
            </Box>

            <Chip
              label={document.status}
              color={statusColor[document.status]}
              size="small"
              variant="outlined"
            />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}