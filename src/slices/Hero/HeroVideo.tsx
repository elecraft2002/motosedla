"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Pozadové video se začne stahovat až po načtení stránky, aby nesoutěžilo
 * o šířku pásma s obsahem důležitým pro první vykreslení (LCP). Do té doby je vidět náhledový obrázek.
 */
export default function HeroVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Při úsporném režimu dat video vůbec nenačítáme.
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (reduceMotion || saveData) return;

    // Spustí se při první interakci, nejpozději 4 s po načtení stránky.
    const events = ["pointerdown", "pointermove", "keydown", "scroll", "touchstart"];
    let timer: ReturnType<typeof setTimeout>;
    const start = () => {
      cleanup();
      setReady(true);
    };
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      events.forEach((e) => window.removeEventListener(e, start));
    };
    const onLoad = () => {
      timer = setTimeout(start, 4000);
    };
    events.forEach((e) =>
      window.addEventListener(e, start, { once: true, passive: true })
    );
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return cleanup;
  }, []);

  if (!ready) return null;
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
