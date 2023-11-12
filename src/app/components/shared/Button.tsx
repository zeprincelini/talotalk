"use client";
import Image from "next/image";
import { ReactElement, ComponentProps } from "react";

type Variants = "primary" | "secondary";

type Props = {
  bold?: boolean;
  width?: string;
  padding?: string;
  loading?: boolean;
  variant?: Variants;
} & ComponentProps<"button">;

const Button = ({
  width = "w-auto",
  variant = "primary",
  children,
  className,
  bold = false,
  loading,
  ...rest
}: Props): ReactElement => {
  const selectVariant = (type: Variants) => {
    const options = {
      primary: "bg-blue-500 text-white",
      secondary: "bg-transparent text-blue-500",
    };

    return options[type];
  };
  return (
    <button
      disabled={loading}
      className={`grid place-items-center rounded-md border-[1px] border-blue-500 py-3 px-5 disabled:opacity-75 disabled:cursor-not-allowed disabled:pointer-events-none ${
        bold ? `font-bold` : `font-normal`
      } ${width} ${selectVariant(variant)} ${className} 
      }`}
      {...rest}
    >
      {loading ? (
        <Image
          src={"assets/svg/loader.svg"}
          width={20}
          height={20}
          alt="loader"
        />
      ) : (
        <p>{children}</p>
      )}
    </button>
  );
};

export default Button;
