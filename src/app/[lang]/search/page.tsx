import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import * as motosedla from "@/services/api";
import * as prismic from "@prismicio/client";
import SearchProducts from "@/components/SearchProducts";
import { Bounded } from "@/components/Bounded";
type Params = { uid: string; lang: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  const { lang } = await params;
  const settings = await client
    .getSingle("settings", { lang })
    .catch(() => notFound());
  const texts = await client.getSingle("texts", { lang });
  return (
    <Bounded className="">
      <SearchProducts
        loadMore={texts.data.load_more || ""}
        lang={lang}
        searchText={texts.data.search || ""}
        placeholder={texts.data.search_seat_placeholder || ""}
      />
    </Bounded>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const client = createClient();
  const { lang } = await params;
  const settings = await client
    .getSingle("settings", { lang })
    .catch(() => notFound());

  return {
    title: `${prismic.asText(settings.data.siteTitle)} | Search`,
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
