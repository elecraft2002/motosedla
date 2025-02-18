import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import * as motosedla from "@/services/api";
import * as prismic from "@prismicio/client";
import Products from "@/components/Products";
import Link from "next/link";
type Params = { uid: string; lang: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  const { lang } = await params;
  const settings = await client
    .getSingle("settings", { lang })
    .catch(() => notFound());
    const texts = await client.getSingle("texts", { lang });

  const childrenCategories = await motosedla.default.getRootCategories();
  // console.log(childrenCategories.map((category) => category.id));
  const products = await motosedla.default.getAllProducts();
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Link href={`/${lang}/category/`}>
          <h2 className="text-2xl font-bold tracking-tight">
            {prismic.asText(settings.data.siteTitle)}
          </h2>
        </Link>
        <div className="flex flex-wrap gap-4 text-gray-700 dark:text-slate-300 text-sm mt-4">
          {childrenCategories.map((subCategory) => {
            if (subCategory.parent_id !== null) return null;
            return (
              <Link
                key={subCategory.id}
                className="hover:text-blue-400 transition-all"
                href={`/${lang}/category/${subCategory.name}`}
              >
                {subCategory.name}
              </Link>
            );
          })}
        </div>
        <Products loadMore={texts.data.load_more||""} lang={lang} products={products} />
      </div>
    </div>
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
