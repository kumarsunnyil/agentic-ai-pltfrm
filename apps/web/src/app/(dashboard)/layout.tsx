import AppLayout from "@/components/layout/AppLayout";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({
    children,
}: Props) {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    );
}