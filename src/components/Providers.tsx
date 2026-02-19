"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReCaptchaProvider reCaptchaKey="6LdxQugqAAAAACpHTecSnh3cHKU6owV66U-S380d">
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </ReCaptchaProvider>
  );
}