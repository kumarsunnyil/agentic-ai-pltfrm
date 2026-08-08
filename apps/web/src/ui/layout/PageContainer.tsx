"use client";

import { Box } from "@mui/material";

import { CONTENT_PADDING } from "@/theme/constants";

interface PageContainerProps {
    children: React.ReactNode;
}
export default function PageContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box
            component="main"
            sx={{
                flex: 1,
                p: 4,
                overflowY: "auto",
            }}
        >
            {children}
        </Box>
    );
}