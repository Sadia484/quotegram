"use client"

import { useEffect, useState } from "react"

interface Quote {
  quote: string
  author: string
}

export default function FavoritesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quotes") || "[]")
    setQuotes(saved)
  }, [])

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-purple-900 to-pink-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Your Saved Quotes ❤️</h1>
      {quotes.length === 0 ? (
        <p>No saved quotes yet!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((q, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
            >
              <p className="italic text-lg">"{q.quote}"</p>
              <p className="mt-2 text-sm opacity-70">— {q.author}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}