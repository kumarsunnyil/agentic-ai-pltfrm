"use client";

import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import {
    Breadcrumbs,
    Typography,
} from "@mui/material";

export default function AppBreadcrumbs() {
    return (
        <Breadcrumbs
            separator={<NavigateNextRoundedIcon fontSize="small" />}
        >
            <Typography
                sx={{

                    fontWeight: 600

                }}
            >
                Dashboard
            </Typography>

            <Typography color="text.secondary">
                Command Center
            </Typography>
        </Breadcrumbs>
    );
}