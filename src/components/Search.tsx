"use client";
import React, { useEffect, useState } from "react";
import Button, { ButtonType } from "./Button";
import * as motosedla from "@/services/api";
import Image from "next/image";

export default function Search() {
  const [search, handleSearch] = useState("");
  const [results, handleResults] = useState<motosedla.Product[]>([]);
  useEffect(() => {
    if (search === "") {
      handleResults([]);
      return;
    }
    motosedla.default
      .searchProductsByName(search)
      .then((e) => handleResults(e));
    
  }, [search]);
  return (
    <form className="flex items-center max-w-sm mx-auto relative">
      <label htmlFor="simple-search" className="sr-only">
        Hledat
      </label>
      <div className="relative w-full">
        <input
          value={search}
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Najděte Vaše sedlo..."
          required
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      <ul className="absolute -bottom-4 w-full bg-red-500">
        {results.map((result) => {
          console.log(result)
          return (
            <li key={result.id}>
              <Image src={result.image_url} alt={result.name}  width={100} height={100}/>
              {result.name}
            </li>
          );
        })}
      </ul>
    </form>
  );
}
