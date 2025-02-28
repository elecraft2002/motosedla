import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";

export default function Input(
  props:  InputHTMLAttributes<HTMLInputElement>
) {
  const { className, ...restProps } = props;
  return (
    <input
      {...restProps}
      className={clsx(
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full  p-2.5 ",
        className
      )}
    />
  );
}
