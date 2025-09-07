export async function POST(req) {
  try {
    const { text } = await req.json();

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mrm8488/bert-tiny-finetuned-fake-news-detection",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const raw = await response.json();

    // raw looks like: [[{label: "LABEL_0", score: ...}, {label: "LABEL_1", score: ...}]]
    const predictions = raw[0];

    // pick highest score
    const best = predictions.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );

    // map labels
    const labelMap = {
      LABEL_0: "Real",
      LABEL_1: "Fake",
    };

    return Response.json({
      label: labelMap[best.label],
      score: (best.score * 100).toFixed(2), // percentage
      raw,
    });
  } catch (error) {
    console.error("Error in /api/fakenews:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
