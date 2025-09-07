export async function POST(req) {
  try {
    const { text } = await req.json();

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/mrm8488/bert-tiny-finetuned-fake-news-detection",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const result = await response.json();
    console.log("Hugging Face API response:", result);
    return Response.json(result);
  } catch (error) {
    console.error("Error in /api/fakenews:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
