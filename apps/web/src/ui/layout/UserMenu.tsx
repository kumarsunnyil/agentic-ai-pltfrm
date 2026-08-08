"use client";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
    Avatar,
    Box,
    Typography,
} from "@mui/material";

export default function UserMenu() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
            }}
        >
            <Avatar
                sx={{
                    width: 36,
                    height: 36,
                }}
            >
                S
            </Avatar>

            <Box>
                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: 600
                    }}
                >
                    Shayne Thomas Mavely
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    Technical Architect
                </Typography>
            </Box>

            <ExpandMoreRoundedIcon />
        </Box>
    );
}