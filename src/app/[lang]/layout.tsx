import "../globals.css";
import { Montserrat } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { draftMode } from "next/headers";
import { createClient, repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VacationBanner from "@/components/VacationBanner";
import { reverseLocaleLookup } from "@/i18n";
import * as prismic from "@prismicio/client";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
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
  const { isEnabled: isPreview } = await draftMode();

  return (
    <html lang={lang.split("-")[0]} className={montserrat.variable}>
      <head>
        <link
          rel="icon"
          href={prismic.asImageSrc(settings.data.favicon) || ""}
          sizes="any"
        />
        <link rel="preconnect" href="https://images.prismic.io" />
        <link rel="preconnect" href="https://motosedla.cdn.prismic.io" />
      </head>
      <body className="overflow-x-hidden antialiased bg-neutral-50 text-black selection:bg-red-300 ">
        <main className="background flex flex-col min-h-screen">
          <VacationBanner lang={lang} />
          <Header lang={lang} />
          {children}
          <Footer lang={lang} />
        </main>
        {/* Prismic toolbar (třetí strany, cookies) jen v režimu náhledu */}
        {isPreview && <PrismicPreview repositoryName={repositoryName} />}
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
}
