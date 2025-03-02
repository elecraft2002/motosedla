import clsx from "clsx";
import React, { ReactNode } from "react";

export enum ButtonType {
  primary,
  secondary,
}

export default function Button({
  className,
  children,
  onClick,
  selected = false,
  type = ButtonType.primary,
}: {
  className?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  type?: ButtonType;
}) {
  if (type === ButtonType.primary)
    return (
      <button
        className={clsx(
          "w-auto rounded-full bg-red-600 px-4 py-2 text-lg text-white hover:bg-red-800 transition-all",
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>
    );
  if (type === ButtonType.secondary)
    return (
      <button
        className={clsx(
          "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm border-neutral-800 transition duration-300 ease-in-out text-black",
          selected
            ? "cursor-default ring-2 ring-red-600"
            : "ring-1 ring-transparent hover:ring-red-600",
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>
    );
}
