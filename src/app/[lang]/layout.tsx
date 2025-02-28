import "../globals.css";
import { HeroUIProvider } from "@heroui/react";
import { /* Inter, */ Montserrat } from "next/font/google";
import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { reverseLocaleLookup } from "@/i18n";
import * as prismic from "@prismicio/client";
/* const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
}); */

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<any> }>) {
  const { lang } = await params;
  const client = createClient();
  const langReverse = reverseLocaleLookup(lang);

  const settings = await client.getSingle("settings", { lang: langReverse });

  return (
    <html lang={lang.split("-")[0]} className={montserrat.variable}>
      <link
        rel="icon"
        href={prismic.asImageSrc(settings.data.favicon) || ""}
        sizes="any"
      />
      <body className="overflow-x-hidden antialiased bg-neutral-50 text-black selection:bg-red-300 ">
        <HeroUIProvider>
          <main className="background flex flex-col min-h-screen">
            <Header lang={lang} />
            {children}
            <Footer lang={lang} />
          </main>
          <PrismicPreview repositoryName={repositoryName} />
        </HeroUIProvider>
      </body>
    </html>
  );
}
export async function generateStaticParams() {
  const client = createClient();

  const repository = await client.getRepository();
  return repository.languages.map((lang) => {
    return { lang: lang.id };
  });
  // return [locales];
}
