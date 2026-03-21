const { callAICoverLetter } = require('./aiService');

/**
 * Generates a cover letter via Gemini AI.
 * @param {string} resumeText
 * @param {string} jobDescription
 * @param {string} tone  - professional | enthusiastic | concise | formal
 * @returns {Promise<string>} plain-text cover letter
 */
async function generateCoverLetter(resumeText, jobDescription, tone = 'professional') {
  const validTones = ['professional', 'enthusiastic', 'concise', 'formal'];
  const safeTone   = validTones.includes(tone.toLowerCase()) ? tone.toLowerCase() : 'professional';

  const coverLetter = await callAICoverLetter(resumeText, jobDescription, safeTone);
  return coverLetter;
}

module.exports = { generateCoverLetter };