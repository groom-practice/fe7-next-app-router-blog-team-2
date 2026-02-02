"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState();

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((res) => {
        if (res.status === 404) router.push("/not-found");
        return res.json();
      })
      .then(setPost);
  }, [router, params.id]);

  if (!post) return <p>로딩 중입니다...</p>;

  const handleDelete = () => {
    fetch(`/api/posts/${params.id}`, {
      method: "DELETE",
    });
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
      <div className="flex gap-2">
        <Link className="text-blue-500 underline" href={`/edit/${params.id}`}>
          수정
        </Link>
        <button className="text-red-500 underline" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}
