import { getPosts } from "../serverActions";
import { cookies } from "next/headers";
import Home from "./home";

const Main = async () => {
  const data = await getPosts(String(cookies().get("email")?.value));
  return <Home data={data.data} />;
};

export default Main;
