const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Only models confirmed available by checkModels.js
// Strip the "models/" prefix — SDK adds it automatically
const MODEL_CANDIDATES = [
  "gemini-2.5-flash",       // Best: fast + capable
  "gemini-2.0-flash",       // Fallback 1
  "gemini-2.0-flash-lite",  // Fallback 2: lightest, highest quota
  "gemini-pro-latest",      // Fallback 3
];

async function callAICompleteAnalysis(resumeText, jobDescription) {
  let lastError = null;

  for (const modelName of MODEL_CANDIDATES) {
    try {
      console.log(`Trying Gemini model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
Act as an expert career advisor and resume analyst. Analyze the provided resume against the job description and provide a comprehensive, accurate analysis.

**Resume Content:**
---
${resumeText}
---

**Job Description:**
---
${jobDescription}
---

**CRITICAL INSTRUCTIONS:**
1. ONLY identify skills that are EXPLICITLY mentioned in the job description
2. DO NOT suggest generic alternatives or related technologies unless specifically required
3. Be very precise - if job asks for "HTML, CSS, JavaScript" don't suggest React, Angular, etc.
4. Consider responsive design as part of CSS skills, not a separate skill
5. Focus on exact skill matches based on what's actually in the job posting
6. Provide realistic assessment based on the candidate's actual experience level

Respond ONLY with a raw JSON object. No markdown, no backticks, no explanation — just the JSON.

{
  "skill_analysis": {
    "matched_skills": ["skills from job description the candidate has"],
    "missing_skills": ["skills from job description the candidate lacks"],
    "match_percentage": 75
  },
  "primary_assessment": "1-2 sentence summary of candidate fit for this specific role",
  "career_advice": [
    "Strategic advice point 1",
    "Strategic advice point 2",
    "Strategic advice point 3"
  ],
  "learning_priorities": [
    "Missing skill explicitly required by job description"
  ],
  "interview_tips": [
    "Tip 1 specific to this job and background",
    "Tip 2 how to address skill gaps",
    "Tip 3 how to highlight relevant experience"
  ],
  "overall_score": 0.75
}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      // Strip any accidental markdown fences
      const cleanedText = text
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      const jsonResponse = JSON.parse(cleanedText);

      // Normalise overall_score to 0–1 if model returned 0–100
      if (typeof jsonResponse.overall_score === 'number' && jsonResponse.overall_score > 1) {
        jsonResponse.overall_score = jsonResponse.overall_score / 100;
      }

      // Ensure skill_analysis block always exists
      if (!jsonResponse.skill_analysis) {
        jsonResponse.skill_analysis = {
          matched_skills: [],
          missing_skills: [],
          match_percentage: 0
        };
      }

      console.log(`✅ Success with model: ${modelName}`);
      return jsonResponse;

    } catch (error) {
      lastError = error;
      const msg = (error.message || '').toLowerCase();

      if (msg.includes('429') || msg.includes('rate limit') || msg.includes('quota')) {
        console.warn(`⚠️  Rate limit on ${modelName}. Trying next...`);
      } else if (msg.includes('404') || msg.includes('not found') || msg.includes('not supported')) {
        console.warn(`⚠️  Model unavailable: ${modelName}. Trying next...`);
      } else {
        console.error(`❌ Error with ${modelName}:`, error.message);
      }
    }
  }

  console.error('❌ All Gemini models failed. Last error:', lastError?.message);
  return {
    skill_analysis: {
      matched_skills: [],
      missing_skills: ["Analysis unavailable — all AI models failed"],
      match_percentage: 0
    },
    primary_assessment: "AI analysis could not be completed. Please wait a minute and try again (rate limit).",
    career_advice: ["The free tier allows 15 requests/minute. Please wait and retry."],
    learning_priorities: [],
    interview_tips: [],
    overall_score: 0.0
  };
}

module.exports = { callAICompleteAnalysis };