"use client";
import { useSearchParams } from "next/navigation";
import * as motosedla from "@/services/api";
import React, { useEffect, useState } from "react";
import Products from "./Products";
import Input from "./Input";
import { useRouter } from "next/navigation";

export default function SearchProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("q");
  const [products, setProducts] = useState<motosedla.Product[] | null>(null);
  useEffect(() => {
    if (urlSearch)
      motosedla.default.searchProductsByName(urlSearch).then((products) => {
        setProducts(products);
      });
  }, []);
  const [search, setSearch] = useState(urlSearch);
  useEffect(() => {
    if (search)
      motosedla.default.searchProductsByName(search).then((products) => {
        setProducts(products);
      });
    window.history.pushState(
      [0],
      "",
      `/search?q=${encodeURIComponent(search ?? "")}`
    );
  }, [search]);
  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-wrap gap-4 w-full justify-center items-center">
        <h2>Vyhledávání</h2>
        <label htmlFor="simple-search" className="sr-only">
          Vyhledávání
        </label>
        <Input
          placeholder="Najděte vaše sedlo"
          value={search ?? ""}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="max-w-96"
        />
      </form>
      {products && <Products products={products} />}
    </div>
  );
}
