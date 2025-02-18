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
  const settings = await client.getSingle("settings").catch(() => notFound());
  const { uid } = await params;
  const { lang } = await params;
  const path = decodeURIComponent(uid.replaceAll("-", "/"));
  const category = await motosedla.default
    .getCategoryByPath(path)
    .catch(() => notFound());
  const childrenCategories = await motosedla.default
    .getSubcategoriesById(category.id)
    .catch(() => notFound());
  const texts = await client.getSingle("texts", { lang });
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
        <h2 className="text-xl font-bold tracking-tight flex flex-wrap">
          <Link href={`/${lang}/category/`}>
            {prismic.asText(settings.data.siteTitle)}
          </Link>
          {path.split("/").map((e, index) => {
            let link = "";
            for (let i = 0; i <= index; i++) {
              const word = path.split("/")[i];
              link += word + "/";
            }

            return (
              <Link key={index} href={`/${lang}/category/${link}`}>
                <span className="before:content-['>'] before:text-slate-500 before:px-2 before:scale-50">
                  {e}
                </span>
              </Link>
            );
          })}
        </h2>
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
        <Products
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
  const { uid } = await params;
  const { lang } = await params;
  const settings = await client
    .getSingle("settings", { lang })
    .catch(() => notFound());
  // console.log(uid);
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
  const client = createClient();

  const repository = await client.getRepository();
  const languages = repository.languages.map((lang) => {
    return { lang: lang.id };
  });
  /*   console.log("Prerender: ",
    languages.map((lang) => {
      return categoriesWithUrl.map((category) => {
        return { uid: category.path, id: category.id, lang };
      });
    }).flat()
  ); */
  return languages
    .map((lang) => {
      return categoriesWithUrl.map((category) => {
        return { uid: category.path, id: category.id, lang: lang.lang };
      });
    })
    .flat();
  /* return categoriesWithUrl.map((category) => {
    return { uid: category.path, id: category.id };
  }); */
}
