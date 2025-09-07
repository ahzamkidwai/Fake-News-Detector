"use client";
import { useState, useEffect } from "react";

export default function FakeNewsDetector() {
  const [articleContent, setArticleContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [analysis, setAnalysis] = useState<any>(null);

  // Example articles
  const examples: Record<string, string> = {
    political:
      "Breaking: Local Mayor Announces Comprehensive Infrastructure Plan\n\nCITY HALL - Mayor Sarah Johnson unveiled a ambitious $50 million infrastructure improvement plan...",
    health:
      "New Study Reveals Surprising Benefits of Mediterranean Diet\n\nRESEARCH UPDATE - A comprehensive 10-year study published in the Journal of Nutritional Medicine...",
    tech: "Tech Giant Announces Revolutionary Quantum Computing Breakthrough\n\nSILICON VALLEY - Quantum Dynamics Corporation announced yesterday that their research team...",
  };

  const loadExample = (type: string) => {
    setArticleContent(examples[type]);
  };

  // Simulate loading steps (progress messages)
  useEffect(() => {
    if (loading) {
      setStep(0);
      const steps = [1, 2, 3, 4];
      let i = 0;
      const interval = setInterval(() => {
        setStep(steps[i]);
        i++;
        if (i === steps.length) {
          clearInterval(interval);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!articleContent.trim()) {
      alert("Please paste a news article to analyze.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/fakenews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: articleContent }),
      });
      const data = await response.json();
      console.log("Analysis Result:", data);
      setAnalysis(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg scroll-smooth">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <i className="fas fa-shield-alt text-2xl text-white mr-2"></i>
              <span className="text-xl font-bold text-white">TruthGuard</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#about"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                <i className="fas fa-info-circle mr-2"></i>About
              </a>
              <a
                href="#how"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                <i className="fas fa-question-circle mr-2"></i>How it works
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          AI-Powered <span className="text-yellow-300">Fake News</span> Detector
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Paste any news article below and get instant credibility analysis
          using advanced AI algorithms.
        </p>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="glass-effect rounded-2xl p-8">
          <form onSubmit={handleSubmit}>
            <textarea
              rows={12}
              value={articleContent}
              onChange={(e) => setArticleContent(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 resize-none"
              placeholder="Paste news article here..."
            />
            <button
              type="submit"
              disabled={articleContent.length < 50 || loading}
              className={`w-full mt-4 py-3 rounded-lg font-bold transition ${
                articleContent.length < 50 || loading
                  ? "bg-gray-600 text-gray-300 opacity-50 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              }`}
            >
              <i className="fas fa-search mr-2"></i>
              {loading ? "Analyzing..." : "Analyze Article"}
            </button>
          </form>

          {/* Examples */}
          <div className="mt-6 flex gap-2">
            {Object.keys(examples).map((key) => (
              <button
                key={key}
                onClick={() => loadExample(key)}
                className="text-xs bg-gray-700 text-white px-3 py-1 rounded-full"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results / Loading */}
        {loading ? (
          <div className="glass-effect rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-300 mb-6"></div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Analyzing Article...
            </h3>
            <p className="text-gray-300">
              {step === 1 && "Scanning content structure..."}
              {step === 2 && "Verifying sources..."}
              {step === 3 && "Running AI analysis..."}
              {step === 4 && "Calculating credibility score..."}
            </p>
          </div>
        ) : (
          analysis && (
            <div className="glass-effect rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                <i className="fas fa-chart-line mr-2 text-yellow-300"></i>
                Analysis Results
              </h2>
              <p className="text-white font-bold mb-2">
                Prediction:
                <span
                  className={`${
                    analysis.label.toLowerCase().includes("fake")
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {analysis.label}
                </span>
              </p>
              <p className="text-white font-bold mb-2">
                Confidence Score: {analysis.score}%
              </p>
              <pre className="text-gray-300 text-xs whitespace-pre-wrap mt-4">
                {JSON.stringify(analysis.raw, null, 2)}
              </pre>
            </div>
          )
        )}
      </div>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-yellow-300 mb-4">
          About TruthGuard
        </h2>
        <p className="text-lg text-gray-200">
          TruthGuard is an AI-powered tool that analyzes news articles for
          credibility and bias indicators. Our mission is to help readers
          quickly identify reliable journalism from potentially misleading
          content.
        </p>
      </section>

      {/* How it Works Section */}
      <section id="how" className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-yellow-300 mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-200">
          Paste a news article or provide its link. Our system uses a Hugging
          Face model to classify it as real or fake and returns a confidence
          score.
        </p>
      </section>
    </div>
  );
}
