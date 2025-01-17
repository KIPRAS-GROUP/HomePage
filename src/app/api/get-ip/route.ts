// /app/api/get-ip/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const ip = "Not found"; // Eğer proxy varsa, x-forwarded-for kullanılabilir.
  return NextResponse.json({ ip });
}
