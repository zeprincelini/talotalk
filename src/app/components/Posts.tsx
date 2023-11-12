"use client";
import Image from "next/image";
import TimeAgo from "react-timeago";
import Card from "./shared/Card";

type Props = {
  data: {
    username: string;
    base64str: string;
    post: string;
    created_at: string;
  }[];
};

const Posts = ({ data }: Props) => {
  return (
    <>
      {data.length ? (
        data
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .map((item, i: number) => (
            <Card
              className="shadow-sm col-span-12 md:col-span-4 bg-[#EAF2FE]"
              key={i}
            >
              <div className="grid gap-2">
                {item.base64str && <Image src={item.base64str} alt="post" />}
                <p className="text-gray-400">{item.username}</p>
                <p className="text-gray-600">{item.post}</p>
                <p className="text-gray-300">
                  <TimeAgo date={item.created_at} />
                </p>
              </div>
            </Card>
          ))
      ) : (
        <div className="col-span-12 mx-8">
          <p className="text-blue-400 text-center">No posts added!</p>
        </div>
      )}
    </>
  );
};

export default Posts;
