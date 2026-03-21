const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Models confirmed available — ordered best → lightest
const MODEL_CANDIDATES = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
];

// ── Internal helper: try each model until one works ───────────────────────
async function callWithFallback(prompt) {
  let lastError = null;

  for (const modelName of MODEL_CANDIDATES) {
    try {
      console.log(`  Trying model: ${modelName}`);
      const model  = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text   = await result.response.text();
      console.log(`  ✅ ${modelName} succeeded`);
      return text;
    } catch (error) {
      lastError    = error;
      const msg    = (error.message || '').toLowerCase();
      const reason = msg.includes('429') || msg.includes('rate limit') || msg.includes('quota')
        ? 'rate limited'
        : msg.includes('404') || msg.includes('not found') || msg.includes('not supported')
          ? 'unavailable'
          : 'error';
      console.warn(`  ⚠️  ${modelName} ${reason}: ${error.message}`);
    }
  }

  throw new Error(`All Gemini models failed. Last: ${lastError?.message}`);
}

// ── Resume Analysis ───────────────────────────────────────────────────────
async function callAICompleteAnalysis(resumeText, jobDescription) {
  const prompt = `
Act as an expert career advisor and resume analyst. Analyze the resume against the job description.

**Resume:**
---
${resumeText}
---

**Job Description:**
---
${jobDescription}
---

CRITICAL INSTRUCTIONS:
1. Only identify skills EXPLICITLY mentioned in the job description
2. Do not suggest generic alternatives unless specifically required
3. Be precise — if job asks for "HTML, CSS, JS" don't add React, Angular etc.
4. Give a realistic assessment based on the candidate's actual experience

Respond ONLY with raw JSON — no markdown, no backticks, no extra text.

{
  "skill_analysis": {
    "matched_skills": ["skills from job description the candidate HAS"],
    "missing_skills": ["skills from job description the candidate LACKS"],
    "match_percentage": 75
  },
  "primary_assessment": "1-2 sentence summary of candidate fit",
  "career_advice": ["advice 1", "advice 2", "advice 3"],
  "learning_priorities": ["missing skill 1", "missing skill 2"],
  "interview_tips": ["tip 1", "tip 2", "tip 3"],
  "overall_score": 0.75
}
  `;

  try {
    const raw     = await callWithFallback(prompt);
    const cleaned = raw
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i,     '')
      .replace(/\s*```$/i,     '')
      .trim();

    const json = JSON.parse(cleaned);

    // Normalise overall_score to 0-1
    if (typeof json.overall_score === 'number' && json.overall_score > 1) {
      json.overall_score = json.overall_score / 100;
    }
    if (!json.skill_analysis) {
      json.skill_analysis = { matched_skills: [], missing_skills: [], match_percentage: 0 };
    }

    return json;

  } catch (error) {
    console.error('callAICompleteAnalysis failed:', error.message);
    return {
      skill_analysis:     { matched_skills: [], missing_skills: ['Analysis unavailable'], match_percentage: 0 },
      primary_assessment: 'AI analysis could not be completed. Please wait a minute and retry.',
      career_advice:      ['Free tier allows 15 requests/minute — please wait and retry.'],
      learning_priorities: [],
      interview_tips:     [],
      overall_score:      0.0,
    };
  }
}

// ── Cover Letter Generation ───────────────────────────────────────────────
async function callAICoverLetter(resumeText, jobDescription, tone = 'professional') {
  const prompt = `
You are an expert career assistant. Generate a personalized ${tone} cover letter.

**Resume:**
---
${resumeText}
---

**Job Description:**
---
${jobDescription}
---

Requirements:
- Start with "Dear Hiring Manager,"
- Opening: express enthusiasm, reference the specific role
- Body: highlight 2-3 matching skills/achievements from the resume
- Explain fit based on the job's specific requirements
- Closing: polite call-to-action
- Tone: ${tone}
- Length: 250-400 words
- Be specific — no generic filler language

Return ONLY the cover letter text. No markdown, no extra commentary.
  `;

  const text = await callWithFallback(prompt);
  if (!text?.trim() || text.trim().length < 50) {
    throw new Error('Generated cover letter is empty');
  }
  return text.trim();
}

module.exports = { callAICompleteAnalysis, callAICoverLetter };


// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ✅ Only models confirmed available by checkModels.js
// // Strip the "models/" prefix — SDK adds it automatically
// const MODEL_CANDIDATES = [
//   "gemini-2.5-flash",       // Best: fast + capable
//   "gemini-2.0-flash",       // Fallback 1
//   "gemini-2.0-flash-lite",  // Fallback 2: lightest, highest quota
//   "gemini-pro-latest",      // Fallback 3
// ];

// async function callAICompleteAnalysis(resumeText, jobDescription) {
//   let lastError = null;

//   for (const modelName of MODEL_CANDIDATES) {
//     try {
//       console.log(`Trying Gemini model: ${modelName}`);
//       const model = genAI.getGenerativeModel({ model: modelName });

//       const prompt = `
// Act as an expert career advisor and resume analyst. Analyze the provided resume against the job description and provide a comprehensive, accurate analysis.

// **Resume Content:**
// ---
// ${resumeText}
// ---

// **Job Description:**
// ---
// ${jobDescription}
// ---

// **CRITICAL INSTRUCTIONS:**
// 1. ONLY identify skills that are EXPLICITLY mentioned in the job description
// 2. DO NOT suggest generic alternatives or related technologies unless specifically required
// 3. Be very precise - if job asks for "HTML, CSS, JavaScript" don't suggest React, Angular, etc.
// 4. Consider responsive design as part of CSS skills, not a separate skill
// 5. Focus on exact skill matches based on what's actually in the job posting
// 6. Provide realistic assessment based on the candidate's actual experience level

// Respond ONLY with a raw JSON object. No markdown, no backticks, no explanation — just the JSON.

// {
//   "skill_analysis": {
//     "matched_skills": ["skills from job description the candidate has"],
//     "missing_skills": ["skills from job description the candidate lacks"],
//     "match_percentage": 75
//   },
//   "primary_assessment": "1-2 sentence summary of candidate fit for this specific role",
//   "career_advice": [
//     "Strategic advice point 1",
//     "Strategic advice point 2",
//     "Strategic advice point 3"
//   ],
//   "learning_priorities": [
//     "Missing skill explicitly required by job description"
//   ],
//   "interview_tips": [
//     "Tip 1 specific to this job and background",
//     "Tip 2 how to address skill gaps",
//     "Tip 3 how to highlight relevant experience"
//   ],
//   "overall_score": 0.75
// }
//       `;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const text = await response.text();

//       // Strip any accidental markdown fences
//       const cleanedText = text
//         .replace(/^```json\s*/i, '')
//         .replace(/^```\s*/i, '')
//         .replace(/\s*```$/i, '')
//         .trim();

//       const jsonResponse = JSON.parse(cleanedText);

//       // Normalise overall_score to 0–1 if model returned 0–100
//       if (typeof jsonResponse.overall_score === 'number' && jsonResponse.overall_score > 1) {
//         jsonResponse.overall_score = jsonResponse.overall_score / 100;
//       }

//       // Ensure skill_analysis block always exists
//       if (!jsonResponse.skill_analysis) {
//         jsonResponse.skill_analysis = {
//           matched_skills: [],
//           missing_skills: [],
//           match_percentage: 0
//         };
//       }

//       console.log(`✅ Success with model: ${modelName}`);
//       return jsonResponse;

//     } catch (error) {
//       lastError = error;
//       const msg = (error.message || '').toLowerCase();

//       if (msg.includes('429') || msg.includes('rate limit') || msg.includes('quota')) {
//         console.warn(`⚠️  Rate limit on ${modelName}. Trying next...`);
//       } else if (msg.includes('404') || msg.includes('not found') || msg.includes('not supported')) {
//         console.warn(`⚠️  Model unavailable: ${modelName}. Trying next...`);
//       } else {
//         console.error(`❌ Error with ${modelName}:`, error.message);
//       }
//     }
//   }

//   console.error('❌ All Gemini models failed. Last error:', lastError?.message);
//   return {
//     skill_analysis: {
//       matched_skills: [],
//       missing_skills: ["Analysis unavailable — all AI models failed"],
//       match_percentage: 0
//     },
//     primary_assessment: "AI analysis could not be completed. Please wait a minute and try again (rate limit).",
//     career_advice: ["The free tier allows 15 requests/minute. Please wait and retry."],
//     learning_priorities: [],
//     interview_tips: [],
//     overall_score: 0.0
//   };
// }

// module.exports = { callAICompleteAnalysis };