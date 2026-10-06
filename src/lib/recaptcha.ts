const SITE_KEY = "6LdxQugqAAAAACpHTecSnh3cHKU6owV66U-S380d";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (key: string, options: { action: string }) => Promise<string>;
};

let loading: Promise<void> | null = null;

/** Načte reCAPTCHA skript až ve chvíli, kdy je potřeba (formulář), ne na každé stránce. */
export function loadRecaptcha(): Promise<void> {
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        loading = null;
        reject(new Error("reCAPTCHA se nepodařilo načíst"));
      };
      document.head.appendChild(script);
    });
  }
  return loading;
}

export async function executeRecaptcha(action: string): Promise<string> {
  await loadRecaptcha();
  const grecaptcha = (window as unknown as { grecaptcha: Grecaptcha })
    .grecaptcha;
  await new Promise<void>((resolve) => grecaptcha.ready(resolve));
  return grecaptcha.execute(SITE_KEY, { action });
}
