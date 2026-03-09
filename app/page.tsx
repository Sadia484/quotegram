"use client"
import Link from "next/link"

import { useEffect, useState } from "react"
import QuoteCard from "@/components/QuoteCard"
import { getRandomQuote } from "@/services/quoteService"

export default function Home() {

  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")

  const fetchQuote = async () => {
    const data = await getRandomQuote()

    setQuote(data.content)
    setAuthor(data.author)
  }

  const copyQuote = () => {
  const text = `"${quote}" — ${author}`
  navigator.clipboard.writeText(text)
}

const saveQuote = () => {
  const saved = JSON.parse(localStorage.getItem("quotes") || "[]")

  saved.push({ quote, author })

  localStorage.setItem("quotes", JSON.stringify(saved))
}

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">

      <h1 className="text-5xl font-bold mb-10">
        QuoteGram
      </h1>

       {/* Link to Favorites */}
  <Link
    href="/favorites"
    className="mb-6 px-4 py-2 bg-white text-black rounded-full font-semibold hover:scale-105 transition"
  >
    View Favorites ❤️
  </Link>


      <QuoteCard quote={quote} author={author} />

      <button
        onClick={fetchQuote}
        className="mt-8 bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
      >
        New Quote
      </button>

      <button
  onClick={copyQuote}
  className="mt-4 px-4 py-2 bg-white text-black rounded-lg"
>
Copy Quote
</button>

<button
  onClick={saveQuote}
  className="mt-2 px-4 py-2 bg-pink-500 rounded-lg"
>
❤️ Save
</button>

    </main>
  )
}