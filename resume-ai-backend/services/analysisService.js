const { parseJobDescription } = require('./jobParser');
const { callAI, callAICompleteAnalysis } = require('./aiService');
const { 
  analyzeExperienceLevel,
  detectRoleType 
} = require('../utils/skillUtils');

// Function to analyze resume and job description using AI
async function analyzeResumeAndJob(resumeText, jobDescText) {
  try {
    console.log('=== Starting AI-Powered Resume Analysis ===');
    
    // Extract basic job information for metadata
    const parsedJob = parseJobDescription(jobDescText);
    
    // Use AI to perform complete analysis including skill matching
    console.log('Calling AI for complete analysis...');
    const aiAnalysis = await callAICompleteAnalysis(resumeText, jobDescText);
    
    console.log('AI analysis completed:', JSON.stringify(aiAnalysis, null, 2));
    
    // Construct the final analysis object with AI results
    const analysis = {
      // Core AI-generated content
      primary_assessment: aiAnalysis.primary_assessment,
      career_advice: aiAnalysis.career_advice || [],
      learning_priorities: aiAnalysis.learning_priorities || [],
      interview_tips: aiAnalysis.interview_tips || [],
      
      // Skill analysis from AI
      skillMatches: {
        matched: aiAnalysis.skill_analysis?.matched_skills || [],
        missing: aiAnalysis.skill_analysis?.missing_skills || [],
        matchPercentage: aiAnalysis.skill_analysis?.match_percentage || 0
      },
      
      // Overall scoring
      overallScore: aiAnalysis.overall_score || (aiAnalysis.skill_analysis?.match_percentage || 0) / 100,
      
      // Legacy compatibility mapping
      recommendations: aiAnalysis.career_advice || [],
      
      // Additional metadata
      experienceLevel: analyzeExperienceLevel(resumeText),
      roleType: detectRoleType(jobDescText),
      jobTitle: parsedJob.job_title || 'Unknown Position',
    };

    console.log('=== AI-Powered Analysis Complete ===\n');
    return analysis;

  } catch (error) {
    console.error('AI-powered resume analysis failed:', error);
    throw new Error(`Failed to analyze resume and job: ${error.message}`);
  }
}

module.exports = {
  analyzeResumeAndJob
};