"use client";
import { ComponentProps, ReactElement } from "react";

type Props = {
  id?: string;
  width?: string;
  name: string;
} & ComponentProps<"textarea">;

const TextBox = ({
  width = "w-full",
  name,
  rows = 5,
  cols = 30,
  id,
  children,
  ...rest
}: Props): ReactElement => {
  return (
    <textarea
      className={`${width} outline-none outline-0 border-[1px] focus:border-gray-600 text-gray-600 border-gray-300 rounded-md py-[10px] px-4`}
      {...{ name }}
      {...(id && { id })}
      {...{ cols }}
      {...{ rows }}
      {...rest}
    >
      {children}
    </textarea>
  );
};

export default TextBox;
