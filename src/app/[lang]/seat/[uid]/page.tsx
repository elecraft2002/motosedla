import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";

import { createClient } from "@/prismicio";
import Image from "next/image";
import { getLocales } from "@/utils/getLocales";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Price from "@/components/Price";
import Line from "@/components/Line";
import { Bounded } from "@/components/Bounded";
import Configuration from "@/components/Configuration";
import { PrismicRichText } from "@/components/PrismicRichText";
import SliderGallery from "@/components/SliderGallery";
import * as motosedla from "@/services/api";
import { reverseLocaleLookup } from "@/i18n";
import * as prismic from "@prismicio/client";
import Button from "@/components/Button";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
type Page = {
  uid: string;
};
interface Replace {
  search: string;
  replace: string;
}
type Params = { uid: string; lang: any };
export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  let { lang } = await params;
  lang = reverseLocaleLookup(lang);

  const { uid } = await params;
  const configuration = await client.getSingle("configuration", { lang });
  const settings = await client.getSingle("settings", { lang });
  const product = await motosedla.default
    .getProductByUid(uid)
    .catch(() => notFound());

  // const images = await motosedla.default.getImagesByProductId(product.id);
  // console.log(product);
  // const locales = await getLocales(configuration, client);
  return (
    <Bounded>
      <div className="flex flex-col lg:grid lg:grid-cols-8 gap-8">
        <div className="col-span-5">
          <div className="flex flex-col relative">
           {/*  <Image
              alt={`ÚPRAVA SEDLA -${product.name} náhled`}
              height={1000}
              width={1000}
              src={`https://motosedla-7644.rostiapp.cz/image/${product.id_google}_medium.webp`}
              className="rounded-lg absolute"
              unoptimized
            /> */}
            <Image
              alt={`ÚPRAVA SEDLA -${product.name}`}
              height={1000}
              width={1000}
              src={`https://motosedla-7644.rostiapp.cz/image/${product.id_google}_big.webp`}
              className="rounded-lg relative"
              unoptimized
            />
          </div>
        </div>
        <div className="mt-8 col-span-3">
          <h1 className="mb-2 text-2xl font-semibold">
            {"ÚPRAVA SEDLA -" + product.name}
          </h1>
          <PrismicRichText field={configuration.data.description} />
          {/* <AnimatePresence>
            <Price
              currencyCourse={settings.data.currency_course || 1}
              currencyName={settings.data.currency_name || ""}
              price={product.price}
            />
          </AnimatePresence> */}
          <Link href={"#configuration"} className="text-center">
            <Button>Konfigurovat</Button>
          </Link>
        </div>
      </div>
      <div id="configuration">
        <Configuration
          name={"Konfigurace"}
          shortDescription={configuration.data.short_description}
          price={product.price}
          slices={configuration.data.slices}
          currencyCourse={settings.data.currency_course || 1}
          currencyName={settings.data.currency_name || ""}
        />
      </div>
    </Bounded>
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid, lang } = await params;
  const product = await motosedla.default
    .getProductByUid(uid)
    .catch(() => notFound());
  const title = `ÚPRAVA SEDLA - ${product.name}`;
  const client = createClient();
  const configuration = await client.getSingle("configuration", {
    lang: reverseLocaleLookup(lang),
  });
  return {
    title: title,
    description: configuration.data.meta_description,
    openGraph: {
      title: title,
      images: [{ url: product.image_url ?? "" }],
      description: configuration.data.meta_description ?? "",
    },
  };
}
export async function generateStaticParams() {
  const products = await motosedla.default.getAllProducts();
  // console.log(products);
  const client = createClient();

  const repository = await client.getRepository();
  const languages = repository.languages.map((lang) => {
    return { lang: lang.id };
  });

  return languages
    .map((lang) => {
      return products.map((product) => {
        return { uid: product.uid, lang: lang.lang };
      });
    })
    .flat();
}
