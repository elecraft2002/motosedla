"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Product as IProduct } from "@/services/api";
import Button, { ButtonType } from "./Button";

export default function Products({
  products,
  lang,
  loadMore,
  currency_course,
  currency_name,
}: {
  products: IProduct[];
  lang: string;
  loadMore: string;
  currency_name: string;
  currency_course: number;
}) {
  const offset = 20;
  const [len, setLen] = useState(offset);
  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <AnimatePresence>
          {products.sort((a, b) => (a.name > b.name ? 1 : -1)).slice(0, len).map((product, i) => {
            return (
              <motion.div
                key={product.id}
                layout // Zajistí animaci pouze pro položky, které zůstanou
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: (i % offset) * 0.05 }}
              >
                <Product
                  key={product.id}
                  currency_name={currency_name}
                  currency_course={currency_course}
                  product={product}
                  lang={lang}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {len < products.length && (
        <Button
          className="m-auto mt-4"
          type={ButtonType.secondary}
          onClick={() => {
            setLen((oldLen) => oldLen + offset);
          }}
        >
          {loadMore}
        </Button>
      )}
    </>
  );
}
