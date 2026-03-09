export const getRandomQuote = async () => {
  const res = await fetch("/api/quote")
  return res.json()
}