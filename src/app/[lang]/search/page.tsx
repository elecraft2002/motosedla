import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import * as motosedla from "@/services/api";
import * as prismic from "@prismicio/client";
import SearchProducts from "@/components/SearchProducts";
import { Bounded } from "@/components/Bounded";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { reverseLocaleLookup } from "@/i18n";
type Params = { uid: string; lang: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  const { lang } = await params;
  const reverseLang = reverseLocaleLookup(lang);
  const settings = await client
    .getSingle("settings", { lang: reverseLang })
    .catch(() => notFound());
  const texts = await client.getSingle("texts", { lang: reverseLang });
  return (
    <Bounded className="">
      <Suspense fallback={<Loading />}>
        <SearchProducts
          currency_course={settings.data.currency_course || 1}
          currency_name={settings.data.currency_name || ""}
          loadMore={texts.data.load_more || ""}
          lang={lang}
          searchText={texts.data.search || ""}
          placeholder={texts.data.search_seat_placeholder || ""}
        />
      </Suspense>
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
  const reverseLang = reverseLocaleLookup(lang);
  const settings = await client
    .getSingle("settings", { lang: reverseLang })
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
