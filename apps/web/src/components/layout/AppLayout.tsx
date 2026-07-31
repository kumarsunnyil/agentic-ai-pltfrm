"use client";

import Box from "@mui/material/Box";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({
    children,
}: AppLayoutProps) {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            {/* Sidebar */}

            {/* Header */}

            <Box
                component="main"
                sx={{
                    flex: 1,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}