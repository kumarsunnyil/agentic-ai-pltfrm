/**
 * ------------------------------------------------------------
 * @file: src\features\dashboard\constants\dashboard.data.ts
 * @description: Reusable Enterprise Dashboard, Temporary Data Source.
 * @author: Sunil.S.Kumar
 * @date: 09-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import type { DashboardData } from "../types/dashboard.types";
import { AI_USAGE_DATA } from "./chart.constants";

export const DASHBOARD_DATA: DashboardData = {
    kpis: [
        {
            id: "agents",
            title: "AI Agents",
            value: 24,
            subtitle: "Active agents",
            icon: "agents",
        },
        {
            id: "documents",
            title: "Documents",
            value: 1248,
            subtitle: "Knowledge documents",
            icon: "documents",
        },
        {
            id: "chats",
            title: "AI Chats",
            value: 386,
            subtitle: "Conversations",
            icon: "chats",
        },
        {
            id: "workflows",
            title: "Workflows",
            value: 16,
            subtitle: "Active workflows",
            icon: "workflows",
        },
    ],

    aiUsage: AI_USAGE_DATA,

    agents: [
        {
            model: "GPT-5",
            status: "Online",
        },
        {
            model: "Claude 4",
            status: "Online",
        },
        {
            model: "Gemini 2.5",
            status: "Busy",
        },
        {
            model: "DeepSeek",
            status: "Offline",
        },
    ],

    documents: [
        {
            id: "doc-001",
            title: "Enterprise AI Architecture.pdf",
            type: "PDF",
            time: "10 min ago",
            status: "Indexed",
        },
        {
            id: "doc-002",
            title: "AI Governance Policy.docx",
            type: "DOCX",
            time: "24 min ago",
            status: "Indexed",
        },
        {
            id: "doc-003",
            title: "Agent Security Guidelines.pdf",
            type: "PDF",
            time: "41 min ago",
            status: "Processing",
        },
        {
            id: "doc-004",
            title: "Knowledge Management Strategy.pdf",
            type: "PDF",
            time: "1 hour ago",
            status: "Indexed",
        },
    ],

    conversations: [
        {
            id: "chat-001",
            title: "Enterprise RAG Architecture",
            preview: "How should we structure the retrieval pipeline?",
            time: "8 min ago",
        },
        {
            id: "chat-002",
            title: "AI Governance Policy",
            preview: "Summarize the key governance requirements.",
            time: "25 min ago",
        },
        {
            id: "chat-003",
            title: "Agentic Workflow Design",
            preview: "Compare sequential and parallel orchestration.",
            time: "42 min ago",
        },
        {
            id: "chat-004",
            title: "Knowledge Base Optimization",
            preview: "How can we improve retrieval accuracy?",
            time: "1 hour ago",
        },
    ],

    workflows: [
        {
            id: "wf-001",
            name: "Document Ingestion",
            status: "Running",
            progress: 72,
        },
        {
            id: "wf-002",
            name: "Knowledge Synchronization",
            status: "Running",
            progress: 51,
        },
        {
            id: "wf-003",
            name: "Daily AI Evaluation",
            status: "Queued",
            progress: 0,
        },
        {
            id: "wf-004",
            name: "Vector Index Refresh",
            status: "Completed",
            progress: 100,
        },
    ],

    alerts: [
        {
            id: "alert-001",
            severity: "warning",
            title: "High token usage detected",
            description: "AI Workspace usage increased by 28% in the last hour.",
            time: "12 min ago",
        },
        {
            id: "alert-002",
            severity: "info",
            title: "Knowledge index updated",
            description: "The enterprise knowledge index completed successfully.",
            time: "32 min ago",
        },
        {
            id: "alert-003",
            severity: "error",
            title: "Agent execution failed",
            description: "Document Classification Agent failed during execution.",
            time: "48 min ago",
        },
    ],

    activities: [
        {
            id: "activity-001",
            title: "AI Agent completed execution",
            description: "Document Classification Agent processed 128 documents.",
            time: "8 min ago",
            type: "agent",
        },
        {
            id: "activity-002",
            title: "Knowledge document indexed",
            description: "Enterprise AI Architecture was added to the knowledge base.",
            time: "21 min ago",
            type: "document",
        },
        {
            id: "activity-003",
            title: "Workflow completed",
            description: "Knowledge Indexing workflow completed successfully.",
            time: "38 min ago",
            type: "workflow",
        },
    ],
};