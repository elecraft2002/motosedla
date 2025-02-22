import React from "react";
import { Bounded } from "./Bounded";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client";
import Search from "./Search";
import { localeLookup, reverseLocaleLookup } from "@/i18n";

export default async function Header({ lang }: { lang: string }) {
  // console.log(lang,)
  const langReverse = reverseLocaleLookup(lang);
  const client = createClient();
  const settings = await client.getSingle("settings", { lang: langReverse });
  const navigation = await client.getSingle("navigation", {
    lang: langReverse,
  });
  const texts = await client.getSingle("texts", { lang: langReverse });
  console.log("xddd",lang,localeLookup(lang))
  return (
    <header className="fixed w-full backdrop-blur-2xl py-2 md:py-4 px-4 ba z-50 bg-white/50 dark:bg-black/50">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 leading-none">
          <PrismicNextLink
            field={navigation.data.homepage}
            className="text-xl font-semibold tracking-tight mr-auto"
          >
            <PrismicText field={settings.data.siteTitle} />
          </PrismicNextLink>
          <div className="flex">
            <Search
              lang={localeLookup(lang) || ""}
              placeholder={texts.data.search_seat_placeholder || ""}
            />
          </div>
          <nav>
            <ul className="flex flex-wrap gap-6 md:gap-10">
              {navigation.data?.links.map((item) => (
                <li
                  key={asText(item.label)}
                  className="font-semibold tracking-tight "
                >
                  <PrismicNextLink lang={lang} field={item.link}>
                    <PrismicText field={item.label} />
                  </PrismicNextLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
