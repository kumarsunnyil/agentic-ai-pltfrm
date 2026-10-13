import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function GET() {
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: "API URL is not configured" },
      { status: 500 },
    );
  }

  try {
    const apiResponse = await fetch(
      `${API_BASE_URL.replace(/\/+$/, "")}/api/auth/users`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const data: unknown = await apiResponse
      .json()
      .catch(() => ({ message: "Invalid API response" }));

    return NextResponse.json(data, {
      status: apiResponse.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { message: "User service is unavailable" },
      { status: 502 },
    );
  }
}
