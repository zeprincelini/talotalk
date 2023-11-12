"use client";
import { ReactElement } from "react";

import Logo from "./Logo";

const Footer = (): ReactElement => {
  const today = new Date().getFullYear();
  return (
    <div className="flex justify-center gap-2 items-center sticky top-full bottom-0 mt-8">
      <Logo />
      <p className="text-gray-400">&copy;</p>
      <p className="text-gray-400">{today}</p>
      <p className="text-gray-400">All rights reserved.</p>
    </div>
  );
};

export default Footer;
