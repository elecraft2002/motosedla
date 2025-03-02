"use client";
import React, { ReactNode, useState } from "react";
import arrow from "../../public/svg/right-arrow.svg";
import clsx from "clsx";
import Image from "next/image";

export default function NavContainer({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  return (
    <nav className="bg-white p-4 rounded-md mb-auto">
      <span className="md:hidden"
        onClick={() => {
          setActive((oldActive) => !oldActive);
        }}
      >
        <span
          className={clsx(
            "text-slate-500 w-3 h-3 absolute transition-all mt-1",
            active && "rotate-90",
            !active && "rotate-0"
          )}
        >
          <Image {...arrow} />
        </span>
        <p className="pl-5 font-semibold">Kategorie</p>
      </span>
      <div className={clsx("md:block", !active && "hidden")}>{children}</div>
    </nav>
  );
}
