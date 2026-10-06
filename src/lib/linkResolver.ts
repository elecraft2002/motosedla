import type { LinkResolverFunction } from "@prismicio/client";
import { localeLookup } from "@/i18n";

/**
 * Odkazy na dokumenty z Prismicu vždy s jazykovým prefixem (/cs/..., /en/...).
 * Bez prefixu je proxy musela přesměrovávat a klientský prefetch v Next 16
 * se pak donekonečna opakoval.
 */
export const linkResolver: LinkResolverFunction = (doc) => {
  const locale = localeLookup(doc.lang);
  if (!locale) return undefined;
  if (doc.type === "page") {
    return doc.uid === "home" ? `/${locale}` : `/${locale}/${doc.uid}`;
  }
  if (doc.type === "price") return `/${locale}/price`;
  return undefined;
};
