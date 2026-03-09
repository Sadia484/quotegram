"use client"

import { motion } from "framer-motion"

interface Props {
  quote: string
  author: string
}

export default function QuoteCard({ quote, author }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-xl text-center"
    >
      <p className="text-xl italic">"{quote}"</p>

      <p className="mt-4 text-sm opacity-70">— {author}</p>
    </motion.div>
  )
}