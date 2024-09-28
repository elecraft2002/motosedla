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

type Page = {
  uid: string;
};
interface Replace {
  search: string;
  replace: string;
}
type Params = { uid: string };
export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const configuration = await client.getSingle("configuration");
  const settings = await client.getSingle("settings");
  const product = await motosedla.default
    .getProductByUid(params.uid)
    .catch(() => notFound());
  const images = await motosedla.default.getImagesByProductId(product.id);

  /* const brand = "Honda",
    model = "CB 1300";

  const replaceWords: Replace[] = [
    { search: "{brand}", replace: brand },
    { search: "{model}", replace: model },
  ]; */
  // .catch(() => notFound());
  const locales = await getLocales(configuration, client);
  return (
    <Bounded>
      <div className="flex flex-col lg:grid lg:grid-cols-8 gap-8">
        <div className="col-span-5">
          <div className="flex flex-col">
            <SliderGallery
              /* images={[
                {
                  alt: "sedlo",
                  height: 2300,
                  width: 2300,
                  src: "/images/CB-1300-5.jpg",
                },
                {
                  alt: "simson",
                  height: 3000,
                  width: 4000,
                  src: "/images/IMG_20220903_194512.jpg",
                },
              ]} */
              images={images.map((image, index) => {
                return {
                  alt: `Sedlo na motorku ${product.name} - ${index + 1}`,
                  height: 2300,
                  width: 2300,
                  src: image.image_url,
                };
              })}
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
  params: Params;
}): Promise<Metadata> {
  const product = await motosedla.default
    .getProductByUid(params.uid)
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
  return products.map((product) => {
    return { uid: product.uid, lang: "cs" };
  });
}
