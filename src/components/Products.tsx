"use client"
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Product from "./Product";
import { Product as IProduct } from "@/services/api";

export default function Products({ products,params }: { products: IProduct[],params:any }) {
  return (
    <AnimatePresence>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product, i) => {
          return (
            <motion.div
              key={product.id}
              layout // Zajistí animaci pouze pro položky, které zůstanou
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            > 
              <Product
                key={product.id}
                currency="CZK"
                lang={params.lang}
                product={product}
              />
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
}
