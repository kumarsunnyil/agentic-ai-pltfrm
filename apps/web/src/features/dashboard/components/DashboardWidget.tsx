"use client";

import { Paper, Typography, Box } from "@mui/material";

interface DashboardWidgetProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function DashboardWidget({
    title,
    subtitle,
    children,
}: DashboardWidgetProps) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                height: "100%",
            }}
        >
            <Box
                sx={{
                    mb: 3
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>

            {children}
        </Paper>
    );
}