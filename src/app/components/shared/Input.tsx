"use client";
import { ReactElement, ComponentProps, ReactNode } from "react";

type Props = {
  label?: string;
  width?: string;
  height?: string;
  iconLeft?: ReactNode;
  labelColour?: string;
  iconRight?: ReactNode;
  iconLeftPosition?: string;
  iconRightPosition?: string;
} & ComponentProps<"input">;

const Input = ({
  id,
  label,
  iconLeft,
  iconRight,
  type = "text",
  width = "100%",
  height = "auto",
  labelColour = "gray",
  iconLeftPosition = "left-2",
  iconRightPosition = "right-2",
  ...rest
}: Props): ReactElement => {
  return (
    <div className="relative" style={{ width, height }}>
      {label && (
        <label
          htmlFor={id}
          className={`text-[12px]`}
          style={{ color: labelColour }}
        >
          {label}
        </label>
      )}
      {iconLeft && (
        <div
          className={`absolute ${iconLeftPosition} top-1/2 -translate-y-1/2`}
        >
          {iconLeft}
        </div>
      )}
      <input
        {...rest}
        {...{ id }}
        {...{ type }}
        className="outline-0 border-[1px] border-gray-300 rounded-md py-[10px] px-4 focus:border-blue-500 text-gray-700 w-full max-h-full"
      />
      {iconRight && (
        <div
          className={`absolute ${iconRightPosition} top-1/2 -translate-y-1/2`}
        >
          {iconRight}
        </div>
      )}
    </div>
  );
};

export default Input;
