import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    isActive: boolean;
  };
}

export async function POST(request: NextRequest) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: 'API URL is not configured' },
      { status: 500 },
    );
  }

  let credentials: { email?: string; password?: string };

  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json(
      { message: 'Invalid JSON request body' },
      { status: 400 },
    );
  }

  if (
    typeof credentials.email !== 'string' ||
    typeof credentials.password !== 'string' ||
    !credentials.email.trim() ||
    !credentials.password
  ) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 },
    );
  }

  try {
    const apiResponse = await fetch(
      `${API_BASE_URL.replace(/\/+$/, '')}/api/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        cache: 'no-store',
      },
    );

    const data: unknown = await apiResponse.json().catch(() => null);

    if (!apiResponse.ok) {
      const message =
        typeof data === 'object' &&
        data !== null &&
        'message' in data &&
        typeof data.message === 'string'
          ? data.message
          : 'Unable to sign in';

      return NextResponse.json(
        { message },
        { status: apiResponse.status },
      );
    }

    if (
      typeof data !== 'object' ||
      data === null ||
      !('accessToken' in data) ||
      typeof data.accessToken !== 'string' ||
      !data.accessToken ||
      !('user' in data)
    ) {
      return NextResponse.json(
        { message: 'Invalid authentication response from API' },
        { status: 502 },
      );
    }

    const login = data as LoginResponse;

    const response = NextResponse.json({ user: login.user });

    response.cookies.set('access_token', login.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 900,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: 'Authentication service is unavailable' },
      { status: 502 },
    );
  }
}