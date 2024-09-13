import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Price({
  price,
  currencyName,
  currencyCourse,
}: {
  price: number;
  currencyName: string;
  currencyCourse: number;
}) {
  const priceRate = (price / currencyCourse).toFixed(0);

  return (
    <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 px-4 text-sm text-white relative">
      <p className="invisible">
        {priceRate} {currencyName}
      </p>
      <div className="absolute overflow-hidden h-5 w-96 top-2" >
        <AnimatePresence mode="wait">
          <motion.div
            key={price} // důležité pro správnou animaci
            initial={{ y: -20, opacity: 0 }} // začátek mimo obrazovku
            animate={{ y: 0, opacity: 1 }} // animace na střed
            exit={{ y: 20, opacity: 0 }} // odjezd dolů
            transition={{ duration: 0.1 }}
            className="w-full absolute top-0"
          >
            <p>
              {priceRate} {currencyName}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
