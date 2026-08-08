/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/RecentConversations.tsx
 * @description: Reusable Enterprise Dashboard Recent Conversations widget.
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
        p: 3,
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
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
            Recent Conversations
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Latest AI workspace activity
          </Typography>
        </Box>

        <IconButton
          size="small"
          aria-label="More conversation options"
          sx={{
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <MoreHoriz />
        </IconButton>
      </Box>

      <Stack
        spacing={1}
        sx={{
          width: "100%",
        }}
      >
        {conversations.map((conversation) => (
          <Box
            key={conversation.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1.5,
              borderRadius: 2,
              cursor: "pointer",
              transition: "all 0.2s ease",

              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                flexShrink: 0,
                backgroundColor: "action.hover",
                color: "text.secondary",
              }}
            >
              <ChatBubbleOutlined fontSize="small" />
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
                whiteSpace: "nowrap",
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