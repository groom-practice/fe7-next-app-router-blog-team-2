"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 블로그 글 목록 조회 / 컴포넌트가 렌더링 된 후 실행됨
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  // 실시간 검색어 필터링
  // memo로 성능 최적화 / 의존성 배열(posts, search)가 변경될 때만 실행
  // + 제목, 내용, 카테고리에 검색어 포함 여부 확인 (카테고리 클릭 시 해당 키워드 자동 검색)
  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    const term = search.trim().toLowerCase();
    return posts.filter(
      (post) =>
        (post.title && post.title.toLowerCase().includes(term)) ||
        (post.content && post.content.toLowerCase().includes(term)) ||
        (post.category && post.category.toLowerCase().includes(term))
    );
  }, [posts, search]);


  // 블로그 글 목록 출력  
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          블로그 글 목록
        </h1>

        {/* 카테고리 필터 : 클릭 시 해당 키워드로 검색창에 자동 입력 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-gray-600 self-center mr-2">
            카테고리:
          </span>
          {["All", "React", "Next.js", "JavaScript"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSearch(cat === "All" ? "" : cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                (cat === "All" && !search) || search === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 검색창 */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 블로그 글 목록 출력 */}
        <ul className="grid gap-6">
          {isLoading ? (
            <li className="text-center py-12 text-gray-500">
              글을 불러오는 중...
            </li>
          ) : filteredPosts.length > 0 ? (
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
            <li className="text-center py-12 text-gray-500">
              검색 결과가 없습니다.
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
