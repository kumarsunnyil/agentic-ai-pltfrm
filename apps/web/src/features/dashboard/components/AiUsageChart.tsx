/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/AiUsageChart.tsx
 * @description: Responsive AI usage analytics dashboard widget.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AI_USAGE_DATA } from "../constants/chart.constants";

export default function AiUsageChart() {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: {
          xs: 340,
          sm: 380,
          md: 420,
        },
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
        borderRadius: {
          xs: 2.5,
          md: 4,
        },
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: {
            xs: 16,
            sm: 17,
            md: 18,
          },
          mb: {
            xs: 2,
            md: 3,
          },
        }}
      >
        AI Usage Analytics
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: {
            xs: 260,
            sm: 300,
            md: 330,
          },
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={AI_USAGE_DATA}
            margin={{
              top: 5,
              right: 5,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="usageGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#3B82F6"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#3B82F6"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12,
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="requests"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#usageGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}