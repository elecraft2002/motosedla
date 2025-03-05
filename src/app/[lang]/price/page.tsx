import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import * as motosedla from "@/services/api";
import * as prismic from "@prismicio/client";
import Products from "@/components/Products";
import Link from "next/link";
import { reverseLocaleLookup } from "@/i18n";
import Configuration from "@/components/Configuration";
import { Bounded } from "@/components/Bounded";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
type Params = { uid: string; lang: any };

export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  const { lang } = await params;
  const langReverse = reverseLocaleLookup(lang);
  const configuration = await client
    .getSingle("configuration", {
      lang: langReverse,
    })
    .catch(() => notFound());
  const price = await client
    .getSingle("price", { lang: langReverse })
    .catch(() => notFound());

  const settings = await client
    .getSingle("settings", { lang: langReverse })
    .catch(() => notFound());
  const texts = await client.getSingle("texts", { lang: langReverse });

  return (
    <>
      <Bounded>
        <Configuration
          name={price.data.name || ""}
          shortDescription={price.data.description}
          price={4900}
          slices={configuration.data.slices}
          currencyCourse={settings.data.currency_course || 1}
          currencyName={settings.data.currency_name || ""}
        />
      </Bounded>
      <SliceZone slices={price.data.slices} components={components} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const client = createClient();
  let { lang } = await params;
  lang = reverseLocaleLookup(lang);
  const settings = await client
    .getSingle("settings", { lang })
    .catch(() => notFound());
  return {
    title: `${prismic.asText(settings.data.siteTitle)}`,
    description: "page.data.meta_description",
  };
}

export async function generateStaticParams() {
  const client = createClient();

  const repository = await client.getRepository();
  return repository.languages.map((lang) => {
    return { lang: lang.id };
  });
}
