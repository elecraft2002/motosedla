import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import * as motosedla from "@/services/api";
import * as prismic from "@prismicio/client";
import Products from "@/components/Products";
type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => notFound());
  const category = await motosedla.default.getCategoryByPath(
    params.uid.replaceAll("-", "/")
  );
  // .catch(() => notFound());
  const childrenCategories = await motosedla.default.getSubcategoriesById(
    category.id
  );
  const products = settings.data.show_products_in_subcategories
    ? await motosedla.default.getProductsByCategoryIds([
        category.id,
        ...childrenCategories.map((category) => category.id),
      ])
    : await motosedla.default.getProductsByCategoryId(category.id);
  console.log(childrenCategories);
  // console.log("products", products);
  //   return <SliceZone slices={page.data.slices} components={components} />;
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
        <div>
          {childrenCategories.map((subCategory) => {
            if (subCategory.parent_id !== category.id) return null;
            return (
              <a
                key={subCategory.id}
                href={`./${params.uid}-${subCategory.name}`}
              >
                {subCategory.name}
              </a>
            );
          })}
        </div>
        <Products params={params} products={products}/>
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
  console.log(params.uid);
  const category = await motosedla.default
    .getCategoryByPath(params.uid.replaceAll("-", "/"))
    .catch(() => notFound());
  //   console.log(category);

  return {
    title: `${prismic.asText(settings.data.siteTitle)} | ${category.name}`,
    description: "page.data.meta_description",
  };
}

export async function generateStaticParams() {
  const categories = await motosedla.default.getAllCategories();
  const categoriesWithUrl = categories.map((category) => {
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
