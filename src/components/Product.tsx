import { Product as IProduct } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Product({
  product,
  currency_name,
  currency_course,
  lang,
}: {
  product: IProduct;
  currency_name: string;
  currency_course: number;
  lang: string;
}) {
  return (
    <div className="group relative bg-white p-2 rounded-md">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          width={300}
          height={300}
          loading="lazy"
          // src={product.image_url}
          src={`https://motosedla-7644.rostiapp.cz/image/${product.id_google}_medium.jpg`}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between flex-wrap">
        <div>
          <h3 className="text-sm text-gray-700 ">
            <Link href={"/" + encodeURIComponent(lang) + "/seat/" + encodeURIComponent(product.id_google)}>
              <span aria-hidden="true" className="absolute inset-0"></span>
              Úprava sedla {product.name}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {(product.price / currency_course).toFixed(0)} {currency_name}
        </p>
      </div>
    </div>
  );
}
