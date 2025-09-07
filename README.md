# 🛡️ TruthGuard – AI-Powered Fake News Detector

This is a **Next.js 14** project that uses **React** and **TailwindCSS** to build a web application for detecting fake news articles using AI. Users can paste news content and receive an instant credibility analysis with a confidence score.

This project was bootstrapped with `create-next-app`.

---

## 🌟 Features

- 📝 Paste news articles to analyze for credibility.  
- 🤖 Uses Hugging Face AI models for fake news detection.  
- 📊 Step-by-step animated progress during analysis.  
- 🌐 Example articles for testing (Political, Health, Tech).  
- 📈 Shows prediction (Real/Fake) and confidence score.  
- 🎨 Sleek glassmorphism UI using TailwindCSS.  

---

## 🧠 How It Works

The Fake News Detector uses the `mrm8488/bert-tiny-finetuned-fake-news-detection` model from Hugging Face.  

**Step-by-step breakdown:**

1. **User Input:**  
   User pastes a news article in the textarea.

2. **Submit Request:**  
   On clicking **Analyze Article**, the app sends a POST request to the internal API route (`/api/fakenews`).

3. **Backend API Call:**  
   The API route receives the text and forwards it to the Hugging Face Inference API.  
   Authorization is handled using your Hugging Face API key stored in `.env.local`.

4. **AI Model Prediction:**  
   The model returns predictions as labels with confidence scores:
   - `LABEL_0` → Real  
   - `LABEL_1` → Fake

5. **Pick Highest Confidence:**  
   The API selects the label with the highest score and sends back a response including:
   - `label`: Real or Fake  
   - `score`: Confidence percentage  
   - `raw`: Full model output for debugging or advanced usage

6. **Display Results:**  
   The frontend displays the prediction, confidence score, and raw data in a formatted UI.  
   A spinning loader with step-by-step messages is shown during analysis.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14  
- **UI Library:** React 18  
- **Styling:** TailwindCSS (Glassmorphism UI)  
- **AI Model:** Hugging Face – Fake News Detection (BERT Tiny)  
- **Hosting:** Vercel (Recommended)  

---

## 📂 Project Structure

