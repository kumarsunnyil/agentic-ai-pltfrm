import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isActive: boolean;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken || !API_BASE_URL) {
    return null;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL.replace(/\/+$/, '')}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return null;
    }

    const user: unknown = await response.json();

    if (
      typeof user !== 'object' ||
      user === null ||
      !('id' in user) ||
      !('email' in user) ||
      !('roles' in user) ||
      !('isActive' in user) ||
      typeof user.id !== 'string' ||
      typeof user.email !== 'string' ||
      !Array.isArray(user.roles) ||
      typeof user.isActive !== 'boolean' ||
      !user.isActive
    ) {
      return null;
    }

    return user as SessionUser;
  } catch {
    return null;
  }
}

export async function requireSessionUser(): Promise<SessionUser> {
  const user = await getSessionUser();

  if (!user) {
    redirect('/auth/login');
  }

  return user;
}