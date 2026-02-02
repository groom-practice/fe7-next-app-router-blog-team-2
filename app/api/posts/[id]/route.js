// app/api/posts/[id]/route.js
import { getPostById, posts } from "../../../../data/data"

export async function GET(_, { params }) {
  const post = posts.find((p) => p.id === params.id)

  if (!post) {
    return Response.json({ message: "Not found" }, { status: 404 })
  }
  return Response.json(post)
}

export async function PUT(req, { params }) {
  const body = await req.json()
  const post = posts.find((p) => p.id === params.id)

  if (!post) {
    return Response.json({ message: "Not found" }, { status: 404 })
  }

  post.title = body.title ?? post.title
  post.content = body.content ?? post.content

  return Response.json(post)
}

export async function DELETE(_, { params }) {
  const index = posts.findIndex((p) => p.id === params.id)
  if (index === -1) {
    return Response.json({ message: "Not found" }, { status: 404 })
  }

  posts.splice(index, 1)
  return Response.json({ message: "Deleted" })
}
