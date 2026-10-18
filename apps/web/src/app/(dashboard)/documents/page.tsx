import DocumentsManagement from '@/features/documents/components/DocumentsManagement';
import { requireSessionUser } from '@/lib/auth/session';

export default async function DocumentsPage() {
  const user = await requireSessionUser();

  const canUpload = user.roles.some((role) =>
    ['AUTHOR', 'ADMIN', 'SUPER_ADMIN'].includes(role),
  );

  return <DocumentsManagement canUpload={canUpload} />;
}