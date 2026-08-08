/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/ActivityTimeline.tsx
 * @description: Responsive enterprise platform activity timeline.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

import {
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

interface Activity {
    id: string;
    title: string;
    description: string;
    time: string;
    type: "agent" | "document" | "workflow";
}

const activities: Activity[] = [
    {
        id: "activity-001",
        title: "AI Agent completed execution",
        description:
            "Document Classification Agent processed 128 documents.",
        time: "8 min ago",
        type: "agent",
    },
    {
        id: "activity-002",
        title: "Knowledge document indexed",
        description:
            "Enterprise AI Architecture was added to the knowledge base.",
        time: "21 min ago",
        type: "document",
    },
    {
        id: "activity-003",
        title: "Workflow completed",
        description:
            "Knowledge Indexing workflow completed successfully.",
        time: "38 min ago",
        type: "workflow",
    },
];

const activityIcons = {
    agent: SmartToyOutlinedIcon,
    document: DescriptionOutlinedIcon,
    workflow: CheckCircleOutlineIcon,
};

export default function ActivityTimeline() {
    return (
        <Paper
            elevation={0}
            sx={{
                width: "100%",

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
            {/* Header */}

            <Box
                sx={{
                    mb: {
                        xs: 2,
                        md: 3,
                    },
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
                    }}
                >
                    Recent Activity
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 0.5,
                    }}
                >
                    Latest platform events
                </Typography>
            </Box>

            {/* Timeline */}

            <Stack
                spacing={{
                    xs: 2,
                    md: 2.5,
                }}
            >
                {activities.map((activity) => {
                    const ActivityIcon =
                        activityIcons[activity.type];

                    return (
                        <Box
                            key={activity.id}
                            sx={{
                                display: "flex",

                                alignItems: "flex-start",

                                gap: {
                                    xs: 1.5,
                                    sm: 2,
                                },

                                minWidth: 0,
                            }}
                        >
                            {/* Icon */}

                            <Box
                                sx={{
                                    width: {
                                        xs: 36,
                                        sm: 42,
                                    },

                                    height: {
                                        xs: 36,
                                        sm: 42,
                                    },

                                    borderRadius: "50%",

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    flexShrink: 0,

                                    backgroundColor: "action.hover",

                                    color: "primary.main",
                                }}
                            >
                                <ActivityIcon
                                    sx={{
                                        fontSize: {
                                            xs: 18,
                                            sm: 21,
                                        },
                                    }}
                                />
                            </Box>

                            {/* Content */}

                            <Box
                                sx={{
                                    minWidth: 0,
                                    flex: 1,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                    }}
                                >
                                    {activity.title}
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

                                        lineHeight: 1.5,
                                    }}
                                >
                                    {activity.description}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display: "block",
                                        mt: 0.5,
                                    }}
                                >
                                    {activity.time}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>
        </Paper>
    );
}