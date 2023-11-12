"use client";
import Link from "next/link";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";

import Logo from "./Logo";
import Search from "./Search";
import Avatar from "./shared/Avatar";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";

const Header = (): ReactElement => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  useEffect(() => {
    const data = getCookie("username");
    setName(String(data));
  }, []);

  const logout = () => {
    deleteCookie("email");
    deleteCookie("username");
    router.push("/login");
  };
  return (
    <div className="bg-white px-3 grid grid-cols-12 gap-4 sticky z-[99] top-0 py-3 border-b-[1px] border-gray-400 border-opacity-20 items-center">
      <div className="col-span-2">
        <Logo />
      </div>
      <div className="col-span-7">
        <div className="flex items-center gap-6">
          <Link href={"/"}>
            <Image
              src={"/assets/svg/home.svg"}
              alt="home icon"
              width={30}
              height={30}
            />
          </Link>
          <div className="hidden md:block w-full">
            <Search />
          </div>
        </div>
      </div>
      <div className="col-span-3 flex justify-around items-center">
        <div className="flex gap-2 items-center">
          <div className="cursor-pointer">
            <Avatar url="https://i.pravatar.cc/300" />
          </div>
          <p className="text-gray-600 capitalize">{name}</p>
        </div>
        <Image
          src={"/assets/svg/logout.svg"}
          alt="log out icon"
          width={40}
          height={40}
          className="cursor-pointer"
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default Header;
