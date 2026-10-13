import type { ReactNode } from "react";

import { requireSessionUser } from "@/lib/auth/session";
import { AppLayout } from "@/ui/layout";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireSessionUser();

  return <AppLayout>{children}</AppLayout>;
}
