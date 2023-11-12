"use client";
import Link from "next/link";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";

import Card from "../../components/shared/Card";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { signUp } from "../../serverActions";
import { toast } from "react-toastify";

const Register: NextPage = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const register = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error signing up");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card width="w-full md:w-auto" bg="bg-[#EAF1FE]">
      <div className="flex place-items-center mb-8">
        <p className="text-gray-600">Create an Account</p>
      </div>
      <form className="w-full md:w-[400px] grid gap-12" onSubmit={register}>
        <div className="grid gap-4">
          <Input
            type="email"
            name="username"
            label="Enter Email"
            id="email"
            onChange={onInputChange}
          />
          <Input
            type="text"
            name="password"
            label="Enter Password"
            onChange={onInputChange}
          />
          <Link href={"/login"} className="text-blue-500 text-sm">
            Already have an account? Sign in
          </Link>
        </div>
        <Button
          type="submit"
          {...{ loading }}
          disabled={!data.password.length || !data.username.length}
        >
          Sign Up
        </Button>
      </form>
    </Card>
  );
};

export default Register;
