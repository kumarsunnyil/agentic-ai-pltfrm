/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/AiUsageChart.tsx
 * @description: Enterprise AI usage analytics dashboard widget.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import {
  Box,
  Chip,
  Paper,
  Stack,
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

import type { AiUsageData } from "../types/chart.types";

interface AiUsageChartProps {
  aiUsage: AiUsageData[];
}

export default function AiUsageChart({
  aiUsage,
}: AiUsageChartProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: {
          xs: 390,
          sm: 430,
          md: 450,
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
        borderColor: "rgba(148,163,184,0.15)",
        background: "linear-gradient(145deg, rgba(30,41,59,0.92), rgba(15,23,42,0.96))",
        boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "rgba(59,130,246,0.28)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          gap: 2,
          mb: {
            xs: 2,
            md: 2.5,
          },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: 16,
                sm: 17,
                md: 18,
              },
              letterSpacing: -0.2,
            }}
          >
            AI Usage Analytics
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              fontSize: {
                xs: 12,
                sm: 13,
              },
            }}
          >
            AI request activity over the last 7 days
          </Typography>
        </Box>

        <Chip
          icon={
            <TrendingUpRoundedIcon
              sx={{
                fontSize: 17,
              }}
            />
          }
          label="+18.4%"
          size="small"
          color="success"
          variant="outlined"
          sx={{
            flexShrink: 0,
            fontWeight: 600,
            "& .MuiChip-icon": {
              color: "inherit",
            },
          }}
        />
      </Box>

      <Stack
        direction="row"
        spacing={{
          xs: 1,
          sm: 1.5,
        }}
        sx={{
          mb: {
            xs: 2,
            md: 2.5,
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            px: {
              xs: 1.25,
              sm: 1.5,
            },
            py: {
              xs: 1,
              sm: 1.25,
            },
            borderRadius: 2,
            backgroundColor: "rgba(59,130,246,0.07)",
            border: "1px solid rgba(59,130,246,0.10)",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Total Requests
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontWeight: 700,
              fontSize: {
                xs: 17,
                sm: 19,
              },
            }}
          >
            12,486
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            px: {
              xs: 1.25,
              sm: 1.5,
            },
            py: {
              xs: 1,
              sm: 1.25,
            },
            borderRadius: 2,
            backgroundColor: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.10)",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Avg. Response
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontWeight: 700,
              fontSize: {
                xs: 17,
                sm: 19,
              },
            }}
          >
            1.42s
          </Typography>
        </Box>

        <Box
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            flex: 1,
            minWidth: 0,
            px: 1.5,
            py: 1.25,
            borderRadius: 2,
            backgroundColor: "rgba(168,85,247,0.06)",
            border: "1px solid rgba(168,85,247,0.10)",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Tokens Used
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontWeight: 700,
              fontSize: 19,
            }}
          >
            2.8M
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          width: "100%",
          height: {
            xs: 230,
            sm: 270,
            md: 290,
          },
          minWidth: 0,
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={aiUsage}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="aiUsageGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#60a5fa"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#60a5fa"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(148,163,184,0.10)"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(148,163,184,0.18)",
                borderRadius: 10,
                color: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
              labelStyle={{
                color: "#94a3b8",
              }}
            />

            <Area
              type="monotone"
              dataKey="requests"
              stroke="#60a5fa"
              strokeWidth={2.5}
              fill="url(#aiUsageGradient)"
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                fill: "#60a5fa",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}