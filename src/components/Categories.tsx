import React from "react";
import * as motosedla from "@/services/api";
import Link from "next/link";

export default async function Categories({
  path,
  lang,
}: {
  path: string;
  lang: string;
}) {
  const childrenCategories = (await motosedla.default.getRootCategories()).sort(
    (a, b) => (a.name > b.name ? 1 : -1)
  );
  return (
    <div>
      <ul>
        {childrenCategories.map((item, i) => {
            
          return (
            <li key={i}>
              <Link key={i} href={`/${lang}/category/${item.name}`}>
                <span className="before:content-['>'] before:text-slate-500 before:px-2 before:scale-50">
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
