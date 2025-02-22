// import { NextResponse } from "next/server";
// import { revalidateTag } from "next/cache";
// import { env } from "process";

// export async function POST(request: Request) {
//   const authHeader = request.headers.get("AUTH_TOKEN");
//   if (authHeader !== env.AUTH_TOKEN) {
//     return NextResponse.json({ error: "Unauthorized" });
//   }
//   let revalidete = false;
//   const chunkSize = 50;
//   const data = await request.json();
//   console.log(data, process.env.SERVER_URL);
//   try {
//     for (let i = 0; i < data.length; i += chunkSize) {
//       const chunk = data.slice(i, i + chunkSize);
//       const response = await fetch(
//         process.env.SERVER_URL + "/update-database",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(chunk),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Chyba při synchronizaci: ${response.statusText}`);
//       }

//       const result = await response.json();
//       console.log(result);
//       if (!revalidete) revalidete = result.revalidete;
//       console.log("Synchronizace úspěšná:", result);
//     }
//     if (revalidete) revalidateTag("motosedla");
//     return NextResponse.json({
//       now: Date.now(),
//       revalidated: revalidete,
//     });
//   } catch (error) {
//     console.error("Chyba při odesílání požadavku:", error);
//   }
//   // console.log(data);
//   return NextResponse.json({ working: false, now: Date.now() });
// }
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST() {
  // revalidateTag("motosedla");
  // revalidatePath('/', 'layout')
  revalidatePath("*")

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
