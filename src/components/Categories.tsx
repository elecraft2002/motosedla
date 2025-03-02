import React from "react";
import * as motosedla from "@/services/api";
import Link from "next/link";
import clsx from "clsx";
import Category from "./Category";
import { AnimatePresence } from "framer-motion";

export interface CategoryData extends motosedla.Category {
  children?: motosedla.Category[];
}
function sortCategories(categories: CategoryData[]): CategoryData[] {
  return categories
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category) => ({
      ...category,
      children: category.children ? sortCategories(category.children) : [],
    }));
}
async function transformCategories() {
  const categories: motosedla.Category[] =
    await motosedla.default.getAllCategories();

  const categoryMap = new Map<number, CategoryData>();

  // Inicializace mapy s kategoriemi
  categories.forEach((category) => {
    categoryMap.set(category.id, { ...category, children: [] });
  });

  const categoryData: CategoryData[] = [];

  // Propojení rodičů a dětí
  categories.forEach((category) => {
    if (category.parent_id !== null) {
      const parent = categoryMap.get(category.parent_id);
      if (parent) {
        parent.children?.push(categoryMap.get(category.id)!);
      }
    } else {
      categoryData.push(categoryMap.get(category.id)!);
    }
  });

  return categoryData;
}

export default async function Categories({
  path,
  lang,
  prefix = "",
}: {
  prefix?: string;
  path: string;
  lang: string;
}) {
  // const childrenCategories :CategoryData[]= (await motosedla.default.getRootCategories()).sort(
  //   (a, b) => (a.name > b.name ? 1 : -1)
  // );
  // childrenCategories.map((e)=>{
  //   await motosedla.default.getSubcategoriesById(e.id,true)
  // })
  // await motosedla.default.getAllCategories()
  // // const data: CategoryData[] = childrenCategories;
  // let dataPosition = data;
  // let activeData: CategoryData | undefined;
  const pathArray = path.split("/");
  /* for (let i = 0; i < pathArray.length; i++) {
    const name = pathArray[i];
    // console.log(name);
    activeData = dataPosition.find((e) => e.name === name);
    if (activeData === undefined) continue;
    const subCategories = await motosedla.default.getSubcategoriesById(
      activeData?.id,true
    );
    activeData.children = subCategories;
    dataPosition = activeData.children;
    // console.log(activeData);
  } */
  // console.log(data)
  const data = sortCategories(await transformCategories());
  return (
    <nav>
      <ul className="bg-white p-4 rounded-md mb-auto">
        <AnimatePresence>
          {data.map((item, i) => {
            return (
              <Category
                previous={`.${prefix}/${item.name}`}
                childrenProp={data[i].children}
                item={item}
                key={i}
                pathArray={pathArray}
                lang={lang}
              />
            );
          })}
        </AnimatePresence>
      </ul>
    </nav>
  );
}
