"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  // 블로그 글 목록 조회
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  // 검색어 필터링
  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    const term = search.trim().toLowerCase();
    return posts.filter(
      (post) =>
        (post.title && post.title.toLowerCase().includes(term)) ||
        (post.content && post.content.toLowerCase().includes(term)) ||
        (post.category && post.category.toLowerCase().includes(term)) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(term))
    );
  }, [posts, search]);

  // 블로그 글 목록 출력  
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          블로그 글 목록
        </h1>
        {/* 검색창 */}
        <div className="flex gap-2 mb-6 ">
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            className="flex-1 p-2 border border-gray-300 rounded-md color-black text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setSearch(e.target.value);
            }}
          />

          {/* 검색 버튼 */}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            aria-label="검색"
            onClick={() => setSearch(search.trim())}
          >
            검색
          </button>
        </div>

        {/* 블로그 글 목록 출력 */}
        <ul className="grid gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <li
                key={post.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"
              >
                <Link href={`/posts/${post.id}`} className="block group">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-500 mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="inline-block mt-4 text-sm text-blue-500 font-medium group-hover:underline">
                    자세히 보기 →
                  </span>
                </Link>
              </li>
            ))
          ) : (
            // 검색 결과가 없을 때
            <li className="text-center py-12 text-gray-500">
              {posts.length === 0 ? "글을 불러오는 중..." : "검색 결과가 없습니다."}
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
