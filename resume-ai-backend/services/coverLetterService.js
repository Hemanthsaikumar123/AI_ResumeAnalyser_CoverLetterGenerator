const { callAICoverLetter } = require('./aiService');

/**
 * Generates a cover letter via Gemini AI.
 * @param {string} resumeText
 * @param {string} jobDescription
 * @param {string} tone  - professional | enthusiastic | concise | formal
 * @param {string} wordingSize  - short | medium | long
 * @returns {Promise<string>} plain-text cover letter
 */
async function generateCoverLetter(resumeText, jobDescription, tone = 'professional', wordingSize = 'medium') {
  const validTones = ['professional', 'enthusiastic', 'concise', 'formal'];
  const validSizes = ['short', 'medium', 'long'];
  const safeTone   = validTones.includes(tone.toLowerCase()) ? tone.toLowerCase() : 'professional';
  const safeSize   = validSizes.includes(wordingSize.toLowerCase()) ? wordingSize.toLowerCase() : 'medium';

  const coverLetter = await callAICoverLetter(resumeText, jobDescription, safeTone, safeSize);
  return coverLetter;
}

module.exports = { generateCoverLetter };