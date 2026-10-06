"use client";
import { useEffect, useState } from "react";

const messages: Record<string, string> = {
  cs: "7. – 14. 10. DOVOLENÁ",
  en: "7 – 14 October VACATION",
};

// První okamžik po konci dovolené (15. 10. 2026 00:00 SELČ), od kdy se banner skryje.
const HIDE_FROM = new Date("2026-10-15T00:00:00+02:00");

export default function VacationBanner({ lang }: { lang: string }) {
  // Datum se kontroluje v prohlížeči, aby statické stránky nezůstaly po skončení termínu zacachované.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(new Date() < HIDE_FROM);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="w-full bg-red-600 text-white text-center font-bold uppercase tracking-wide text-lg md:text-2xl py-3 px-4"
    >
      {messages[lang] ?? messages.cs}
    </div>
  );
}
