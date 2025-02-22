import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import * as motosedla from "@/services/api";
import * as prismic from "@prismicio/client";
import Products from "@/components/Products";
import Link from "next/link";
import { reverseLocaleLookup } from "@/i18n";
type Params = { uid: string; lang: any };

export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  const { lang } = await params;
  const langReverse = reverseLocaleLookup(lang);

  const settings = await client
    .getSingle("settings", { lang: langReverse })
    .catch(() => notFound());
  const texts = await client.getSingle("texts", { lang: langReverse });

  const childrenCategories = await motosedla.default.getRootCategories();
  // console.log(childrenCategories.map((category) => category.id));
  const products = await motosedla.default.getAllProducts();
  console.log(products)
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
            return (
              <Link
                key={subCategory.id}
                className="hover:text-blue-400 transition-all"
                href={`/${encodeURIComponent(lang)}/category/${encodeURIComponent(subCategory.name)}`}
              >
                {subCategory.name}
              </Link>
            );
          })}
        </div>
        <Products
          currency_course={settings.data.currency_course || 1}
          currency_name={settings.data.currency_name || ""}
          loadMore={texts.data.load_more || ""}
          lang={lang}
          products={products}
        />
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
