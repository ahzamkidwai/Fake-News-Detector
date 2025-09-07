"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getLabelAndScore = () => {
    if (!result) return null;
    const predictions = result[0]; // model returns array of arrays
    if (!Array.isArray(predictions)) return null;

    const sorted = predictions.sort((a: any, b: any) => b.score - a.score);
    return sorted[0]; // top prediction
  };

  const prediction = getLabelAndScore();

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          📰 Fake News Detector
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Paste a news article below and check its credibility.
        </p>

        {/* Input */}
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          placeholder="Paste news article text here..."
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={analyzeText}
          disabled={loading || !text.trim()}
          className={`mt-6 w-full py-3 rounded-lg text-white font-medium transition 
            ${
              loading || !text.trim()
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow"
            }`}
        >
          {loading ? "Analyzing..." : "Check Credibility"}
        </button>

        {/* Result */}
        {prediction && (
          <div className="mt-8 bg-gray-50 p-6 rounded-xl border text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Credibility Result
            </h2>

            {/* Label */}
            <p
              className={`text-2xl font-bold mb-2 ${
                prediction.label === "real" ? "text-green-600" : "text-red-600"
              }`}
            >
              {prediction.label === "real"
                ? "✅ Likely Real"
                : "❌ Likely Fake"}
            </p>

            {/* Score bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className={`h-4 rounded-full ${
                  prediction.label === "real" ? "bg-green-500" : "bg-red-500"
                }`}
                style={{ width: `${(prediction.score * 100).toFixed(1)}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Confidence: {(prediction.score * 100).toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
