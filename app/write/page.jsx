"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function WritePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async () => {
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle || !trimmedContent) {
      alert("제목과 내용을 공백 없이 입력해주세요.")
      return
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: trimmedTitle,
        content: trimmedContent,
        category: "React",
      }),
    })

    if (!res.ok) {
      alert("글 작성에 실패했습니다.")
      throw new Error("글 작성에 실패했습니다.")
    }

    router.push("/")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">글 작성</h1>
      <input
        className="border p-5 w-full mb-5 focus:border-blue-500 focus:outline-none"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-5 w-full h-60 mb-5 focus:border-blue-500 focus:outline-none"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        disabled={!title?.trim() || !content?.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={handleSubmit}>
        작성 완료
      </button>
    </div>
  )
}
