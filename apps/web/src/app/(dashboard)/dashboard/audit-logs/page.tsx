import { redirect } from 'next/navigation';

import AuditLogsManagement from '@/features/administration/components/AuditLogsManagement';
import { requireSessionUser } from '@/lib/auth/session';

export default async function AuditLogsPage() {
  const user = await requireSessionUser();

  if (!user.roles.includes('SUPER_ADMIN')) {
    redirect('/dashboard');
  }

  return <AuditLogsManagement />;
}