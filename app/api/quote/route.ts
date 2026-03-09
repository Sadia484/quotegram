export async function GET() {
  try {

    const res = await fetch("https://dummyjson.com/quotes/random")

    const data = await res.json()

    return Response.json({
      content: data.quote,
      author: data.author
    })

  } catch (error) {

    return Response.json({
      content: "Stay positive and keep building.",
      author: "QuoteGram"
    })

  }
}