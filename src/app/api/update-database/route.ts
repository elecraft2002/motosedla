import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { env } from "process";

export async function POST(request: Request) {
  const authHeader = request.headers.get("AUTH_TOKEN");
  if (authHeader !== env.AUTH_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  const data = await request.json();
  console.log(data);
  return NextResponse.json({ working: true, now: Date.now() });
}
