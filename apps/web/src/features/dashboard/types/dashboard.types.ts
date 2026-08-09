/**
 * ------------------------------------------------------------
 * @file: src\features\dashboard\types\dashboard.types.ts
 * @description: Reusable Enterprise Dashboard types constants.
 * @author: Sunil.S.Kumar
 * @date: 09-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */


export interface DashboardKpi {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  icon: "agents" | "documents" | "chats" | "workflows";
}

export interface DashboardAgent {
  model: string;
  status: "Online" | "Busy" | "Offline";
}

export interface DashboardDocument {
  id: string;
  title: string;
  type: string;
  time: string;
  status: "Indexed" | "Processing" | "Failed";
}

export interface DashboardConversation {
  id: string;
  title: string;
  preview: string;
  time: string;
}

export interface DashboardWorkflow {
  id: string;
  name: string;
  status: "Running" | "Completed" | "Queued";
  progress: number;
}

export interface DashboardAlert {
  id: string;
  severity: "error" | "warning" | "info";
  title: string;
  description: string;
  time: string;
}

export interface DashboardActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "agent" | "document" | "workflow";
}

export interface DashboardData {
  kpis: DashboardKpi[];
  aiUsage: {
    day: string;
    requests: number;
    tokens: number;
  }[];
  agents: DashboardAgent[];
  documents: DashboardDocument[];
  conversations: DashboardConversation[];
  workflows: DashboardWorkflow[];
  alerts: DashboardAlert[];
  activities: DashboardActivity[];
}