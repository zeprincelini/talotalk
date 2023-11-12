import { ReactElement, ReactNode } from "react";
import Logo from "../components/Logo";
import { getAuth } from "../serverActions/index";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
};

const UnauthLayout = ({ children }: Props): ReactElement => {
  if (getAuth()) {
    redirect("/");
  }

  return (
    <div className="grid place-items-center min-h-screen w-full bg-white p-2 relative">
      <div className="absolute top-[20px] left-[20px]">
        <Logo />
      </div>
      {children}
    </div>
  );
};

export default UnauthLayout;
