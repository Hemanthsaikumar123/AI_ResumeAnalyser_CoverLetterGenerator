const { callAICompleteAnalysis } = require('./aiService');

// ── Minimal helpers (no longer need the 800-line skillUtils) ──────────────
function analyzeExperienceLevel(text) {
  const lower = text.toLowerCase();
  if (['senior', 'lead', 'architect', 'principal', '8+ years', '10+ years'].some(k => lower.includes(k))) return 'Senior';
  if (['mid-level', '5+ years', '4+ years', '3+ years'].some(k => lower.includes(k)))                    return 'Mid-level';
  if (['junior', 'entry', 'graduate', '1 year', '2 years'].some(k => lower.includes(k)))                 return 'Junior';
  return null;
}

function detectRoleType(jobDescription) {
  const lower = jobDescription.toLowerCase();
  if (lower.includes('frontend') || lower.includes('react') || lower.includes('angular'))   return 'frontend';
  if (lower.includes('backend')  || lower.includes('api')   || lower.includes('database'))  return 'backend';
  if (lower.includes('fullstack') || lower.includes('full stack'))                           return 'fullstack';
  if (lower.includes('devops')   || lower.includes('cloud') || lower.includes('infrastructure')) return 'devops';
  if (lower.includes('data scientist') || lower.includes('machine learning'))                return 'data-science';
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
async function analyzeResumeAndJob(resumeText, jobDescText) {
  console.log('=== Starting AI Analysis ===');

  const ai = await callAICompleteAnalysis(resumeText, jobDescText);

  console.log('AI response received');
  console.log('=== AI Analysis Complete ===\n');

  // Normalise score
  let score = ai.overall_score ?? (ai.skill_analysis?.match_percentage ?? 0) / 100;
  if (score > 1) score = score / 100;

  return {
    primary_assessment:  ai.primary_assessment,
    career_advice:       ai.career_advice       || [],
    learning_priorities: ai.learning_priorities || [],
    interview_tips:      ai.interview_tips      || [],
    skillMatches: {
      matched:         ai.skill_analysis?.matched_skills  || [],
      missing:         ai.skill_analysis?.missing_skills  || [],
      matchPercentage: ai.skill_analysis?.match_percentage || 0,
    },
    overallScore:   score,
    recommendations: ai.career_advice || [],   // legacy alias
    experienceLevel: analyzeExperienceLevel(resumeText),
    roleType:        detectRoleType(jobDescText),
    jobTitle:        'Unknown Position',       // jobParser removed — AI handles this
  };
}

module.exports = { analyzeResumeAndJob };

// const { parseJobDescription } = require('./jobParser');
// const { callAI, callAICompleteAnalysis } = require('./aiService');
// const { 
//   analyzeExperienceLevel,
//   detectRoleType 
// } = require('../utils/skillUtils');

// // Function to analyze resume and job description using AI
// async function analyzeResumeAndJob(resumeText, jobDescText) {
//   try {
//     console.log('=== Starting AI-Powered Resume Analysis ===');
    
//     // Extract basic job information for metadata
//     const parsedJob = parseJobDescription(jobDescText);
    
//     // Use AI to perform complete analysis including skill matching
//     console.log('Calling AI for complete analysis...');
//     const aiAnalysis = await callAICompleteAnalysis(resumeText, jobDescText);
    
//     console.log('AI analysis completed:', JSON.stringify(aiAnalysis, null, 2));
    
//     // Construct the final analysis object with AI results
//     const analysis = {
//       // Core AI-generated content
//       primary_assessment: aiAnalysis.primary_assessment,
//       career_advice: aiAnalysis.career_advice || [],
//       learning_priorities: aiAnalysis.learning_priorities || [],
//       interview_tips: aiAnalysis.interview_tips || [],
      
//       // Skill analysis from AI
//       skillMatches: {
//         matched: aiAnalysis.skill_analysis?.matched_skills || [],
//         missing: aiAnalysis.skill_analysis?.missing_skills || [],
//         matchPercentage: aiAnalysis.skill_analysis?.match_percentage || 0
//       },
      
//       // Overall scoring
//       overallScore: aiAnalysis.overall_score || (aiAnalysis.skill_analysis?.match_percentage || 0) / 100,
      
//       // Legacy compatibility mapping
//       recommendations: aiAnalysis.career_advice || [],
      
//       // Additional metadata
//       experienceLevel: analyzeExperienceLevel(resumeText),
//       roleType: detectRoleType(jobDescText),
//       jobTitle: parsedJob.job_title || 'Unknown Position',
//     };

//     console.log('=== AI-Powered Analysis Complete ===\n');
//     return analysis;

//   } catch (error) {
//     console.error('AI-powered resume analysis failed:', error);
//     throw new Error(`Failed to analyze resume and job: ${error.message}`);
//   }
// }

// module.exports = {
//   analyzeResumeAndJob
// };