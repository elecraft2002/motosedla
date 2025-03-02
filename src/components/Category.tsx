"use client";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as motosedla from "@/services/api";
import { CategoryData } from "./Categories";
import arrow from "../../public/svg/right-arrow.svg";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Category({
  lang,
  pathArray,
  item,
  childrenProp,
  previous,
}: {
  childrenProp?: CategoryData[];
  lang: string;
  pathArray: string[];
  item: motosedla.Category;
  previous: string;
}) {
  const active: boolean =
    pathArray == undefined
      ? false
      : item.name.toLocaleLowerCase() == pathArray[0]?.toLocaleLowerCase();
  const [childrenData, setChildrenData] = useState<CategoryData[] | undefined>(
    childrenProp
  );
  const [state, setState] = useState<"loading" | "loaded">("loaded");
  const [isActive, setActive] = useState<boolean>(active);
  const [, ...newPathArr] = pathArray;
  const showIcon = (childrenData && childrenData?.length) || !childrenData;
  const setData = () => {
    if (childrenData) return;
    setState("loading");
    motosedla.default.getSubcategoriesById(item.id).then((e) => {
      setState("loaded");
      setChildrenData(e);
    });
  };
  return (
    <li className="p-2 border-t-1 border-black first:border-none">
      {showIcon && (
        <span
          className={clsx(
            "text-slate-500 w-3 h-3 absolute transition-all mt-1",
            isActive && "rotate-90",
            !isActive && "rotate-0"
          )}
          onClick={() => {
            setActive((oldActive) => !oldActive);
            setData();
            console.log("click");
          }}
        >
          <Image {...arrow} />
        </span>
      )}
      <Link href={`${previous}`} className="pl-5 font-medium">
        <span className={clsx(active && "text-red-500")}>{item.name}</span>
        {isActive && (
          <motion.ul
          className="ml-4 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {childrenData?.map((e) => {
              return (
                <Category
                  previous={`${previous}-${e.name}`}
                  key={e.id}
                  childrenProp={e.children}
                  item={e}
                  lang={lang}
                  pathArray={newPathArr}
                />
              );
            })}
          </motion.ul>
        )}
      </Link>
    </li>
  );
}
