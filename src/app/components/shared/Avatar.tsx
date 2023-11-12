"use client";
import Image from "next/image";
import { ReactElement } from "react";

type Props = {
  url: string;
  width?: number;
  height?: number;
};

const Avatar = ({ url, width = 40, height = 40 }: Props): ReactElement => {
  return (
    <Image
      src={url}
      {...{ width, height }}
      alt="user profile picture"
      className="rounded-[50%]"
    />
  );
};

export default Avatar;
