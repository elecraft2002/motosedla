"use client";
import React, { Suspense, useEffect, useState } from "react";
import Price from "./Price";
import Line from "./Line";
import { SliceLike, SliceZone, SliceZoneLike } from "@prismicio/react";
import { components } from "@/slices";
import Button from "./Button";
import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "./PrismicRichText";
import Input from "./Input";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { useReCaptcha } from "next-recaptcha-v3";
import { env } from "process";
import { BeatLoader } from "react-spinners";

export const Form = ({ konfigurace }: { konfigurace: boolean }) => {
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setLoadingState] = useState(false);
  const [sent, setSentState] = useState(false);
  const { executeRecaptcha } = useReCaptcha();
  const params =
    konfigurace && Object.fromEntries(new URLSearchParams(location.search));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage("");
    const token = await executeRecaptcha("form_submit");
    const info = konfigurace
      ? {
          telefon: tel,
          zprava: message,
          konfigurace: params,
        }
      : { telefon: tel, zprava: message };
    setLoadingState(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          data: info,
          token,
          link: location.href,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        setResponseMessage(data.message);
      } else {
        setSentState(true);
        setEmail("");
        setTel("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
    setLoadingState(false);
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="flex flex-col gap-4 relative"
    >
      {isLoading && (
        <div className="loading w-full h-full bg-black/50 absolute left-0 top-0 rounded-2xl flex justify-center items-center">
          <BeatLoader />
        </div>
      )}
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
          placeholder="Vaše zpráva..."
          value={message}
          className="min-h-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full  p-2.5 "
          id="message"
        />
      </span>
      {responseMessage && <p className="text-red-500">{responseMessage}</p>}
      {/* <ReCAPTCHA
        sitekey="6LdxQugqAAAAACpHTecSnh3cHKU6owV66U-S380d"
        onChange={(token) => setMessage(token || "")}
      /> */}
      {!sent ? (
        <Button>Odeslat</Button>
      ) : (
        <p className="text-center">Odesláno!</p>
      )}
    </form>
  );
};

export default function Configuration({
  slices,
  price,
  shortDescription,
  name,
  currencyCourse,
  currencyName,
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
    <AnimatePresence mode="wait">
      <div className="flex flex-col gap-4 col-span-3">
        {/* <LanguageSwitcher locales={locales} /> */}
        <h1 className="mb-2 text-2xl font-semibold">{name}</h1>
        <div className="sticky top-6 mr-auto">
          <Price
            currencyCourse={currencyCourse}
            currencyName={currencyName}
            price={totalPrice}
          />
        </div>
        <Line />
        <ul className="flex flex-col gap-4">
          <Suspense fallback={<p>Loading...</p>}>
            <SliceZone
              context={{ setPriceMap, currencyCourse, currencyName }}
              slices={slices}
              components={components}
            />
          </Suspense>
        </ul>
        <span className="text-sm text-slate-800">
          <PrismicRichText field={shortDescription} />
        </span>
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
            <Form konfigurace />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
