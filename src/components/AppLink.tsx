"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { asLink, type LinkField } from "@prismicio/client";
import type { ReactNode } from "react";
import { linkResolver } from "@/lib/linkResolver";
import { pathnameHasLocaleSegment } from "@/i18n";

/**
 * Odkaz z Prismicu. Interní cesty bez jazyka (např. "/category") doplní o aktuální jazyk,
 * aby je proxy nemusela přesměrovávat.
 */
export default function AppLink({
  field,
  className,
  tabIndex,
  lang: contentLang,
  "aria-label": ariaLabel,
  children,
}: {
  field: LinkField;
  className?: string;
  tabIndex?: number;
  lang?: string;
  "aria-label"?: string;
  children?: ReactNode;
}) {
  const { lang } = useParams<{ lang?: string }>();
  let href = asLink(field, { linkResolver });
  if (!href) return <>{children}</>;

  const external = !href.startsWith("/");
  if (external) {
    const newTab = "target" in field && field.target === "_blank";
    return (
      <a
        href={href}
        className={className}
        tabIndex={tabIndex}
        lang={contentLang}
        aria-label={ariaLabel}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  if (lang && !pathnameHasLocaleSegment(href)) href = `/${lang}${href}`;
  return (
    <Link
      href={href}
      className={className}
      tabIndex={tabIndex}
      lang={contentLang}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
