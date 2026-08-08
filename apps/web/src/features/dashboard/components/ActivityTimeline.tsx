/**
 * ------------------------------------------------------------
 * @file: src\features\dashboard\components\ActivityTimeline.tsx
 * @description: Reusable Enterprise dashboard Activity Timeline widget.
 * @author: Sunil.S.Kumar
 * @date: 07-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import {
    AutoAwesomeOutlined,
    CheckCircleOutlined,
    DescriptionOutlined,
    ErrorOutlined,
    PlayCircleOutlined,
} from "@mui/icons-material";

import {
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

type ActivityType =
    | "agent"
    | "document"
    | "workflow"
    | "success"
    | "error";

interface Activity {
    id: string;
    type: ActivityType;
    title: string;
    description: string;
    time: string;
}

const activities: Activity[] = [
    {
        id: "activity-001",
        type: "agent",
        title: "AI Agent executed",
        description:
            "Document Classification Agent processed 42 documents.",
        time: "5 min ago",
    },
    {
        id: "activity-002",
        type: "document",
        title: "Document uploaded",
        description:
            "Enterprise Architecture Guidelines.pdf was added to Knowledge Hub.",
        time: "12 min ago",
    },
    {
        id: "activity-003",
        type: "workflow",
        title: "Workflow started",
        description:
            "Knowledge Synchronization workflow started successfully.",
        time: "18 min ago",
    },
    {
        id: "activity-004",
        type: "success",
        title: "Knowledge index updated",
        description:
            "1,248 documents are now available for enterprise retrieval.",
        time: "32 min ago",
    },
    {
        id: "activity-005",
        type: "error",
        title: "Agent execution failed",
        description:
            "Document Classification Agent encountered a timeout.",
        time: "48 min ago",
    },
];

const activityIcons: Record<
    ActivityType,
    React.ReactNode
> = {
    agent: <AutoAwesomeOutlined />,
    document: <DescriptionOutlined />,
    workflow: <PlayCircleOutlined />,
    success: <CheckCircleOutlined />,
    error: <ErrorOutlined />,
};

const activityColors: Record<ActivityType, string> = {
    agent: "primary.main",
    document: "info.main",
    workflow: "warning.main",
    success: "success.main",
    error: "error.main",
};

export default function ActivityTimeline() {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
            }}
        >
            <Box
                sx={{
                    mb: 3,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Activity Timeline
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 0.5,
                    }}
                >
                    Recent activity across the Enterprise AI Platform
                </Typography>
            </Box>

            <Stack spacing={0}>
                {activities.map((activity, index) => (
                    <Box
                        key={activity.id}
                        sx={{
                            display: "flex",
                            gap: 2,
                            position: "relative",
                            pb: index === activities.length - 1 ? 0 : 3,
                        }}
                    >
                        {/* Timeline Line */}

                        {index !== activities.length - 1 && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: 19,
                                    top: 40,
                                    bottom: 0,
                                    width: 1,
                                    backgroundColor: "divider",
                                }}
                            />
                        )}

                        {/* Timeline Icon */}

                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                backgroundColor: "action.hover",
                                color: activityColors[activity.type],
                                zIndex: 1,
                            }}
                        >
                            {activityIcons[activity.type]}
                        </Box>

                        {/* Timeline Content */}

                        <Box
                            sx={{
                                minWidth: 0,
                                flex: 1,
                                pt: 0.25,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: {
                                        xs: "flex-start",
                                        sm: "center",
                                    },
                                    gap: 2,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    {activity.title}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        flexShrink: 0,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {activity.time}
                                </Typography>
                            </Box>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 0.5,
                                    lineHeight: 1.6,
                                }}
                            >
                                {activity.description}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}