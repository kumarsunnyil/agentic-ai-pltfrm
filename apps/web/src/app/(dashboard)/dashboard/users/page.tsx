import { redirect } from 'next/navigation';

import UsersManagement from '@/features/administration/components/UsersManagement';
import { requireSessionUser } from '@/lib/auth/session';

export default async function UsersPage() {
  const user = await requireSessionUser();

  const canViewUsers =
    user.roles.includes('ADMIN') ||
    user.roles.includes('SUPER_ADMIN');

  if (!canViewUsers) {
    redirect('/dashboard');
  }

  return (
    <UsersManagement
      currentUserId={user.id}
      canManageRoles={user.roles.includes('SUPER_ADMIN')}
    />
  );
}