"use client";
import React, { useEffect, useState } from "react";
import Price from "./Price";
import Line from "./Line";
import { SliceLike, SliceZone, SliceZoneLike } from "@prismicio/react";
import { components } from "@/slices";
import Button from "./Button";
import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "./PrismicRichText";
import Input from "./Input";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

const Form = () => {
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setLoadingState] = useState(false);
  const params = Object.fromEntries(new URLSearchParams(location.search));
  // console.log(params);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState(true);
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        data: { tel, message, konfigurace: params },
      }),
    });

    const data = await response.json();
    setResponseMessage(data.message);
    setLoadingState(false);
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="flex flex-col gap-4"
    >
      <span>
        <label htmlFor="email">Email</label>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          id="email"
          required
          type="email"
          placeholder="jan.novak@gmail.com"
        />
      </span>
      <span>
        <label htmlFor="tel">Telefon</label>

        <Input
          onChange={(e) => {
            setTel(e.target.value);
          }}
          value={tel}
          required
          id="tel"
          type="tel"
          placeholder="+420 123 456 789"
        />
      </span>
      <span>
        <label htmlFor="message">Vaše zpráva</label>
        <textarea
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          className="min-h-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="message"
        />
      </span>
      <Button>Odeslat</Button>
    </form>
  );
};

export default function Configuration({
  slices,
  price,
  shortDescription,
  name,
  currencyCourse,currencyName
}: {
  slices: SliceZoneLike<SliceLike<string>> | undefined;
  price: number;
  shortDescription?: RichTextField;
  name: string;
  currencyCourse: number;
  currencyName: string;
}) {
  const [priceMap, setPriceMap] = useState(new Map<string, number>());
  const [isInterested, setIsInterested] = useState(false);
  const [totalPrice, setTotalPrice] = useState(
    parseFloat(price as any as string)
  );
  useEffect(() => {
    let newPrice = parseFloat(price as any as string);
    priceMap.forEach((price) => (newPrice += price));
    setTotalPrice(newPrice);
  }, [priceMap, price]);
  return (
    <div className="flex flex-col gap-4 col-span-3">
      {/* <LanguageSwitcher locales={locales} /> */}
      <h1 className="mb-2 text-5xl font-medium">Sedlo na motorku {name}</h1>
      <Price currencyCourse={currencyCourse} currencyName={currencyName} price={totalPrice} />
      <Line />
      <ul className="flex flex-col gap-4">
        <SliceZone
          context={setPriceMap}
          slices={slices}
          components={components}
        />
      </ul>
      <span className="text-sm dark:text-slate-200 text-slate-800">
        <PrismicRichText field={shortDescription} />
      </span>
      <AnimatePresence mode="wait">
        {!isInterested && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col"
            key={"Interest"}
          >
            <Button
              onClick={() => {
                setIsInterested(true);
              }}
              className="mt-4"
            >
              Mám zájem
            </Button>
          </motion.div>
        )}
        {isInterested && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.25 }}
          >
            <Form />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
