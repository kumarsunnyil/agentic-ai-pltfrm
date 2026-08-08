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

        minHeight: {
          xs: 360,
          sm: 390,
          md: 420,
        },

        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },

        borderRadius: {
          xs: 2.5,
          md: 4,
        },

        border: "1px solid",
        borderColor: "divider",

        backgroundColor: "background.paper",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,

          mb: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,

              fontSize: {
                xs: 16,
                sm: 17,
                md: 18,
              },
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
            flexShrink: 0,
          }}
        >
          <MoreHoriz />
        </IconButton>
      </Box>

      {/* Conversations */}

      <Stack
        spacing={{
          xs: 0.75,
          sm: 1,
        }}
      >
        {conversations.map((conversation) => (
          <Box
            key={conversation.id}
            sx={{
              display: "flex",
              alignItems: "center",

              gap: {
                xs: 1,
                sm: 1.5,
                md: 2,
              },

              p: {
                xs: 1,
                sm: 1.25,
                md: 1.5,
              },

              borderRadius: 2,

              minWidth: 0,

              cursor: "pointer",

              transition:
                "background-color 0.2s ease",

              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            {/* Avatar */}

            <Avatar
              sx={{
                width: {
                  xs: 34,
                  sm: 40,
                },

                height: {
                  xs: 34,
                  sm: 40,
                },

                flexShrink: 0,
              }}
            >
              <ChatBubbleOutlined
                sx={{
                  fontSize: {
                    xs: 17,
                    sm: 20,
                  },
                }}
              />
            </Avatar>

            {/* Conversation */}

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

            {/* Time */}

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                flexShrink: 0,

                display: {
                  xs: "none",
                  sm: "block",
                },
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