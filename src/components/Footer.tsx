import { createClient } from "@/prismicio";
import { PrismicLink } from "@prismicio/react";
import React from "react";
import * as prismic from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { reverseLocaleLookup } from "@/i18n";

export default async function Footer({ lang }: { lang: string }) {
  const client = createClient();
  const langReverse = reverseLocaleLookup(lang);

  const settings = await client.getSingle("settings", { lang: langReverse });
  const footer = await client.getSingle("footer_navigation", {
    lang: langReverse,
  });
  const texts = await client.getSingle("texts", { lang: langReverse });
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-black mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            {prismic.isFilled.image(settings.data.site_logo) && (
              <PrismicNextImage field={settings.data.site_logo.small} />
            )}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {prismic.asText(settings.data.siteTitle)}
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {footer.data.links.map((link, i) => {
              return (
                <li key={i}>
                  <PrismicLink
                    field={link.link}
                    className="hover:underline me-4 md:me-6"
                  >
                    {link.label}
                  </PrismicLink>
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <PrismicNextLink
            field={footer.data.homepage}
            className="hover:underline"
          >
            {prismic.asText(settings.data.siteTitle)}
          </PrismicNextLink>
          . {texts.data.copyright_footer}
        </span>
      </div>
    </footer>
  );
}
