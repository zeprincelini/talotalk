"use server";
import { cookies } from "next/headers";
import {
  CREATE_POST_API,
  CREATE_POST_IMG_API,
  LOGIN_API,
  REGISTER_API,
} from "./api";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type PostsProp = {
  username: string;
  base64str: string;
  post: string;
  created_at: string;
};

const http = (path: string, data?: unknown, method = "GET", token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  const options: RequestInit = { headers, method };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(path, options);
};

export const signIn = async (payload: {
  username: string;
  password: string;
}): Promise<{ name: string; response: unknown }> => {
  const res = await http(LOGIN_API, payload, "POST").catch((e) => {
    throw new Error(e instanceof Error ? e.message : "Something went wrong!");
  });

  if (!res.ok) {
    throw new Error("Failed to login");
  }

  const name = payload.username.split("@")[0];
  //const response = await res.json();
  cookies().set("username", name);
  cookies().set("email", payload.username);
  redirect("/");
};

export const signUp = async (payload: {
  username: string;
  password: string;
}) => {
  const res = await http(REGISTER_API, payload, "POST").catch((e) => {
    throw new Error(e instanceof Error ? e.message : "Something went wrong!");
  });

  if (!res.ok) {
    throw new Error("Failed to create account");
  }

  redirect("/login");
};

export const addPost = async (payload: {
  username: string;
  base64str?: string;
  post: string;
}) => {
  const res = await http(
    payload.base64str ? CREATE_POST_IMG_API : CREATE_POST_API,
    payload,
    "POST"
  ).catch((e) => {
    console.log(e);
    throw new Error(e instanceof Error ? e.message : "Something went wrong!");
  });

  if (!res.ok) {
    throw new Error("Failed to add post");
  }
  revalidatePath("/");
};

export const getPosts = async (
  email: string
): Promise<{ data: PostsProp[] }> => {
  const res = await http(`${CREATE_POST_API}/${email}`).catch((e) => {
    throw e || e.message || "Something went wrong!";
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getAuth = () => {
  const name = cookies().get("username")?.value;
  const email = cookies().get("email")?.value;
  console.log(name, email);
  if (!name || !email) {
    return false;
  } else {
    return true;
  }
};
