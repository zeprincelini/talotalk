"use client";
import { ReactElement, ComponentProps } from "react";

type Props = {
  bg?: string;
  width?: string;
  height?: string;
  padding?: string;
} & ComponentProps<"div">;

const Card = ({
  bg = "bg-[#ffffff]",
  width = "w-auto",
  height = "h-auto",
  padding = "p-8",
  children,
  className,
  ...rest
}: Props): ReactElement => {
  return (
    <div
      className={`grid place-items-center rounded-md ${bg} ${padding} ${width} ${height} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
