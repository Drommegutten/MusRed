import React from "react"
import { createPost } from "../../sanity/lib/client"
import type { ForumPost } from "../../interfaces/forumPost"
import {usePosts} from "../../hooks/usePosts"

const FORUM_ACCESS_KEY = "forum_access_granted"
const FORUM_PASSWORD = import.meta.env.VITE_FORUM_PASSWORD ?? "musred123"

function Forum() {
  const [forumPost, setForumPost] = React.useState("")
  const [passwordInput, setPasswordInput] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")
  const [isAuthorized, setIsAuthorized] = React.useState(() =>
    sessionStorage.getItem(FORUM_ACCESS_KEY) === "true"
  )
  const [posts, setPosts] = React.useState<ForumPost[]>()

  const { data } = usePosts(10, isAuthorized);

   React.useEffect(() => {
    if (data && isAuthorized) {
      const allPosts = data.pages.flat();
      setPosts(allPosts);
    }
  }, [data, isAuthorized])

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (passwordInput.toLowerCase() === FORUM_PASSWORD) {
      setIsAuthorized(true)
      sessionStorage.setItem(FORUM_ACCESS_KEY, "true")
      setPasswordError("")
      setPasswordInput("")
      return
    }

    setPasswordError("Feil passord. Prøv igjen.")
  }

  if (!isAuthorized) {
    return (
      <div className="mt-30 flex min-h-screen flex-col items-center px-4">
        <div className="w-full max-w-md rounded-md border p-6 shadow">
          <p> Kem i helvete </p>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              className="w-full rounded-md border p-3"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Passord"
            />
            {passwordError ? <p className="mt-2 text-sm text-red-600">{passwordError}</p> : null}
            <button type="submit" className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white">
              Åpne forum
            </button>
          </form>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!forumPost.trim()) {
      return
    }

    try {
      const result = await createPost({
        text: forumPost,
        createdAt: new Date().toISOString()
      })
      window.location.reload()

      console.log("Created post:", result)
    } catch (err) {
      console.error("Sanity error:", err)
    }

    setForumPost("")
  }

  return (
    <div className="mt-30 ml-20 mr-20 "> 
      <h1 className="mb-4 text-3xl font-bold  text-center">FORUM</h1>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-5"> 
        {posts?.map((post, index: number) => (
          <div key={index} className="rounded-md border p-4 shadow flex flex-col">
            <p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleString()}</p>
            <p className="mt-2 break-words">{post.text}</p>
          </div>
        ))}

      </div>
      <div className="flex h-screen flex-col items-center justify-start px-4">
        <div className="mt-6 w-full max-w-2xl">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full rounded-md p-3 shadow"
              value={forumPost}
              onChange={(e) => setForumPost(e.target.value)}
              rows={10}
              placeholder="Skriv ditt innlegg her..."
            />
            <button type="submit" className="mt-2 rounded bg-blue-500 px-4 py-2 text-white">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Forum