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

type Page = {
  uid: string;
};
interface Replace {
  search: string;
  replace: string;
}
type Params = { uid: string; lang: string };
export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  let { lang } = await params;
  lang = reverseLocaleLookup(lang) || "cs-cz";

  const { uid } = await params;
  const configuration = await client.getSingle("configuration", { lang });
  const settings = await client.getSingle("settings", { lang });
  const product = await motosedla.default
    .getProductByUid(uid)
    .catch(() => notFound());

  // const images = await motosedla.default.getImagesByProductId(product.id);
  // console.log(product);
  const locales = await getLocales(configuration, client);
  return (
    <Bounded>
      <div className="flex flex-col lg:grid lg:grid-cols-8 gap-8">
        <div className="col-span-5">
          <div className="flex flex-col relative">
            <Image
              alt={`Sedlo na motorku ${product.name} náhled`}
              height={1000}
              width={1000}
              src={`https://motosedla-7644.rostiapp.cz/image/${product.id_google}_medium.jpg`}
              className="rounded-lg absolute"
            />
            <Image
              alt={`Sedlo na motorku ${product.name}`}
              height={1000}
              width={1000}
              src={product.image_url}
              className="rounded-lg relative"
            />
          </div>
        </div>
        <Configuration
          name={product.name}
          shortDescription={configuration.data.short_description}
          price={product.price}
          slices={configuration.data.slices}
        />
      </div>
      <div className="mt-8">
        <PrismicRichText field={configuration.data.description} />
      </div>
    </Bounded>
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const product = await motosedla.default
    .getProductByUid(uid)
    .catch(() => notFound());
  const title = `Sedlo na motorku ${product.name}`;
  const client = createClient();
  const configuration = await client.getSingle("configuration");
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
