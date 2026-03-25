"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import QuoteCard from "@/components/QuoteCard"
import { getRandomQuote } from "@/services/quoteService"

export default function Home() {
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [stars, setStars] = useState<Array<{size: number, left: string, top: string, duration: string, delay: string, minOpacity: string, maxOpacity: string}>>([])

  const fetchQuote = async () => {
    const data = await getRandomQuote()
    setQuote(data.content)
    setAuthor(data.author)
    setCopied(false)
    setSaved(false)
  }

  const copyQuote = () => {
    const text = `"${quote}" — ${author}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const saveQuote = () => {
    const savedList = JSON.parse(localStorage.getItem("quotes") || "[]")
    savedList.push({ quote, author })
    localStorage.setItem("quotes", JSON.stringify(savedList))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  useEffect(() => {
  fetchQuote()
  setStars(Array.from({ length: 120 }).map(() => {
    const size = Math.random() < 0.85 ? Math.random() * 1.5 + 0.5 : Math.random() * 3 + 1.5
    return {
      size,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 5}s`,
      minOpacity: `${Math.random() * 0.2 + 0.05}`,
      maxOpacity: `${Math.random() * 0.5 + 0.4}`,
    }
  }))
}, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Marcellus&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #020510;
          font-family: 'Cormorant Garamond', serif;
          overflow-x: hidden;
        }

        .cosmos-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(26, 10, 60, 0.9) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 90%, rgba(5, 20, 60, 0.8) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(15, 5, 40, 0.6) 0%, transparent 70%),
            linear-gradient(135deg, #020510 0%, #060818 40%, #030612 70%, #020510 100%);
        }

        .nebula-1 {
          position: fixed;
          top: -20%;
          left: -10%;
          width: 70vw;
          height: 70vh;
          background: radial-gradient(ellipse, rgba(88, 28, 135, 0.15) 0%, rgba(59, 7, 100, 0.08) 40%, transparent 70%);
          border-radius: 50%;
          filter: blur(60px);
          animation: nebulaDrift 20s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .nebula-2 {
          position: fixed;
          bottom: -10%;
          right: -5%;
          width: 60vw;
          height: 60vh;
          background: radial-gradient(ellipse, rgba(15, 50, 120, 0.18) 0%, rgba(7, 30, 80, 0.1) 40%, transparent 70%);
          border-radius: 50%;
          filter: blur(80px);
          animation: nebulaDrift 25s ease-in-out infinite alternate-reverse;
          pointer-events: none;
        }

        .nebula-3 {
          position: fixed;
          top: 40%;
          left: 30%;
          width: 40vw;
          height: 40vh;
          background: radial-gradient(ellipse, rgba(100, 20, 80, 0.08) 0%, transparent 60%);
          border-radius: 50%;
          filter: blur(100px);
          animation: nebulaDrift 30s ease-in-out infinite alternate;
          pointer-events: none;
        }

        @keyframes nebulaDrift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -20px) scale(1.05); }
        }

        .stars-layer {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: twinkle var(--duration, 3s) ease-in-out infinite alternate;
          animation-delay: var(--delay, 0s);
        }

        @keyframes twinkle {
          0% { opacity: var(--min-opacity, 0.1); transform: scale(1); }
          100% { opacity: var(--max-opacity, 0.8); transform: scale(1.3); }
        }

        .main-content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .site-title {
          font-family: 'Marcellus', serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: transparent;
          background: linear-gradient(135deg, #e8d5ff 0%, #a78bfa 30%, #c4b5fd 60%, #f0e6ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: none;
          position: relative;
          margin-bottom: 0.3rem;
        }

        .site-title::after {
          content: '';
          display: block;
          width: 60%;
          height: 1px;
          margin: 0.8rem auto 0;
          background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.6), transparent);
        }

        .subtitle {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.4em;
          color: rgba(167, 139, 250, 0.5);
          text-transform: uppercase;
          margin-bottom: 2.5rem;
        }

        .nav-link {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(196, 181, 253, 0.6);
          text-decoration: none;
          border: 1px solid rgba(139, 92, 246, 0.2);
          padding: 0.6rem 1.4rem;
          border-radius: 2px;
          margin-bottom: 3rem;
          transition: all 0.3s ease;
          background: rgba(88, 28, 135, 0.05);
          backdrop-filter: blur(10px);
        }

        .nav-link:hover {
          color: rgba(224, 198, 255, 0.95);
          border-color: rgba(139, 92, 246, 0.5);
          background: rgba(88, 28, 135, 0.15);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.15);
        }

        .quote-wrapper {
          width: 100%;
          max-width: 680px;
          margin-bottom: 2.5rem;
        }

        .actions-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.85rem 2.2rem;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(109, 40, 217, 0.8), rgba(79, 20, 160, 0.9));
          color: rgba(237, 220, 255, 0.95);
          box-shadow: 0 0 30px rgba(109, 40, 217, 0.3), inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(109, 40, 217, 1));
          opacity: 0;
          transition: opacity 0.3s;
        }

        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:hover {
          box-shadow: 0 0 50px rgba(139, 92, 246, 0.5), 0 0 100px rgba(109, 40, 217, 0.2);
          transform: translateY(-2px);
        }
        .btn-primary span { position: relative; z-index: 1; }

        .btn-ghost {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.85rem 1.8rem;
          background: transparent;
          border: 1px solid rgba(139, 92, 246, 0.25);
          color: rgba(196, 181, 253, 0.7);
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .btn-ghost:hover {
          border-color: rgba(139, 92, 246, 0.6);
          color: rgba(237, 220, 255, 0.95);
          background: rgba(109, 40, 217, 0.1);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.15);
        }

        .btn-ghost.active {
          border-color: rgba(139, 92, 246, 0.8);
          color: rgba(237, 220, 255, 1);
          background: rgba(109, 40, 217, 0.2);
        }

        .constellation-line {
          position: fixed;
          pointer-events: none;
          opacity: 0.06;
        }
      `}</style>

      {/* Background layers */}
      <div className="cosmos-bg" />
      <div className="nebula-1" />
      <div className="nebula-2" />
      <div className="nebula-3" />

      {/* Stars */}
    <div className="stars-layer">
  {stars.map((star, i) => (
    <div
      key={i}
      className="star"
      style={{
        left: star.left,
        top: star.top,
        width: `${star.size}px`,
        height: `${star.size}px`,
        "--duration": star.duration,
        "--delay": star.delay,
        "--min-opacity": star.minOpacity,
        "--max-opacity": star.maxOpacity,
      } as React.CSSProperties}
    />
  ))}
</div>

      <main className="main-content">
        <h1 className="site-title">QuoteGram</h1>
        <p className="subtitle">Wisdom from the cosmos</p>

        <Link href="/favorites" className="nav-link">
          ✦ View Favorites
        </Link>

        <div className="quote-wrapper">
          <QuoteCard quote={quote} author={author} />
        </div>

        <div className="actions-row">
          <button className="btn-primary" onClick={fetchQuote}>
            <span>✦ New Quote</span>
          </button>
          <button className={`btn-ghost ${copied ? "active" : ""}`} onClick={copyQuote}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button className={`btn-ghost ${saved ? "active" : ""}`} onClick={saveQuote}>
            {saved ? "✓ Saved" : "❤ Save"}
          </button>
        </div>
      </main>
    </>
  )
}