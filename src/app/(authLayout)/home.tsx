"use client";
import Image from "next/image";
import Button from "../components/shared/Button";
import TextBox from "../components/shared/TextBox";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { getCookie } from "cookies-next";
import { addPost } from "../serverActions";
import { toBase64 } from "../utils";
import { toast } from "react-toastify";
import Posts from "../components/Posts";

type Props = {
  data: {
    username: string;
    base64str: string;
    post: string;
    created_at: string;
  }[];
};

const Home = ({ data }: Props) => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<string>("");
  const [base64, setBase64] = useState<string>("");

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const img = files && files[0];
    const str = await toBase64(img as File);
    setBase64(str as string);
  };

  const reset = () => {
    setPost("");
    setBase64("");
  };

  const trigger = (e: any) => {
    e.preventDefault();
    imgRef.current?.click();
  };
  const submit = async (e: FormEvent) => {
    setLoading(true);
    const username = getCookie("email");
    e.preventDefault();
    try {
      await addPost({
        username: String(username),
        post,
        ...(base64 && { base64str: base64 }),
      });
      toast.success("Post added successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error adding post");
    } finally {
      reset();
      setLoading(false);
    }
  };
  return (
    <div className="grid gap-12 my-4">
      <section className="w-full md:w-1/2 mx-auto grid gap-4">
        <p className="text-gray-400">What&apos;s on your mind?</p>
        <form onSubmit={submit} className="grid gap-4">
          <TextBox
            name="post"
            placeholder="Add Post"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <div className="flex gap-5">
            <Button type="submit" disabled={!post && !base64} {...{ loading }}>
              Post
            </Button>
            <input
              type="file"
              className="hidden"
              ref={imgRef}
              onChange={handleImage}
            />
            <Button
              onClick={trigger}
              style={{ borderRadius: "50%" }}
              disabled={loading}
            >
              <Image
                src={"/assets/svg/file.svg"}
                alt="file attachment icon"
                width={10}
                height={10}
              />
            </Button>
          </div>
        </form>
      </section>

      <section className="grid gap-4 grid-cols-12 px-3 md:px-1">
        <Posts {...{ data }} />
      </section>
    </div>
  );
};

export default Home;
