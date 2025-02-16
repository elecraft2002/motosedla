import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { env } from "process";

export async function POST(request: Request) {
  const authHeader = request.headers.get("AUTH_TOKEN");
  if (authHeader !== env.AUTH_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  const data = await request.json();
  console.log(data, process.env.SERVER_URL);
  try {
    const response = await fetch(
      process.env.SERVER_URL /* "http://localhost:8080" */ +
        "/api/update-database",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Chyba při synchronizaci: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(result);
    if (result.revalidete) revalidateTag("motosedla");
    console.log("Synchronizace úspěšná:", result);
    return NextResponse.json({
      now: Date.now(),
      revalidated: result.revalidete,
    });
  } catch (error) {
    console.error("Chyba při odesílání požadavku:", error);
  }
  // console.log(data);
  return NextResponse.json({ working: false, now: Date.now() });
}
