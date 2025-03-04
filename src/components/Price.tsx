import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function Price({
  price,
  currencyName,
  currencyCourse,
  type = "primary",
}: {
  price: number;
  type?: "primary" | "secondary";
  currencyName: string;
  currencyCourse: number;
}) {
  const priceRate = (price / currencyCourse).toFixed(0);

  return (
    <div
      className={clsx(
        type === "primary" &&
          `mr-auto w-auto rounded-full bg-red-600 p-2 px-4 text-white relative text-xl z-50`,
        type === "secondary" &&
          `mr-auto w-auto rounded-full bg-green-600 p-2 px-4 text-white relative`
      )}
    >
      <p className="invisible">
        {type === "secondary" && "+ "} {priceRate} {currencyName}
      </p>
      <div className="absolute overflow-hidden h-7 w-96 top-2">
        <motion.div
          key={price} // důležité pro správnou animaci
          initial={{ y: -20, opacity: 0 }} // začátek mimo obrazovku
          animate={{ y: 0, opacity: 1 }} // animace na střed
          exit={{ y: 20, opacity: 0 }} // odjezd dolů
          transition={{ duration: 0.1 }}
          className="w-full absolute top-0"
        >
          <p>
            {type === "secondary" && "+ "} {priceRate} {currencyName}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
