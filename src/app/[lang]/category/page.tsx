import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import * as motosedla from "@/services/api";
import * as prismic from "@prismicio/client";
import Products from "@/components/Products";
type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => notFound());

  const childrenCategories = await motosedla.default.getRootCategories();
  console.log(childrenCategories.map((category) => category.id));
  const products = await motosedla.default.getAllProducts();
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">
          {prismic.asText(settings.data.siteTitle)}
        </h2>
        <div className="flex flex-wrap gap-4 text-gray-700 dark:text-slate-300 text-sm mt-4">
          {childrenCategories.map((subCategory) => {
            if (subCategory.parent_id !== null) return null;
            return (
              <a
                key={subCategory.id}
                className="hover:text-blue-400 transition-all"
                href={`/category/${subCategory.name}`}
              >
                {subCategory.name}
              </a>
            );
          })}
        </div>
        <Products products={products} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => notFound());

  return {
    title: `${prismic.asText(settings.data.siteTitle)}`,
    description: "page.data.meta_description",
  };
}
