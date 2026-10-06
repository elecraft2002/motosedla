import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

/**
 * A record of locales mapped to a version displayed in URLs. The first entry is
 * used as the default locale.
 */
// TODO: Update this object with your website's supported locales. Keys
// should be the locale IDs registered in your Prismic account, and values
// should be the string that appears in the URL.
const LOCALES = {
  "cs-cz": "cs",
  "en-us": "en",
};
// const LOCALES = {
// 	"en-us": "en",
// 	"cs-cz": "cs",
// };

/** Detects the visitor's locale (as used in URLs, e.g. "cs") from Accept-Language. */
export function detectLocale(request: NextRequest): string {
  const headers: any = {
    "accept-language": request.headers.get("accept-language"),
  };
  const languages = new Negotiator({ headers }).languages();
  const locales = Object.keys(LOCALES);
  const locale = match(languages, locales, locales[0]) as keyof typeof LOCALES;
  return LOCALES[locale];
}

/** Creates a redirect with an auto-detected locale prepended to the URL. */
export function createLocaleRedirect(request: NextRequest): Response {
  request.nextUrl.pathname = `/${detectLocale(request)}${request.nextUrl.pathname}`;

  return Response.redirect(request.nextUrl);
}

/** Determines if a pathname has a locale as its first segment. */
export function pathnameHasLocale(request: NextRequest): boolean {
  const regexp = new RegExp(`^/(${Object.values(LOCALES).join("|")})(\/|$)`);

  return regexp.test(request.nextUrl.pathname);
}

/**
 * Returns the full locale of a given locale. It returns `undefined` if the
 * locale is not in the master list.
 */
export function reverseLocaleLookup(locale: string): string | undefined {
  for (const key in LOCALES) {
    if (LOCALES[key as keyof typeof LOCALES] === locale) {
      return key;
    }
  }
}
export function localeLookup(locale: string): string | undefined {
  return LOCALES[locale as keyof typeof LOCALES];
}

/** Same as pathnameHasLocale, but for a plain path string. */
export function pathnameHasLocaleSegment(pathname: string): boolean {
  const regexp = new RegExp(`^/(${Object.values(LOCALES).join("|")})(\/|$)`);
  return regexp.test(pathname);
}
