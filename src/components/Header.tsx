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
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import { Bounded } from "./Bounded";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client";
import Search from "./Search";
import { localeLookup, reverseLocaleLookup } from "@/i18n";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default async function App({ lang }: { lang: string }) {
  const langReverse = reverseLocaleLookup(lang);
  const client = createClient();
  const settings = await client.getSingle("settings", { lang: langReverse });
  const navigation = await client.getSingle("navigation", {
    lang: langReverse,
  });
  const texts = await client.getSingle("texts", { lang: langReverse });

  return (
    <Navbar className="bg-white/50 dark:bg-black/50 fixed">
      <NavbarContent>
        <NavbarMenuToggle className="md:hidden" />
        <NavbarBrand>
          <PrismicNextLink
            field={navigation.data.homepage}
            className="text-xl font-semibold tracking-tight mr-auto"
          >
            <PrismicText field={settings.data.siteTitle} />
          </PrismicNextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {navigation.data?.links.map((item) => (
          <NavbarItem key={asText(item.label)}>
            <PrismicNextLink lang={lang} field={item.link}>
              <PrismicText field={item.label} />
            </PrismicNextLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Search
            lang={localeLookup(lang) || ""}
            placeholder={texts.data.search_seat_placeholder || ""}
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-white/50 dark:bg-black/50">
        {navigation.data?.links.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <PrismicNextLink lang={lang} field={item.link}>
              <PrismicText field={item.label} />
            </PrismicNextLink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Search
            lang={localeLookup(lang) || ""}
            placeholder={texts.data.search_seat_placeholder || ""}
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
