import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("motosedla");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
