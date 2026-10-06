import { connection } from "next/server";

const messages: Record<string, string> = {
  cs: "7. – 14. 10. DOVOLENÁ",
  en: "7 – 14 October VACATION",
};

// První okamžik po konci dovolené (15. 10. 2026 00:00 SELČ), od kdy se banner skryje.
const HIDE_FROM = new Date("2026-10-15T00:00:00+02:00");

export default async function VacationBanner({ lang }: { lang: string }) {
  // Vynutí vykreslení při každém požadavku, takže datum se vyhodnotí vždy aktuálně
  // a banner se po termínu sám přestane zobrazovat (bez posunu layoutu po hydrataci).
  await connection();
  if (new Date() >= HIDE_FROM) return null;

  return (
    <div
      role="alert"
      className="w-full bg-red-600 text-white text-center font-bold uppercase tracking-wide text-lg md:text-2xl py-3 px-4"
    >
      {messages[lang] ?? messages.cs}
    </div>
  );
}
