import { ReactElement, ReactNode } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { redirect } from "next/navigation";
import { getAuth } from "../serverActions/index";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props): ReactElement => {
  if (!getAuth()) {
    redirect("/login");
  }

  return (
    <div className="w-full min-h-screen bg-[#ffffff]">
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 md:px-0">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
