"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface Quote {
  quote: string
  author: string
}

export default function FavoritesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [stars, setStars] = useState<Array<{size: number, left: string, top: string, duration: string, delay: string, minOpacity: string, maxOpacity: string}>>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quotes") || "[]")
    setQuotes(saved)
    setStars(Array.from({ length: 130 }).map(() => {
      const size = Math.random() < 0.7 ? Math.random() * 1 + 0.3 : Math.random() * 2 + 1
      return {
        size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${Math.random() * 6 + 4}s`,
        delay: `${Math.random() * 8}s`,
        minOpacity: `${Math.random() * 0.3 + 0.4}`,
        maxOpacity: `${Math.random() * 0.3 + 0.7}`,
      }
    }))
  }, [])

  const removeQuote = (idx: number) => {
    const updated = quotes.filter((_, i) => i !== idx)
    setQuotes(updated)
    localStorage.setItem("quotes", JSON.stringify(updated))
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Marcellus&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #06090f;
          font-family: 'Cormorant Garamond', serif;
          overflow-x: hidden;
        }

        /* Deep cold base */
        .abyss-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            linear-gradient(160deg, #06090f 0%, #080d18 35%, #06090f 65%, #070b15 100%);
        }

        /* Large faint ice sheet — covers most of bg subtly */
        .ice-sheet {
          position: fixed;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(ellipse 120% 80% at 50% 50%,
              rgba(180, 210, 240, 0.025) 0%,
              rgba(140, 180, 220, 0.015) 40%,
              transparent 75%
            );
          pointer-events: none;
        }

        /* Top frost bloom */
        .frost-top {
          position: fixed;
          top: -15%;
          left: 50%;
          transform: translateX(-50%);
          width: 90vw;
          height: 55vh;
          background: radial-gradient(ellipse,
            rgba(180, 215, 245, 0.07) 0%,
            rgba(140, 190, 230, 0.04) 35%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(50px);
          animation: frostDrift 18s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 1;
        }

        /* Bottom right cold mass */
        .frost-bottom {
          position: fixed;
          bottom: -20%;
          right: -15%;
          width: 65vw;
          height: 65vh;
          background: radial-gradient(ellipse,
            rgba(100, 160, 210, 0.06) 0%,
            rgba(80, 130, 185, 0.03) 40%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(70px);
          animation: frostDrift 24s ease-in-out infinite alternate-reverse;
          pointer-events: none;
          z-index: 1;
        }

        /* Left edge cold streak */
        .frost-left {
          position: fixed;
          top: 20%;
          left: -20%;
          width: 50vw;
          height: 60vh;
          background: radial-gradient(ellipse,
            rgba(160, 200, 235, 0.04) 0%,
            transparent 65%
          );
          border-radius: 50%;
          filter: blur(80px);
          animation: frostDrift 30s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 1;
        }

        /* Horizontal frost band — subtle across the middle */
        .frost-band {
          position: fixed;
          top: 40%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(180, 220, 255, 0.04) 20%,
            rgba(200, 230, 255, 0.07) 50%,
            rgba(180, 220, 255, 0.04) 80%,
            transparent 100%
          );
          filter: blur(4px);
          pointer-events: none;
          z-index: 1;
        }

        /* Vignette — darker at edges giving depth */
        .vignette {
          position: fixed;
          inset: 0;
          z-index: 2;
          background: radial-gradient(
            ellipse 85% 85% at 50% 50%,
            transparent 40%,
            rgba(4, 6, 12, 0.55) 75%,
            rgba(3, 5, 10, 0.9) 100%
          );
          pointer-events: none;
        }

        @keyframes frostDrift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, -15px) scale(1.03); }
        }

        /* Stars — bright, sharp, arctic */
        .stars-layer {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 2;
        }

        .star {
          position: absolute;
          border-radius: 50%;
          background: #ffffff;
          animation: starShine var(--duration, 5s) ease-in-out infinite alternate;
          animation-delay: var(--delay, 0s);
        }

        /* A few stars get a cross/spike shape via box-shadow */
        .star.bright {
          box-shadow:
            0 0 2px 1px rgba(200, 225, 255, 0.6),
            0 0 6px 2px rgba(180, 215, 255, 0.2);
        }

        @keyframes starShine {
          0%   { opacity: var(--min-opacity, 0.4); transform: scale(1); }
          100% { opacity: var(--max-opacity, 1);   transform: scale(1.2); }
        }

        /* Back button */
        .back-btn {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 100;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(180, 210, 240, 0.5);
          text-decoration: none;
          border: 1px solid rgba(160, 200, 235, 0.15);
          padding: 0.55rem 1.1rem;
          border-radius: 2px;
          transition: all 0.3s ease;
          background: rgba(6, 10, 18, 0.6);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .back-btn:hover {
          color: rgba(220, 238, 255, 0.95);
          border-color: rgba(180, 215, 248, 0.35);
          background: rgba(10, 20, 35, 0.7);
          box-shadow: 0 0 20px rgba(140, 190, 235, 0.1);
        }

        .back-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .back-btn:hover .back-arrow {
          transform: translateX(-3px);
        }

        /* Layout */
        .main-content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          padding: 5rem 2rem 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .page-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1rem;
        }

        .site-title {
          font-family: 'Marcellus', serif;
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 400;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: transparent;
          background: linear-gradient(160deg,
            #ffffff 0%,
            #cce4f8 25%,
            #a8cde8 55%,
            #dff0ff 85%,
            #ffffff 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          margin-bottom: 0.3rem;
        }

        .site-title::after {
          content: '';
          display: block;
          width: 50%;
          height: 1px;
          margin: 0.8rem auto 0;
          background: linear-gradient(90deg,
            transparent,
            rgba(160, 200, 235, 0.35),
            transparent
          );
        }

       .subtitle {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.45em;
  color: rgba(180, 220, 255, 0.65); /* ice blue */
  text-transform: uppercase;
}

      .count-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem; /* slightly increased */
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(180, 220, 255, 0.55); /* ice blue */
  margin-top: 2rem;
  margin-bottom: 2.5rem;
}

        /* Empty state */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-top: 6rem;
          opacity: 0.5;
        }

        .empty-glyph {
          font-size: 2rem;
          color: rgba(160, 200, 235, 0.35);
          letter-spacing: 0.5em;
        }

        .empty-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-style: italic;
          color: rgba(180, 215, 245, 0.5);
          letter-spacing: 0.05em;
        }

        .discover-link {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(170, 205, 235, 0.55);
          text-decoration: none;
          border: 1px solid rgba(150, 195, 230, 0.15);
          padding: 0.6rem 1.4rem;
          border-radius: 2px;
          transition: all 0.3s ease;
          background: rgba(6, 10, 18, 0.4);
          backdrop-filter: blur(10px);
        }

        .discover-link:hover {
          color: rgba(220, 238, 255, 0.9);
          border-color: rgba(170, 210, 245, 0.35);
          box-shadow: 0 0 18px rgba(130, 185, 230, 0.08);
        }

        /* Quote cards — frosted glass */
        .quotes-grid {
          width: 100%;
          max-width: 1100px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.4rem;
        }

   .quote-card {
  position: relative;

  /* brighter + ice blue tint */
  background: rgba(180, 220, 255, 0.06);
  border: 1px solid rgba(190, 225, 255, 0.18);
  border-top: 1px solid rgba(230, 245, 255, 0.28);

  border-radius: 3px;
  padding: 2rem 1.8rem 1.6rem;

  backdrop-filter: blur(30px) saturate(1.5);
  -webkit-backdrop-filter: blur(30px) saturate(1.5);

  transition: all 0.4s ease;
  overflow: hidden;
}

        /* Frost sheen on top edge */
        .quote-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60px;
          background: linear-gradient(180deg,
            rgba(220, 238, 255, 0.04) 0%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* Crisp bottom-right corner accent */
        .quote-card::after {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          width: 40px; height: 40px;
          border-bottom: 1px solid rgba(180, 215, 245, 0.15);
          border-right: 1px solid rgba(180, 215, 245, 0.15);
          border-radius: 0 0 3px 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
          opacity: 0;
        }

        .quote-card:hover {
          background: rgba(160, 200, 235, 0.055);
          border-color: rgba(190, 222, 250, 0.2);
          border-top-color: rgba(230, 244, 255, 0.3);
          transform: translateY(-3px);
          box-shadow:
            0 12px 50px rgba(4, 8, 18, 0.5),
            0 0 0 1px rgba(180, 215, 245, 0.08),
            inset 0 1px 0 rgba(240, 250, 255, 0.06);
        }

        .quote-card:hover::after { opacity: 1; }

        .quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.8rem;
          line-height: 0.5;
          color: rgba(180, 215, 245, 0.12);
          margin-bottom: 0.8rem;
          display: block;
        }

        .quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.12rem;
          font-style: italic;
          font-weight: 300;
          line-height: 1.78;
          color: rgba(225, 240, 252, 0.78);
          margin-bottom: 1.2rem;
        }

        .quote-divider {
          width: 32px;
          height: 1px;
          background: linear-gradient(90deg,
            rgba(160, 200, 235, 0.35),
            transparent
          );
          margin-bottom: 0.8rem;
        }

        .quote-author {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(150, 195, 230, 0.4);
        }

        .remove-btn {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  background: transparent;
  border: 1px solid rgba(200, 230, 255, 0.25); /* lighter border */
  color: rgba(230, 245, 255, 0.6); /* more whitish */
  width: 26px;
  height: 26px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  opacity: 0;
}
        .quote-card:hover .remove-btn { opacity: 1; }

        .remove-btn:hover {
          border-color: rgba(239, 68, 68, 0.35);
          color: rgba(252, 180, 180, 0.8);
          background: rgba(60, 10, 10, 0.25);
        }
      `}</style>

      {/* Background layers */}
      <div className="abyss-bg" />
      <div className="ice-sheet" />
      <div className="frost-top" />
      <div className="frost-bottom" />
      <div className="frost-left" />
      <div className="frost-band" />
      <div className="vignette" />

      {/* Stars — sharp arctic */}
      <div className="stars-layer">
        {stars.map((star, i) => (
          <div
            key={i}
            className={`star${star.size > 1.8 ? " bright" : ""}`}
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

      {/* Fixed back button */}
      <Link href="/" className="back-btn">
        <span className="back-arrow">←</span>
        <span>QuoteGram</span>
      </Link>

      <main className="main-content">
        <div className="page-header">
          <h1 className="site-title">Favorites</h1>
          <p className="subtitle">Preserved in the cold</p>
        </div>

        {quotes.length > 0 && (
          <p className="count-badge">— {quotes.length} quote{quotes.length !== 1 ? "s" : ""} frozen —</p>
        )}

        {quotes.length === 0 ? (
          <div className="empty-state">
            <span className="empty-glyph">· · ·</span>
            <p className="empty-text">Nothing preserved yet.</p>
            <Link href="/" className="discover-link">Return to warmth</Link>
          </div>
        ) : (
          <div className="quotes-grid">
            {quotes.map((q, idx) => (
              <div key={idx} className="quote-card">
                <button className="remove-btn" onClick={() => removeQuote(idx)} title="Remove">✕</button>
                <span className="quote-mark">"</span>
                <p className="quote-text">{q.quote}</p>
                <div className="quote-divider" />
                <p className="quote-author">— {q.author}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}