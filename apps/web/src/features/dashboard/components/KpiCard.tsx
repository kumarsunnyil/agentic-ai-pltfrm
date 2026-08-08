"use client";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import {
    Avatar,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { KpiCardProps } from "../types/kpi.types";

export default function KpiCard({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
}: KpiCardProps) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                transition: "all .25s ease",

                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
        >
            <Stack spacing={2}>
                <Avatar
                    sx={{
                        bgcolor: color,
                        width: 52,
                        height: 52,
                    }}
                >
                    <Icon />
                </Avatar>

                <Typography

                    variant="h4"
                    sx={{

                        fontWeight: 700
                    }}
                >
                    {value}
                </Typography>

                <Typography
                    sx={{

                        fontWeight: 600
                    }}
                >
                    {title}
                </Typography>

                <Stack
                    sx={{
                        direction: "row",
                        spacing: 1,
                        alignItems: "center"
                    }}
                >
                    <TrendingUpRoundedIcon
                        color="success"
                        sx={{ fontSize: 18 }}
                    />

                    <Typography
                        color="success.main"
                        variant="body2"
                    >
                        {subtitle}
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}