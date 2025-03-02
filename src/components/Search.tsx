"use client";
import React, { useEffect, useState } from "react";
import Button, { ButtonType } from "./Button";
import * as motosedla from "@/services/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Search({
  placeholder,
  lang,
}: {
  placeholder: string;
  lang: string;
}) {
  const [search, handleSearch] = useState("");
  const router = useRouter();
  const [results, handleResults] = useState<motosedla.Product[]>([]);
  const [shownSearch, setShownSearchState] = useState(false);
  useEffect(() => {
    if (search) setShownSearchState(true);
    if (search === "") {
      handleResults([]);
      return;
    }
    motosedla.default
      .searchProductsByName(search)
      .then((e) => handleResults(e));
  }, [search]);
  const shortResults = results.slice(0, 5);
  return (
    <>
      {shownSearch && (
        <div
          onClick={() => setShownSearchState(false)}
          className="fixed top-0 left-0 w-screen h-screen"
        ></div>
      )}
      <form
        className="flex items-center max-w-sm mx-auto relative"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/${lang}/search?q=${encodeURIComponent(search)}`);
          handleSearch("");
        }}
      >
        <label htmlFor="simple-search" className="sr-only">
          Hledat
        </label>
        <div className="relative w-full">
          <Input
            value={search}
            type="search"
            id="simple-search"
            placeholder={placeholder}
            // required
            onFocus={() => setShownSearchState(true)}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 "
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>

        <AnimatePresence mode="wait">
          {shownSearch && (
            <ul className="absolute top-12 w-full dark:bg-black/90 backdrop-blur-xl rounded-lg z-50">
              {shortResults.map((result) => {
                return (
                  <motion.li
                    key={result.id}
                    layout // Zajistí animaci pouze pro položky, které zůstanou
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-slate-200/10 transition-all"
                  >
                    <Link
                      href={`./${lang}/seat/${result.uid}`}
                      className="flex items-center gap-2"
                      onClick={() => {
                        setShownSearchState(false);
                        handleSearch("");
                      }}
                    >
                      <Image
                        src={`https://motosedla-7644.rostiapp.cz/image/${result.id_google}_small.jpg`}
                        alt={result.name}
                        width={50}
                        height={50}
                        className="aspect-1 object-cover rounded-sm scale-75"
                      />
                      <span className="text-sm">{result.name}</span>
                    </Link>
                  </motion.li>
                );
              })}
              <Link
                href={`/${lang}/search?q=${encodeURIComponent(search)}`}
                className="flex items-center justify-center my-4"
              >
                <Button type={ButtonType.secondary}>Více</Button>
              </Link>
            </ul>
          )}
        </AnimatePresence>
      </form>
    </>
  );
}
