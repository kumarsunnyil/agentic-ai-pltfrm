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

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";

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

const statusIcons = {
    success: CheckCircleOutlineRoundedIcon,
    warning: HourglassTopRoundedIcon,
    error: ErrorOutlineRoundedIcon,
};

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

                borderColor:
                    "rgba(148,163,184,0.15)",

                background:
                    "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.96))",

                boxShadow:
                    "0 8px 28px rgba(0,0,0,0.10)",

                transition:
                    "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",

                "&:hover": {
                    transform: "translateY(-2px)",

                    borderColor:
                        "rgba(59,130,246,0.28)",

                    boxShadow:
                        "0 12px 32px rgba(0,0,0,0.16)",
                },
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
                <Box
                    sx={{
                        display: "flex",

                        alignItems: "center",

                        justifyContent: "space-between",

                        gap: 2,
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

                    <Chip
                        label="3 / 4 Online"
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{
                            flexShrink: 0,

                            height: {
                                xs: 24,
                                sm: 26,
                            },

                            fontSize: {
                                xs: 10,
                                sm: 11,
                            },

                            fontWeight: 600,

                            display: {
                                xs: "none",
                                sm: "inline-flex",
                            },
                        }}
                    />
                </Box>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 0.5,

                        fontSize: {
                            xs: 12,
                            sm: 13,
                        },
                    }}
                >
                    Current model availability
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 1.25,

                    mb: {
                        xs: 2,
                        md: 2.5,
                    },

                    px: {
                        xs: 1.25,
                        sm: 1.5,
                    },

                    py: {
                        xs: 1,
                        sm: 1.25,
                    },

                    borderRadius: 2,

                    backgroundColor:
                        "rgba(34,197,94,0.05)",

                    border:
                        "1px solid rgba(34,197,94,0.10)",
                }}
            >
                <Box
                    sx={{
                        width: 8,

                        height: 8,

                        flexShrink: 0,

                        borderRadius: "50%",

                        backgroundColor:
                            "success.main",

                        boxShadow:
                            "0 0 9px rgba(34,197,94,0.65)",
                    }}
                />

                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 600,

                        fontSize: {
                            xs: 12,
                            sm: 13,
                        },
                    }}
                >
                    Platform operational
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        ml: "auto",

                        flexShrink: 0,
                    }}
                >
                    99.8%
                </Typography>
            </Box>
            <Stack
                spacing={{
                    xs: 1,
                    sm: 1.25,
                    md: 1.5,
                }}
            >
                {agents.map((agent) => {
                    const StatusIcon =
                        statusIcons[
                        agent.color === "success"
                            ? "success"
                            : agent.color === "warning"
                                ? "warning"
                                : "error"
                        ];

                    return (
                        <Box
                            key={agent.model}
                            sx={{
                                display: "flex",

                                alignItems: "center",

                                gap: {
                                    xs: 1.25,
                                    sm: 1.5,
                                },

                                minHeight: {
                                    xs: 48,
                                    sm: 52,
                                },

                                px: {
                                    xs: 1,
                                    sm: 1.25,
                                },

                                py: {
                                    xs: 0.75,
                                    sm: 1,
                                },

                                borderRadius: 2,

                                border:
                                    "1px solid rgba(148,163,184,0.08)",

                                backgroundColor:
                                    "rgba(255,255,255,0.015)",

                                transition:
                                    "background-color 180ms ease, border-color 180ms ease",

                                "&:hover": {
                                    backgroundColor:
                                        "rgba(255,255,255,0.035)",

                                    borderColor:
                                        "rgba(148,163,184,0.14)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: {
                                        xs: 34,
                                        sm: 38,
                                    },

                                    height: {
                                        xs: 34,
                                        sm: 38,
                                    },

                                    flexShrink: 0,

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    borderRadius: 2,

                                    color:
                                        agent.color === "success"
                                            ? "success.main"
                                            : agent.color === "warning"
                                                ? "warning.main"
                                                : "error.main",

                                    backgroundColor:
                                        agent.color === "success"
                                            ? "rgba(34,197,94,0.08)"
                                            : agent.color === "warning"
                                                ? "rgba(245,158,11,0.08)"
                                                : "rgba(239,68,68,0.08)",
                                }}
                            >
                                <StatusIcon
                                    sx={{
                                        fontSize: {
                                            xs: 18,
                                            sm: 20,
                                        },
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    flex: 1,

                                    minWidth: 0,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{
                                        fontWeight: 600,

                                        fontSize: {
                                            xs: 12,
                                            sm: 13,
                                            md: 14,
                                        },
                                    }}
                                >
                                    {agent.model}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "block",
                                        },

                                        mt: 0.15,
                                    }}
                                >
                                    AI model
                                </Typography>
                            </Box>
                            <Chip
                                label={agent.status}
                                color={agent.color}
                                size="small"
                                sx={{
                                    flexShrink: 0,

                                    minWidth: {
                                        xs: 68,
                                        md: 78,
                                    },

                                    height: {
                                        xs: 24,
                                        sm: 26,
                                    },

                                    fontSize: {
                                        xs: 10,
                                        sm: 11,
                                    },

                                    fontWeight: 600,
                                }}
                            />
                        </Box>
                    );
                })}
            </Stack>
        </Paper>
    );
}