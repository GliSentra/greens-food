// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  // 1. Verifikasi token rahasia
  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return new NextResponse(JSON.stringify({ message: "Invalid Token" }), {
      status: 401,
    });
  }

  // 2. Ambil path yang ingin di-revalidasi dari body request
  const body = await request.json();
  const path = body.path;

  if (!path) {
    return new NextResponse(
      JSON.stringify({ message: "Missing path to revalidate" }),
      { status: 400 }
    );
  }

  // 3. Lakukan revalidasi
  revalidatePath(path);

  return new NextResponse(
    JSON.stringify({ revalidated: true, now: Date.now() }),
    { status: 200 }
  );
}
