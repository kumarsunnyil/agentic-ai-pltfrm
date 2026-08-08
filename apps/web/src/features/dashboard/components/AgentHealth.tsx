/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/AgentHealth.tsx
 * @description: Responsive Enterprise AI platform health widget.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import {
    Box,
    Chip,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import type { ChipProps } from "@mui/material";

interface Agent {
    model: string;
    status: string;
    color: ChipProps["color"];
}

const agents: Agent[] = [
    {
        model: "GPT-5",
        status: "Online",
        color: "success",
    },
    {
        model: "Claude 4",
        status: "Online",
        color: "success",
    },
    {
        model: "Gemini 2.5",
        status: "Busy",
        color: "warning",
    },
    {
        model: "DeepSeek",
        status: "Offline",
        color: "error",
    },
];

export default function AgentHealth() {
    return (
        <Paper
            elevation={0}
            sx={{
                width: "100%",
                height: "100%",
                minHeight: {
                    xs: 340,
                    sm: 380,
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
            <Box
                sx={{
                    mb: {
                        xs: 2.5,
                        md: 3,
                    },
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
                    AI Platform Health
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 0.5,
                    }}
                >
                    Current model availability
                </Typography>
            </Box>

            <Stack
                spacing={{
                    xs: 1.5,
                    md: 2.5,
                }}
            >
                {agents.map((agent) => (
                    <Box
                        key={agent.model}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                            minHeight: 42,
                        }}
                    >
                        <Typography
                            variant="body2"
                            noWrap
                            sx={{
                                minWidth: 0,
                                fontWeight: 500,
                            }}
                        >
                            {agent.model}
                        </Typography>

                        <Chip
                            label={agent.status}
                            color={agent.color}
                            size="small"
                            sx={{
                                flexShrink: 0,
                                minWidth: {
                                    xs: 72,
                                    md: 82,
                                },
                            }}
                        />
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}