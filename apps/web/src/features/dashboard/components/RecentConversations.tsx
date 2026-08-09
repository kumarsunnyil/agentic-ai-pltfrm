/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/RecentConversations.tsx
 * @description: Responsive recent AI conversations widget.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import {
  ChatBubbleOutlined,
  MoreHoriz,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface Conversation {
  id: string;
  title: string;
  preview: string;
  time: string;
}

const conversations: Conversation[] = [
  {
    id: "chat-001",
    title: "Enterprise RAG Architecture",
    preview: "How should we structure the retrieval pipeline?",
    time: "8 min ago",
  },
  {
    id: "chat-002",
    title: "AI Governance Policy",
    preview: "Summarize the key governance requirements.",
    time: "25 min ago",
  },
  {
    id: "chat-003",
    title: "Agentic Workflow Design",
    preview: "Compare sequential and parallel orchestration.",
    time: "42 min ago",
  },
  {
    id: "chat-004",
    title: "Knowledge Base Optimization",
    preview: "How can we improve retrieval accuracy?",
    time: "1 hour ago",
  },
];

export default function RecentConversations() {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: { xs: 360, sm: 390, md: 420 },
        p: { xs: 2, sm: 2.5, md: 3 },
        borderRadius: { xs: 2.5, md: 4 },
        border: "1px solid",
        borderColor: "rgba(148,163,184,0.15)",
        background: "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.96))",
        boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "rgba(59,130,246,0.28)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 16, sm: 17, md: 18 },
              letterSpacing: -0.2,
            }}
          >
            Recent Conversations
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              fontSize: { xs: 12, sm: 13 },
            }}
          >
            Latest AI workspace activity
          </Typography>
        </Box>

        <IconButton
          size="small"
          aria-label="More conversation options"
          sx={{
            flexShrink: 0,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "rgba(59,130,246,0.10)",
            },
          }}
        >
          <MoreHoriz />
        </IconButton>
      </Box>

      <Stack
        spacing={{ xs: 0.75, sm: 1 }}
      >
        {conversations.map((conversation) => (
          <Box
            key={conversation.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.5, md: 2 },
              p: { xs: 1, sm: 1.25, md: 1.5 },
              borderRadius: 2,
              minWidth: 0,
              cursor: "pointer",
              border: "1px solid transparent",
              transition: "background-color 180ms ease, border-color 180ms ease, transform 180ms ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.035)",
                borderColor: "rgba(148,163,184,0.10)",
                transform: "translateX(2px)",
              },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 34, sm: 40 },
                height: { xs: 34, sm: 40 },
                flexShrink: 0,
                color: "primary.light",
                backgroundColor: "rgba(59,130,246,0.09)",
                border: "1px solid rgba(59,130,246,0.12)",
              }}
            >
              <ChatBubbleOutlined
                sx={{
                  fontSize: { xs: 17, sm: 20 },
                }}
              />
            </Avatar>

            <Box
              sx={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography
                variant="body2"
                noWrap
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: 12, sm: 13, md: 14 },
                }}
              >
                {conversation.title}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
                sx={{
                  display: "block",
                  mt: 0.25,
                  fontSize: { xs: 10, sm: 11, md: 12 },
                }}
              >
                {conversation.preview}
              </Typography>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                flexShrink: 0,
                display: { xs: "none", sm: "block" },
                fontSize: { sm: 10, md: 11 },
              }}
            >
              {conversation.time}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}