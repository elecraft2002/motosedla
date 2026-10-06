// // ./src/middleware.ts

// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@/prismicio";

// export async function proxy(request: NextRequest) {
//   const client = createClient();
//   const repository = await client.getRepository();

//   const locales = repository.languages.map((lang) => lang.id);
//   const defaultLocale = locales[0];

//   // Check if there is any supported locale in the pathname
//   const { pathname } = request.nextUrl;

//   const pathnameIsMissingLocale = locales.every(
//     (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   );

//   // Redirect to default locale if there is no supported locale prefix
//   if (pathnameIsMissingLocale) {
//     return NextResponse.rewrite(
//       new URL(`/${defaultLocale}${pathname}`, request.url)
//     );
//   }
// }

// export const config = {
//   matcher: ["/((?!_next|images).*)", "/"],
// };

// import { createLocaleRedirect } from "@prismicio/next";
import {
  createLocaleRedirect,
  detectLocale,
  pathnameHasLocale,
} from "@/i18n";
// import { createClient } from "@/prismicio";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  if (!pathnameHasLocale(request)) {
    // Odkazy v menu nemají jazykový prefix. Přesměrování u prefetch/RSC požadavků
    // klientský router v Next 16 donekonečna opakuje, proto je přepíšeme (rewrite) bez redirectu.
    // Next hlavičku `rsc` ani parametr `_rsc` do proxy nepředává, rozpoznáme je podle fetch()
    // požadavku (Sec-Fetch-Dest: empty), kdežto běžná navigace má dest "document".
    const isRscRequest = request.headers.get("sec-fetch-dest") === "empty";
    if (isRscRequest) {
      const url = request.nextUrl.clone();
      url.pathname = `/${detectLocale(request)}${request.nextUrl.pathname}`;
      return NextResponse.rewrite(url);
    }
    return createLocaleRedirect(request);
  }
  // const client = createClient();
  // const redirect = await createLocaleRedirect({ client, request });

  // if (redirect) {
  //   return redirect;
  // }
}

export const config = {
  // Do not localize these paths  
  // Bez statických souborů (cokoli s příponou: robots.txt, favicon.ico, sitemap.xml, ...)
  matcher: ["/((?!_next|api|slice-simulator|.*\\..*).*)"],
};
