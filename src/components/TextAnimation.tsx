"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function TextAnimation({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <AnimatePresence mode="wait">
      <div className="font-semibold leading-tight tracking-tight md:leading-tight text-4xl md:text-5xl lg:text-7xl mb-2 mt-12 first:mt-0 last:mb-0 overflow-hidden">
        {words.map((word, i) => {
          return (
            <span key={i} className="relative">
              <span className="invisible mr-4 last:mr-0 ">{word}</span>
              <motion.span
                initial={{ translateY: 100 }}
                animate={{ translateY: 0 }}
                transition={{ duration: 1, delay: 1 + 0.25 * i }}
                className="absolute left-0 top-0"
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </div>
      <motion.div
        key={"line"}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1 + 0.25 * words.length, delay: 1.2 }}
        className="h-1 bg-gray-500 "
      ></motion.div>
    </AnimatePresence>
  );
}
