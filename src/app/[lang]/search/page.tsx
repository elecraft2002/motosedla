import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import * as motosedla from "@/services/api";
import * as prismic from "@prismicio/client";
import SearchProducts from "@/components/SearchProducts";
import { Bounded } from "@/components/Bounded";
type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => notFound());
  return (
    <Bounded className="">
      <SearchProducts/>
    </Bounded>
  );
}



export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => notFound());

  return {
    title: `${prismic.asText(settings.data.siteTitle)} | Search`,
    description: "page.data.meta_description",
  };
}
