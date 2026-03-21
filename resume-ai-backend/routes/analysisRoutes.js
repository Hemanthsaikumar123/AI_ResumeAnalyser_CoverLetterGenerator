const express               = require('express');
const router                = express.Router();
const { uploadMiddleware }  = require('../middleware/uploadMiddleware');
const { analyzeResume }     = require('../controllers/analysisController');

// POST /upload-and-analyze
// Accepts: multipart/form-data  { file, jobDescText }
router.post('/', uploadMiddleware.single('file'), analyzeResume);

module.exports = router;





// const express = require('express');
// const router = express.Router();
// const { parseResume } = require('../services/resumeParser');
// const { parseJobDescription } = require('../services/jobParser');
// const { analyzeResumeAndJob } = require('../services/analysisService');
// const { aiQuery } = require('../services/aiService');
// const fs = require('fs');

// // Parse resume endpoint (for testing existing files)
// router.post('/parse', async (req, res) => {
//   try {
//     const { filePath } = req.body;
    
//     if (!filePath) {
//       return res.status(400).json({ 
//         error: 'filePath is required in request body' 
//       });
//     }

//     // Check if file exists
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ 
//         error: 'File not found' 
//       });
//     }

//     const extractedText = await parseResume(filePath);

//     res.json({
//       filePath: filePath,
//       message: 'File parsed successfully',
//       extractedText: extractedText
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       error: 'File parsing failed',
//       details: error.message 
//     });
//   }
// });

// // Parse job description endpoint
// router.post('/parse-job', async (req, res) => {
//   try {
//     const { jobText } = req.body;
    
//     if (!jobText || typeof jobText !== 'string') {
//       return res.status(400).json({ 
//         error: 'jobText is required in request body and must be a string' 
//       });
//     }

//     if (jobText.trim().length === 0) {
//       return res.status(400).json({ 
//         error: 'jobText cannot be empty' 
//       });
//     }

//     const parsedJob = parseJobDescription(jobText);

//     res.json({
//       message: 'Job description parsed successfully',
//       parsedJob: parsedJob
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       error: 'Job description parsing failed',
//       details: error.message 
//     });
//   }
// });

// // Resume and Job Analysis endpoint
// router.post('/analyze', async (req, res) => {
//   try {
//     const { resumeText, jobDescText } = req.body;
    
//     if (!resumeText || typeof resumeText !== 'string') {
//       return res.status(400).json({ 
//         error: 'resumeText is required in request body and must be a string' 
//       });
//     }

//     if (!jobDescText || typeof jobDescText !== 'string') {
//       return res.status(400).json({ 
//         error: 'jobDescText is required in request body and must be a string' 
//       });
//     }

//     if (resumeText.trim().length === 0) {
//       return res.status(400).json({ 
//         error: 'resumeText cannot be empty' 
//       });
//     }

//     if (jobDescText.trim().length === 0) {
//       return res.status(400).json({ 
//         error: 'jobDescText cannot be empty' 
//       });
//     }

//     console.log('\n=== Resume Analysis Request ===');
//     console.log('Resume length:', resumeText.length, 'characters');
//     console.log('Job description length:', jobDescText.length, 'characters');
//     console.log('Timestamp:', new Date().toISOString());

//     // Analyze resume against job description
//     const analysis = await analyzeResumeAndJob(resumeText, jobDescText);

//     console.log('Analysis completed successfully');
//     console.log('=== End Resume Analysis ===\n');

//     res.json({
//       message: 'Resume and job analysis completed successfully',
//       analysis: analysis
//     });

//   } catch (error) {
//     console.log('Resume analysis endpoint error:', error);
//     res.status(500).json({ 
//       error: 'Resume analysis failed',
//       details: error.message 
//     });
//   }
// });

// // AI similarity endpoint
// router.post('/similarity', async (req, res) => {
//   try {
//     const { source_sentence, sentences } = req.body;
    
//     // Support both old format (prompt) and new format (source_sentence + sentences)
//     if (!source_sentence && !req.body.prompt) {
//       return res.status(400).json({ 
//         error: 'Either "source_sentence" and "sentences" OR "prompt" is required in request body' 
//       });
//     }

//     console.log('\n=== AI Request ===');
//     console.log('Timestamp:', new Date().toISOString());
    
//     let aiResponse;
//     let responseContent;

//     if (source_sentence && sentences) {
//       // Direct sentence similarity
//       aiResponse = await aiQuery({ 
//         inputs: {
//           source_sentence: source_sentence,
//           sentences: sentences
//         }
//       });
      
//       // Format similarity scores
//       if (Array.isArray(aiResponse) && aiResponse.length > 0) {
//         const results = aiResponse.map((score, index) => ({
//           sentence: sentences[index],
//           similarity: (score * 100).toFixed(2) + '%'
//         }));
        
//         responseContent = {
//           source: source_sentence,
//           comparisons: results,
//           most_similar: results.reduce((max, current) => 
//             parseFloat(current.similarity) > parseFloat(max.similarity) ? current : max
//           )
//         };
//       } else {
//         responseContent = 'No similarity scores generated';
//       }

//     } else if (req.body.prompt) {
//       // Convert prompt to similarity comparison (for backward compatibility)
//       const prompt = req.body.prompt;
//       console.log('Prompt (converted to similarity):', prompt);
      
//       // Create some default comparison sentences for demo
//       const defaultSentences = [
//         "Software engineering skills and experience",
//         "Data science and machine learning expertise", 
//         "Web development and programming abilities",
//         "Project management and leadership skills",
//         "Technical problem-solving capabilities"
//       ];
      
//       aiResponse = await aiQuery({ 
//         inputs: {
//           source_sentence: prompt,
//           sentences: defaultSentences
//         }
//       });
      
//       if (Array.isArray(aiResponse) && aiResponse.length > 0) {
//         const bestMatch = defaultSentences[aiResponse.indexOf(Math.max(...aiResponse))];
//         const bestScore = (Math.max(...aiResponse) * 100).toFixed(2);
//         responseContent = `Your prompt "${prompt}" is most similar to: "${bestMatch}" (${bestScore}% similarity)`;
//       } else {
//         responseContent = 'Unable to find similarities';
//       }
//     }

//     console.log('=== End AI Request ===\n');

//     res.json({
//       message: 'Sentence similarity analysis completed',
//       response: responseContent,
//       source: 'sentence-transformers',
//       model: 'all-MiniLM-L6-v2'
//     });
//   } catch (error) {
//     console.log('AI endpoint error:', error);
//     res.status(500).json({ 
//       error: 'Sentence similarity analysis failed',
//       details: error.message 
//     });
//   }
// });

// module.exports = router;