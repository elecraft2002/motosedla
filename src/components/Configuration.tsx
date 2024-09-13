"use client";
import React, { useEffect, useState } from "react";
import Price from "./Price";
import Line from "./Line";
import { SliceLike, SliceZone, SliceZoneLike } from "@prismicio/react";
import { components } from "@/slices";
import Button from "./Button";
import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "./PrismicRichText";

export default function Configuration({
  slices,
  price,
  shortDescription,
}: {
  slices: SliceZoneLike<SliceLike<string>> | undefined;
  price: number;
  shortDescription?: RichTextField;
}) {
  const [priceMap, setPriceMap] = useState(new Map<string, number>());
  const [totalPrice, setTotalPrice] = useState(price);
  useEffect(() => {
    console.log(priceMap);
    let newPrice = price;
    priceMap.forEach((price) => (newPrice += price));
    setTotalPrice(newPrice);
  }, [priceMap]);
  return (
    <div className="flex flex-col gap-4 col-span-3">
      {/* <LanguageSwitcher locales={locales} /> */}
      <h1 className="mb-2 text-5xl font-medium">Sedlo na motorku CB 1300</h1>
      <Price currencyCourse={1} currencyName="CZK" price={totalPrice} />
      <Line />
      <ul className="flex flex-col gap-4">
        <SliceZone
          context={setPriceMap}
          slices={slices}
          components={components}
        />
      </ul>
      <span className="text-sm dark:text-slate-200 text-slate-800">
        <PrismicRichText field={shortDescription} />
      </span>
      <Button className="mt-4">Mám zájem</Button>
    </div>
  );
}
