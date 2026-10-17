import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".txt": "text/plain",
};

function getExtension(filename: string) {
  return filename.slice(filename.lastIndexOf(".")).toLowerCase();
}

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
    const upstream = await fetch(
      `${API_BASE_URL.replace(/\/+$/, "")}/api/documents`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
    );

    const data: unknown = await upstream.json().catch(() => null);

    return NextResponse.json(data, {
      status: upstream.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { message: "Document service is unavailable" },
      { status: 502 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return NextResponse.json(
      { message: "Invalid request origin" },
      { status: 403 },
    );
  }

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
    const incomingForm = await request.formData();
    const file = incomingForm.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { message: "Choose a document to upload" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "The maximum file size is 10 MB" },
        { status: 400 },
      );
    }

    const extension = getExtension(file.name);
    const expectedMimeType = ALLOWED_FILES[extension];

    if (!expectedMimeType || file.type !== expectedMimeType) {
      return NextResponse.json(
        { message: "Upload a PDF, DOCX, or TXT document" },
        { status: 400 },
      );
    }

    // Forward only the file field. Let fetch generate the multipart boundary.
    const outgoingForm = new FormData();
    outgoingForm.append("file", file, file.name);

    const upstream = await fetch(
      `${API_BASE_URL.replace(/\/+$/, "")}/api/documents/upload`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: outgoingForm,
        cache: "no-store",
      },
    );

    const data: unknown = await upstream.json().catch(() => null);

    return NextResponse.json(data, {
      status: upstream.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { message: "Document service is unavailable" },
      { status: 502 },
    );
  }
}
