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
  const { uid } = await params;
  const category = await motosedla.default
    .getCategoryByPath(uid.replaceAll("-", "/"))
    .catch(() => notFound());
  const childrenCategories = await motosedla.default.getSubcategoriesById(
    category.id
  );
  // console.log(childrenCategories.map((category) => category.id));
  const products = settings.data.show_products_in_subcategories
    ? await motosedla.default.getProductsByCategoryIds([
        category.id,
        ...childrenCategories.map((category) => category.id),
      ])
    : await motosedla.default.getProductsByCategoryId(category.id);
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
        <div className="flex flex-wrap gap-4 text-gray-700 dark:text-slate-300 text-sm mt-4">
          {childrenCategories.map((subCategory) => {
            if (subCategory.parent_id !== category.id) return null;
            return (
              <a
                key={subCategory.id}
                href={`./${uid}-${subCategory.name}`}
                className="hover:text-blue-400 transition-all"
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
  params: Promise<Params>;
}): Promise<Metadata> {
  const client = createClient();
  const {uid}=await params
  const settings = await client.getSingle("settings").catch(() => notFound());
  console.log(uid);
  const category = await motosedla.default
    .getCategoryByPath(uid.replaceAll("-", "/"))
    .catch(() => notFound());

  return {
    title: `${prismic.asText(settings.data.siteTitle)} | ${category.name}`,
    description: "page.data.meta_description",
  };
}

export async function generateStaticParams() {
  const categories = await motosedla.default.getAllCategories();
  let categoriesWithUrl = categories.map((category) => {
    let path: string[] = [];
    if (category.parent_id === null) {
      return { ...category, path: category.name };
    }
    let tempCategory = category;
    path.push(tempCategory.name);
    while (tempCategory.parent_id) {
      tempCategory = categories.find(
        (e) => e.id === tempCategory.parent_id
      ) as motosedla.Category;
      path.push(tempCategory.name);
    }
    return { ...category, path: path.reverse().join("/") };
  });

  return categoriesWithUrl.map((category) => {
    return { uid: category.path, id: category.id };
  });
}
