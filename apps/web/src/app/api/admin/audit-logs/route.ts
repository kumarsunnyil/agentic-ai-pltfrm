
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const ALLOWED_QUERY_PARAMS = [
  'page',
  'limit',
  'actorUserId',
  'targetUserId',
  'dateFrom',
  'dateTo',
] as const;

export async function GET(request: NextRequest) {
  const accessToken = (await cookies()).get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: 'Not authenticated' },
      { status: 401 },
    );
  }

  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: 'API URL is not configured' },
      { status: 500 },
    );
  }

  const query = new URLSearchParams();

  for (const key of ALLOWED_QUERY_PARAMS) {
    const value = request.nextUrl.searchParams.get(key);

    if (value) {
      query.set(key, value);
    }
  }

  try {
    const apiUrl = new URL(
      `${API_BASE_URL.replace(/\/+$/, '')}/api/auth/audit-logs`,
    );

    apiUrl.search = query.toString();

    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    const data: unknown = await apiResponse
      .json()
      .catch(() => ({ message: 'Invalid API response' }));

    return NextResponse.json(data, {
      status: apiResponse.status,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json(
      { message: 'Audit service is unavailable' },
      { status: 502 },
    );
  }
}
