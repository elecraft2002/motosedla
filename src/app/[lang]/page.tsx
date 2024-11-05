import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlternateLanguage, asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import { components } from "@/slices";

export async function generateMetadata({
  params,
}: {
  params: Promise<any>;
}): Promise<Metadata> {
  const client = createClient();
  const { lang } = await params;
  console.log("lang",lang);
  const page = await client
    .getByUID("page", "home", { lang })
    .catch(() => notFound());
  return {
    title: asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<any>;
}) {
  const client = createClient();const { lang } = await params;
  const page = await client.getByUID("page", "home",{lang}).catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page", {
    lang: "*",
    filters: [prismic.filter.at("my.page.uid", "home")],
  });

  return pages.map((page: any) => {
    return { lang: page.lang };
  });
}
