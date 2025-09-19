const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI-powered complete analysis using Google Gemini
async function callAICompleteAnalysis(resumeText, jobDescription) {
  try {
    console.log('Generating complete AI-powered resume analysis with Gemini...');

    // For text-only input, use the gemini-1.5-flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

      **Instructions:**
      Provide your analysis as a single JSON object with NO markdown formatting. The response should be a valid JSON object with this exact structure:

      {
        "skill_analysis": {
          "matched_skills": ["Array of skills from job description that candidate clearly has"],
          "missing_skills": ["Array of skills from job description that candidate lacks"],
          "match_percentage": "Numeric percentage (0-100) of how well skills match"
        },
        "primary_assessment": "1-2 sentence summary of candidate's fit for this specific role",
        "career_advice": [
          "Strategic advice point 1 - focus on how to leverage existing skills",
          "Strategic advice point 2 - how to position experience effectively",
          "Strategic advice point 3 - career growth recommendations"
        ],
        "learning_priorities": [
          "Only skills explicitly mentioned in job description that are missing",
          "Focus on job-specific requirements, not general recommendations"
        ],
        "interview_tips": [
          "Tip 1 - specific to this job and candidate's background",
          "Tip 2 - how to address skill gaps if any",
          "Tip 3 - how to highlight relevant experience"
        ],
        "overall_score": "Decimal between 0.0 and 1.0 representing overall fit"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Clean the response to ensure it's valid JSON
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonResponse = JSON.parse(cleanedText);

    // Ensure all required fields are present
    if (!jsonResponse.skill_analysis) {
      jsonResponse.skill_analysis = {
        matched_skills: [],
        missing_skills: [],
        match_percentage: 0
      };
    }

    return jsonResponse;

  } catch (error) {
    console.error('Error calling Google Gemini API for complete analysis:', error);
    // Provide a fallback response
    return {
      skill_analysis: {
        matched_skills: [],
        missing_skills: ["Analysis unavailable"],
        match_percentage: 0
      },
      primary_assessment: "AI analysis could not be completed at this time.",
      career_advice: ["There was an issue connecting to the AI service. Please check the server logs for more details."],
      learning_priorities: [],
      interview_tips: [],
      overall_score: 0.0
    };
  }
}

module.exports = { callAICompleteAnalysis };