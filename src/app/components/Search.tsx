"use client";
import { ChangeEvent, FormEvent, ReactElement } from "react";

import Image from "next/image";
import Input from "./shared/Input";
import Button from "./shared/Button";

type Props = {
  width?: string;
  height?: string;
  onSearch?: (e: FormEvent) => void;
  onChange?: (v: ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({
  onChange,
  onSearch,
  width = "100%",
  height = "100%",
}: Props): ReactElement => {
  return (
    <form className="w-full flex items-center gap-0.5" onSubmit={onSearch}>
      <Input
        {...{ width, height, onChange }}
        placeholder="Search for users, posts..."
        iconRight={
          <Button onClick={onSearch} style={{ padding: "10px" }} type="submit">
            <Image
              src={"/assets/svg/search.svg"}
              alt="search icon"
              width={20}
              height={20}
            />
          </Button>
        }
        iconRightPosition="-right-[10px]"
      />
    </form>
  );
};

export default Search;
