"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Product as IProduct } from "@/services/api";
import { useSearchParams } from "next/navigation";
import Button, { ButtonType } from "./Button";

export default function Products({
  products,
  lang,
  loadMore
}: {
  products: IProduct[];
  lang: string;
  loadMore:string
}) {
  const params: any = useSearchParams();
  const offset = 10;
  const [len, setLen] = useState(offset);
  return (
    <AnimatePresence mode="wait">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product, i) => {
          if (i >= len) return null;
          return (
            <motion.div
              key={product.id}
              layout // Zajistí animaci pouze pro položky, které zůstanou
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Product key={product.id} currency="CZK" product={product}lang={lang} />
            </motion.div>
          );
        })}
      </div>
      {len < products.length && (
        <Button
          className="m-auto"
          type={ButtonType.secondary}
          onClick={() => {
            setLen((oldLen) => oldLen + offset);
          }}
        >
          {loadMore}
        </Button>
      )}
    </AnimatePresence>
  );
}
