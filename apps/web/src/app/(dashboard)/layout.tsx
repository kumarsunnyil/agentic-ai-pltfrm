import { AppLayout } from "@/ui/layout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AppLayout>{children}</AppLayout>;
}