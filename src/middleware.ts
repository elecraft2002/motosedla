// // ./src/middleware.ts

// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@/prismicio";

// export async function middleware(request: NextRequest) {
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
import { createLocaleRedirect, pathnameHasLocale } from "@/i18n";
// import { createClient } from "@/prismicio";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (!pathnameHasLocale(request)) {
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
  matcher: ["/((?!_next|api|slice-simulator|icon.svg|sitemap).*)"],
};
