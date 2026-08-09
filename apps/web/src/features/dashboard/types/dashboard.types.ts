export interface DashboardKpi {
    id: string;
    title: string;
    value: string | number;
    subtitle: string;
    icon: "agents" | "documents" | "chats" | "workflows";
}

export interface DashboardData {
    kpis: DashboardKpi[];
}