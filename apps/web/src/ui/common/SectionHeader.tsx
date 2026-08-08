/**
 * ------------------------------------------------------------
 * @file: src\ui\common\SectionHeader.tsx
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */


"use client";

import { Box, Typography } from "@mui/material";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
}

export default function SectionHeader({
    title,
    subtitle,
}: SectionHeaderProps) {
    return (
        <Box
            sx={{
                mb: 3,
            }}
        >
            <Typography
                sx={{
                    variant: "h5",
                    fontWeight: 700
                }}
            >
                {title}
            </Typography>

            {subtitle && (
                <Typography
                    color="text.secondary"
                    sx={{
                        mt: 1,
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
}