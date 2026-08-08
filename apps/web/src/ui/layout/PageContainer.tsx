/**
 * ------------------------------------------------------------
 * @file: src/ui/layout/PageContainer.tsx
 * @description: Responsive Enterprise Application page container.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import { Box } from "@mui/material";

import {
    HEADER_HEIGHT,
} from "@/theme/constants";

interface PageContainerProps {
    children: React.ReactNode;
}

export default function PageContainer({
    children,
}: PageContainerProps) {
    return (
        <Box
            sx={{
                width: "100%",
                minWidth: 0,

                boxSizing: "border-box",

                px: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                    lg: 4,
                },

                py: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                    lg: 4,
                },

                pb: {
                    xs: 4,
                    md: 5,
                },

                maxWidth: 1600,

                mx: "auto",

                minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            }}
        >
            {children}
        </Box>
    );
}