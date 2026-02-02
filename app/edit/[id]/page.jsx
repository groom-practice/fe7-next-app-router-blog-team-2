"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditPage() {
  const router = useRouter()
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title)
        setContent(data.content)
      })
  }, [id])

  const handleUpdate = async () => {
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle || !trimmedContent) {
      alert("제목과 내용을 공백 없이 입력해주세요.")
      return
    }

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmedTitle, content: trimmedContent }),
    })

    if (!res.ok) {
      alert("글 수정에 실패했습니다.")
      throw new Error("수정에 실패했습니다.")
    }

    router.push(`/posts/${id}`)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-5">글 수정</h1>
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
        onClick={handleUpdate}>
        수정 완료
      </button>
    </div>
  )
}
