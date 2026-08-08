/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/KpiCard.tsx
 * @description: Responsive Enterprise Dashboard KPI card.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import {
    Box,
    Paper,
    Typography,
} from "@mui/material";

import type { ElementType } from "react";

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
                borderColor: "divider",

                backgroundColor: "background.paper",

                transition: "all 0.2s ease",

                "&:hover": {
                    boxShadow: 4,
                    borderColor: "primary.main",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                {/* -------------------------------------------------
            KPI Content
            ------------------------------------------------- */}

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
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Box>

                {/* -------------------------------------------------
            KPI Icon
            ------------------------------------------------- */}

                {Icon && (
                    <Box
                        sx={{
                            width: {
                                xs: 36,
                                sm: 42,
                            },

                            height: {
                                xs: 36,
                                sm: 42,
                            },

                            borderRadius: 2,

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            flexShrink: 0,

                            backgroundColor: "action.hover",
                            color: "primary.main",
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