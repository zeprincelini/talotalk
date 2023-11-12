"use client";
import Link from "next/link";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";

import Card from "../../components/shared/Card";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { signIn } from "../../serverActions";
import { toast } from "react-toastify";

const Login: NextPage = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error signing in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card width="w-full md:w-auto" bg="bg-[#EAF1FE]">
      <div className="flex place-items-center mb-8">
        <p className="text-gray-600">Log in</p>
      </div>
      <form className="w-full md:w-[400px] grid gap-12" onSubmit={login}>
        <div className="grid gap-4">
          <Input
            type="email"
            name="username"
            label="Enter Email"
            id="email"
            onChange={onInputChange}
          />
          <Input
            type="password"
            name="password"
            label="Enter Password"
            onChange={onInputChange}
          />
          <Link href={"/register"} className="text-blue-500 text-sm">
            Don&apos;t have an account? Sign Up
          </Link>
        </div>
        <Button
          type="submit"
          {...{ loading }}
          disabled={!data.password.length || !data.username.length}
        >
          Sign In
        </Button>
      </form>
    </Card>
  );
};

export default Login;
