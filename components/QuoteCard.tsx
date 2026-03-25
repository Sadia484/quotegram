"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface Props {
  quote: string
  author: string
}

export default function QuoteCard({ quote, author }: Props) {
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (quote) setKey(k => k + 1)
  }, [quote])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Marcellus&family=Space+Mono:wght@400;700&display=swap');

        .quote-card {
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(15, 8, 35, 0.85) 0%,
            rgba(20, 10, 45, 0.9) 50%,
            rgba(10, 5, 30, 0.85) 100%
          );
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 4px;
          padding: 3.5rem 3rem 3rem;
          text-align: center;
          backdrop-filter: blur(30px);
          box-shadow:
            0 0 0 1px rgba(139, 92, 246, 0.05),
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 0 80px rgba(88, 28, 135, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          overflow: hidden;
        }

        .quote-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.4), transparent);
        }

        .quote-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(109, 40, 217, 0.2), transparent);
        }

        .corner-ornament {
          position: absolute;
          width: 20px;
          height: 20px;
          opacity: 0.3;
        }
        .corner-ornament.tl { top: 12px; left: 12px; border-top: 1px solid rgba(167, 139, 250, 0.6); border-left: 1px solid rgba(167, 139, 250, 0.6); }
        .corner-ornament.tr { top: 12px; right: 12px; border-top: 1px solid rgba(167, 139, 250, 0.6); border-right: 1px solid rgba(167, 139, 250, 0.6); }
        .corner-ornament.bl { bottom: 12px; left: 12px; border-bottom: 1px solid rgba(167, 139, 250, 0.6); border-left: 1px solid rgba(167, 139, 250, 0.6); }
        .corner-ornament.br { bottom: 12px; right: 12px; border-bottom: 1px solid rgba(167, 139, 250, 0.6); border-right: 1px solid rgba(167, 139, 250, 0.6); }

        .quote-mark {
          font-family: 'Marcellus', serif;
          font-size: 5rem;
          line-height: 1;
          color: rgba(139, 92, 246, 0.2);
          position: absolute;
          top: 1.2rem;
          left: 2rem;
          user-select: none;
        }

        .quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          font-style: italic;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(237, 228, 255, 0.92);
          letter-spacing: 0.01em;
          position: relative;
          z-index: 1;
        }

        .divider {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
          margin: 1.5rem auto;
        }

        .author-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(167, 139, 250, 0.55);
        }

        .star-dot {
          color: rgba(139, 92, 246, 0.4);
          margin: 0 0.5rem;
        }
      `}</style>

      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          className="quote-card"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.99 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="corner-ornament tl" />
          <div className="corner-ornament tr" />
          <div className="corner-ornament bl" />
          <div className="corner-ornament br" />

          <span className="quote-mark">"</span>

          <motion.p
            className="quote-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {quote || "Loading wisdom from the cosmos..."}
          </motion.p>

          <div className="divider" />

          <motion.p
            className="author-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <span className="star-dot">✦</span>
            {author || "Unknown"}
            <span className="star-dot">✦</span>
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </>
  )
}