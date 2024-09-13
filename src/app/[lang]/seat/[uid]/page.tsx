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
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "SV650S",
    description: "Popis...",
    openGraph: {
      title: "SV650S" ?? undefined,
      images: [{ url: "/CB-1300-5.jpg" ?? "" }],
    },
  };
}
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

  const brand = "Honda",
    model = "CB 1300";

  const replaceWords: Replace[] = [
    { search: "{brand}", replace: brand },
    { search: "{model}", replace: model },
  ];
  // .catch(() => notFound());
  const locales = await getLocales(configuration, client);
  return (
    <Bounded>
      <div className="flex flex-col lg:grid lg:grid-cols-8 gap-8">
        <div className="col-span-5">
          <div className="flex flex-col">
            <SliderGallery
              images={[
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
              ]}
            />
          </div>
        </div>
        <Configuration
          shortDescription={configuration.data.short_description}
          price={5199}
          slices={configuration.data.slices}
        />
      </div>
      <div className="mt-8">
        <PrismicRichText field={configuration.data.description} />
      </div>
    </Bounded>
  );
}

export async function generateStaticParams() {
  const pages: Page[] = [{ uid: "sv650" }];

  return pages.map((page) => {
    return { uid: page.uid, lang: "cs" };
  });
}
