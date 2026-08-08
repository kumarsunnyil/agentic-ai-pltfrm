/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/KpiCard.tsx
 * @description: Premium responsive Enterprise KPI card.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import type { ElementType } from "react";

import { Box, Paper, Typography } from "@mui/material";

interface KpiCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: ElementType;
}

export default function KpiCard({
    title,
    value,
    subtitle,
    icon: Icon,
}: KpiCardProps) {
    return (
        <Paper
            elevation={0}
            sx={{
                position: "relative",
                overflow: "hidden",

                width: "100%",
                height: "100%",

                minHeight: {
                    xs: 130,
                    sm: 145,
                    md: 155,
                },

                p: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                },

                borderRadius: {
                    xs: 2.5,
                    md: 3,
                },

                border: "1px solid",
                borderColor: "rgba(148,163,184,0.16)",

                background:
                    "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.96))",

                boxShadow:
                    "0 8px 30px rgba(0,0,0,0.12)",

                transition:
                    "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",

                "&::after": {
                    content: '""',
                    position: "absolute",
                    width: 100,
                    height: 100,
                    right: -45,
                    bottom: -55,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(59,130,246,0.16), transparent 70%)",
                    pointerEvents: "none",
                },

                "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: "rgba(59,130,246,0.38)",
                    boxShadow:
                        "0 14px 36px rgba(0,0,0,0.20)",
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,

                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        minWidth: 0,
                        flex: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{
                            fontSize: {
                                xs: 12,
                                sm: 13,
                            },
                            fontWeight: 500,
                            letterSpacing: 0.2,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h4"
                        noWrap
                        sx={{
                            mt: 1,

                            fontWeight: 700,

                            fontSize: {
                                xs: 26,
                                sm: 30,
                                md: 32,
                            },

                            lineHeight: 1.15,

                            letterSpacing: -0.5,
                        }}
                    >
                        {value}
                    </Typography>

                    {subtitle && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                            sx={{
                                display: "block",
                                mt: 1,
                                opacity: 0.85,
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Box>

                {Icon && (
                    <Box
                        sx={{
                            width: {
                                xs: 38,
                                sm: 44,
                            },

                            height: {
                                xs: 38,
                                sm: 44,
                            },

                            borderRadius: 2.5,

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            flexShrink: 0,

                            color: "primary.light",

                            background:
                                "linear-gradient(135deg, rgba(59,130,246,0.22), rgba(99,102,241,0.12))",

                            border:
                                "1px solid rgba(96,165,250,0.18)",
                        }}
                    >
                        <Icon
                            sx={{
                                fontSize: {
                                    xs: 20,
                                    sm: 23,
                                },
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Paper>
    );
}