import { Product as IProduct } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Product({
  product,
  currency,
  lang,
}: {
  product: IProduct;
  currency: string;
  lang: string;
}) {
  // console.log(product)
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
        
          width={300}
          height={300}
          // src={product.image_url}
          src={`https://motosedla-7644.rostiapp.cz/image/${product.id_google}_medium.jpg`}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between flex-wrap">
        <div>
          <h3 className="text-sm text-gray-700 dark:text-slate-300">
            <Link href={"/" + lang + "/seat/" + product.uid}>
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium light:text-gray-900">
          {product.price} {currency}
        </p>
      </div>
    </div>
  );
}
