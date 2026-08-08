/**
 * ------------------------------------------------------------
 * @file: src\features\dashboard\components\AgentHealth.tsx
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import {
    Box,
    Chip,
    Paper,
    ChipProps,
    Stack,
    Typography,
} from "@mui/material";

const agents: {
    model: string;
    status: string;
    color: ChipProps["color"];
}[] = [
        {
            model: "GPT-5",
            status: "Online",
            color: "success",
        },
        {
            model: "Claude 4",
            status: "Online",
            color: "success",
        },
        {
            model: "Gemini 2.5",
            status: "Busy",
            color: "warning",
        },
        {
            model: "DeepSeek",
            status: "Offline",
            color: "error",
        },
    ];
/*
const agents = [
    {
        model: "GPT-5",
        status: "Online",
        color: "success",
    },
    {
        model: "Claude 4",
        status: "Online",
        color: "success",
    },
    {
        model: "Gemini 2.5",
        status: "Busy",
        color: "warning",
    },
    {
        model: "DeepSeek",
        status: "Offline",
        color: "error",
    },
];
*/

export default function AgentHealth() {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                height: 420,
            }}
        >
            <Typography


                variant="h6"
                sx={{

                    fontWeight: 700,
                    mb: 3,
                }}
            >
                AI Platform Health
            </Typography>

            <Stack spacing={3}>
                {agents.map((agent) => (
                    <Box
                        key={agent.model}
                        sx={{

                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography>{agent.model}</Typography>
                        <Chip
                            label={agent.status}
                            color={agent.color}
                            size="small"
                        />
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}