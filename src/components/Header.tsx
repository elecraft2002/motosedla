// import React from "react";
// import { Bounded } from "./Bounded";
// import { PrismicNextLink } from "@prismicio/next";
// import { PrismicText } from "@prismicio/react";
// import { createClient } from "@/prismicio";
// import { asText } from "@prismicio/client";
// import Search from "./Search";
// import { localeLookup, reverseLocaleLookup } from "@/i18n";

// export default async function Header({ lang }: { lang: string }) {
//   // console.log(lang,)
//   const langReverse = reverseLocaleLookup(lang);
//   const client = createClient();
//   const settings = await client.getSingle("settings", { lang: langReverse });
//   const navigation = await client.getSingle("navigation", {
//     lang: langReverse,
//   });
//   const texts = await client.getSingle("texts", { lang: langReverse });
//   return (
//     <header className="fixed w-full backdrop-blur-2xl py-2 md:py-4 px-4 ba z-50 bg-white/50 dark:bg-black/50">
//       <div className="mx-auto w-full max-w-6xl">
//         <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 leading-none">
//           <PrismicNextLink
//             field={navigation.data.homepage}
//             className="text-xl font-semibold tracking-tight mr-auto"
//           >
//             <PrismicText field={settings.data.siteTitle} />
//           </PrismicNextLink>
//           <div className="flex">
//             <Search
//               lang={localeLookup(lang) || ""}
//               placeholder={texts.data.search_seat_placeholder || ""}
//             />
//           </div>
//           <nav>
//             <ul className="flex flex-wrap gap-6 md:gap-10">
//               {navigation.data?.links.map((item) => (
//                 <li
//                   key={asText(item.label)}
//                   className="font-semibold tracking-tight "
//                 >
//                   <PrismicNextLink lang={lang} field={item.link}>
//                     <PrismicText field={item.label} />
//                   </PrismicNextLink>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
// import React, { useState } from "react";
// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   NavbarMenuToggle,
//   NavbarMenu,
//   NavbarMenuItem,
//   Link,
//   Button,
// } from "@heroui/react";
// import { Bounded } from "./Bounded";
// import { PrismicNextLink } from "@prismicio/next";
// import { PrismicText } from "@prismicio/react";
// import { createClient } from "@/prismicio";
// import { asText } from "@prismicio/client";
// import Search from "./Search";
// import { localeLookup, reverseLocaleLookup } from "@/i18n";

// export const AcmeLogo = () => {
//   return (
//     <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
//       <path
//         clipRule="evenodd"
//         d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
//         fill="currentColor"
//         fillRule="evenodd"
//       />
//     </svg>
//   );
// };

// export default async function Header({ lang }: { lang: string }) {
//   const langReverse = reverseLocaleLookup(lang);
//   const client = createClient();
//   const settings = await client.getSingle("settings", { lang: langReverse });
//   const navigation = await client.getSingle("navigation", {
//     lang: langReverse,
//   });
//   const texts = await client.getSingle("texts", { lang: langReverse });

//   return (
//     <Navbar className="bg-white/50 dark:bg-black/50 fixed">
//       <NavbarContent>
//         <NavbarMenuToggle className="md:hidden" />
//         <NavbarBrand>
//           <PrismicNextLink
//             field={navigation.data.homepage}
//             className="text-xl font-semibold tracking-tight mr-auto"
//           >
//             <PrismicText field={settings.data.siteTitle} />
//           </PrismicNextLink>
//         </NavbarBrand>
//       </NavbarContent>

//       <NavbarContent className="hidden md:flex gap-4" justify="center">
//         {navigation.data?.links.map((item) => (
//           <NavbarItem key={asText(item.label)}>
//             <PrismicNextLink lang={lang} field={item.link}>
//               <PrismicText field={item.label} />
//             </PrismicNextLink>
//           </NavbarItem>
//         ))}
//       </NavbarContent>
//       <NavbarContent justify="end">
//         <NavbarItem className="hidden sm:flex">
//           <Search
//             lang={localeLookup(lang) || ""}
//             placeholder={texts.data.search_seat_placeholder || ""}
//           />
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarMenu className="bg-white/50 dark:bg-black/50">
//         {navigation.data?.links.map((item, index) => (
//           <NavbarMenuItem key={`${item}-${index}`}>
//             <PrismicNextLink lang={lang} field={item.link}>
//               <PrismicText field={item.label} />
//             </PrismicNextLink>
//           </NavbarMenuItem>
//         ))}
//         <NavbarMenuItem>
//           <Search
//             lang={localeLookup(lang) || ""}
//             placeholder={texts.data.search_seat_placeholder || ""}
//           />
//         </NavbarMenuItem>
//       </NavbarMenu>
//     </Navbar>
//   );
// }

import React from "react";
import { Bounded } from "./Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client";
import Search from "./Search";
import { localeLookup, reverseLocaleLookup } from "@/i18n";
import { headers } from "next/headers";
import clsx from "clsx";
import * as prismic from "@prismicio/client";

export default async function Header({ lang }: { lang: string }) {
  const langReverse = reverseLocaleLookup(lang);
  const client = createClient();
  const settings = await client.getSingle("settings", { lang: langReverse });
  const navigation = await client.getSingle("navigation", {
    lang: langReverse,
  });
  const bottomNavigation = await client.getSingle("footer_navigation", {
    lang: langReverse,
  });
  const texts = await client.getSingle("texts", { lang: langReverse });
  const headersList = await headers();
  const fullUrl = headersList.get("referer") || "";
  const lastSegment = fullUrl.split("/").filter(Boolean).pop() || "";
  return (
    <nav className="w-full bg-black text-white">
      <div className="m-auto max-w-6xl px-4 pb-4">
        <div className="md:block hidden">
          <ul className="flex gap-4 flex-wrap text-sm text-gray-300">
            {bottomNavigation.data.links.map((item, i) => {
              return (
                <li className="hover:underline transition-all">
                  <PrismicNextLink lang={lang} field={item.link}>
                    {item.label}
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="logo">
            <PrismicNextImage field={settings.data.site_logo} />
          </div>
          <div className="info flex flex-col gap-4 justify-between items-center md:items-end">
            <div className="flex flex-wrap gap-4">
              {settings.data.main_contacts.map((item, i) => {
                return (
                  <PrismicNextLink key={i} field={item.link}>
                    <span className="flex gap-2 items-center hover:underline">
                      <PrismicNextImage
                        field={item.contact_image.small}
                        className="h-6 w-6"
                      />
                      {item.link.text}
                    </span>
                  </PrismicNextLink>
                );
              })}
            </div>
            <div className="md:ml-auto">
              <Search
                lang={lang}
                placeholder={texts.data.search_seat_placeholder || ""}
              />
            </div>
          </div>
        </div>
        <div>
          <ul className="flex flex-wrap flex-col md:flex-row  md:gap-10 bg-white/20 p-3 rounded-sm mt-6">
            {navigation.data?.links.map((item) => {
              return (
                <li
                  key={asText(item.label)}
                  className={clsx(
                    "font-semibold tracking-tight hover:text-red-500 transition-all text-center border-b-1 border-black p-2 last:border-none md:border-none",
                    prismic.asText(item.label).toLowerCase() ===
                      lastSegment.toLowerCase() && "text-red-500"
                  )}
                >
                  <PrismicNextLink lang={lang} field={item.link}>
                    <PrismicText field={item.label} />
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
