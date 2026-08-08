/**
 * ------------------------------------------------------------
 * @file: src\features\dashboard\components\AiUsageChart.tsx
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import {
    Paper,
    Typography,
} from "@mui/material";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import { AI_USAGE_DATA } from "../constants/chart.constants";

export default function AiUsageChart() {
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
            sx = {{

                variant:"h6",
                fontWeight:700,
                mb:3,
            }}
            >
                AI Usage Analytics
            </Typography>

            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={AI_USAGE_DATA}>
                    <defs>
                        <linearGradient id="usage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="requests"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        fill="url(#usage)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Paper>
    );
}