
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function GET(request: NextRequest) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: 'API URL is not configured' },
      { status: 500 },
    );
  }

  const accessToken = request.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: 'Not authenticated' },
      { status: 401 },
    );
  }

  try {
    const apiResponse = await fetch(
      `${API_BASE_URL.replace(/\/+$/, '')}/api/auth/me`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      },
    );

    const data: unknown = await apiResponse.json().catch(() => null);

    if (!apiResponse.ok) {
      const response = NextResponse.json(
        { message: 'Session is invalid or expired' },
        { status: apiResponse.status === 401 ? 401 : apiResponse.status },
      );

      if (apiResponse.status === 401) {
        response.cookies.set('access_token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 0,
        });
      }

      return response;
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json(
      { message: 'Authentication service is unavailable' },
      { status: 502 },
    );
  }
}
