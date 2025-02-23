import "../globals.css";

import { /* Inter, */ Montserrat } from "next/font/google";
import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { reverseLocaleLookup } from "@/i18n";

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

  return (
    <html lang={lang.split("-")[0]} className={montserrat.variable}>
      <body className="overflow-x-hidden antialiased bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <main className="background flex flex-col">
          <Header lang={lang} />
          {children}
          <Footer lang={lang} />
        </main>
        <PrismicPreview repositoryName={repositoryName} />
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
