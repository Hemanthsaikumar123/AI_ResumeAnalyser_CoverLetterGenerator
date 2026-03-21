const express                   = require('express');
const router                    = express.Router();
const { uploadMiddleware }      = require('../middleware/uploadMiddleware');
const {
  extractText,
  generateCoverLetter,
  downloadCoverLetterPDF,
}                               = require('../controllers/uploadController');

// POST /upload/extract-text
// Accepts: multipart/form-data  { file }
router.post('/extract-text', uploadMiddleware.single('file'), extractText);

// POST /upload/generate-cover-letter
// Accepts: application/json  { resumeText, jobDescription, tone }
router.post('/generate-cover-letter', generateCoverLetter);

// POST /upload/download-cover-letter-pdf
// Accepts: application/json  { coverLetterText, metadata }
// Returns: application/pdf blob
router.post('/download-cover-letter-pdf', downloadCoverLetterPDF);

module.exports = router;



















// const express = require('express');
// const router = express.Router();
// const { uploadMiddleware } = require('../middleware/upload');
// const { parseResume } = require('../services/resumeParser');
// const { analyzeResumeAndJob } = require('../services/analysisService');
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { generateCoverLetterPDF, generatePDFFilename } = require('../services/pdfService');
// require('dotenv').config();

// // Initialize the Google Generative AI client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // File upload endpoint (with optional analysis)
// router.post('/', (req, res) => {
//   uploadMiddleware.single('file')(req, res, async (err) => {
//     try {
//       // Handle multer errors
//       if (err) {
//         if (err.code === 'UNEXPECTED_FIELD') {
//           return res.status(400).json({ 
//             error: 'Unexpected field name. Please use "file" as the field name in form-data',
//             details: 'Make sure to set the key as "file" and select "File" type in Postman'
//           });
//         }
//         if (err.code === 'LIMIT_FILE_SIZE') {
//           return res.status(400).json({ 
//             error: 'File too large. Maximum size is 10MB' 
//           });
//         }
//         if (err.message.includes('Only PDF and DOCX files are allowed')) {
//           return res.status(400).json({ 
//             error: 'Invalid file type. Only PDF and DOCX files are allowed' 
//           });
//         }
//         return res.status(500).json({ 
//           error: 'Upload failed',
//           details: err.message 
//         });
//       }

//       if (!req.file) {
//         return res.status(400).json({ 
//           error: 'No file uploaded' 
//         });
//       }

//       // Parse the uploaded resume
//       const extractedText = await parseResume(req.file.path);

//       // Check if job description is provided for analysis
//       const { jobDescText } = req.body;
      
//       if (jobDescText && typeof jobDescText === 'string') {
//         // Perform analysis if job description is provided
//         console.log('=== Starting Upload and Analysis ===');
//         console.log('Resume uploaded:', req.file.originalname);
//         console.log('Job description length:', jobDescText.length);

//         const analysis = await analyzeResumeAndJob(extractedText, jobDescText);

//         console.log('Analysis completed successfully');
//         console.log('=== End Upload and Analysis ===\n');

//         res.json({
//           filePath: req.file.path,
//           fileName: req.file.originalname,
//           message: 'Resume uploaded, parsed, and analyzed successfully',
//           resumeText: extractedText,
//           analysis: analysis,
//           overallScore: analysis.overallScore,
//           skillMatches: analysis.skillMatches,
//           recommendations: analysis.recommendations
//         });
//       } else {
//         // Just return parsed text if no job description
//         res.json({
//           filePath: req.file.path,
//           message: 'File uploaded and parsed successfully',
//           extractedText: extractedText
//         });
//       }
//     } catch (error) {
//       res.status(500).json({ 
//         error: 'File upload or processing failed',
//         details: error.message 
//       });
//     }
//   });
// });

// // Upload resume and analyze against job description
// router.post('/analyze', (req, res) => {
//   uploadMiddleware.single('file')(req, res, async (err) => {
//     try {
//       // Handle multer errors
//       if (err) {
//         if (err.code === 'UNEXPECTED_FIELD') {
//           return res.status(400).json({ 
//             error: 'Unexpected field name. Please use "file" as the field name in form-data',
//             details: 'Make sure to set the key as "file" and select "File" type in Postman'
//           });
//         }
//         if (err.code === 'LIMIT_FILE_SIZE') {
//           return res.status(400).json({ 
//             error: 'File too large. Maximum size is 10MB' 
//           });
//         }
//         if (err.message.includes('Only PDF and DOCX files are allowed')) {
//           return res.status(400).json({ 
//             error: 'Invalid file type. Only PDF and DOCX files are allowed' 
//           });
//         }
//         return res.status(500).json({ 
//           error: 'Upload failed',
//           details: err.message 
//         });
//       }

//       if (!req.file) {
//         return res.status(400).json({ 
//           error: 'No file uploaded' 
//         });
//       }

//       // Get job description from form data
//       const { jobDescText } = req.body;
      
//       if (!jobDescText || typeof jobDescText !== 'string') {
//         return res.status(400).json({ 
//           error: 'jobDescText is required in form data and must be a string' 
//         });
//       }

//       if (jobDescText.trim().length === 0) {
//         return res.status(400).json({ 
//           error: 'jobDescText cannot be empty' 
//         });
//       }

//       console.log('\n=== Upload and Analysis Request ===');
//       console.log('File:', req.file.originalname);
//       console.log('File size:', req.file.size, 'bytes');
//       console.log('Job description length:', jobDescText.length, 'characters');
//       console.log('Timestamp:', new Date().toISOString());

//       // Parse the uploaded resume
//       const resumeText = await parseResume(req.file.path);
//       console.log('Resume parsed, text length:', resumeText.length, 'characters');

//       // Analyze resume against job description
//       const analysis = await analyzeResumeAndJob(resumeText, jobDescText);

//       console.log('Analysis completed successfully');
//       console.log('=== End Upload and Analysis ===\n');

//       res.json({
//         filePath: req.file.path,
//         fileName: req.file.originalname,
//         message: 'Resume uploaded, parsed, and analyzed successfully',
//         resumeText: resumeText,
//         analysis: analysis
//       });

//     } catch (error) {
//       console.log('Upload and analysis error:', error);
//       res.status(500).json({ 
//         error: 'Upload and analysis failed',
//         details: error.message 
//       });
//     }
//   });
// });

// // Dedicated endpoint for resume text extraction (used by cover letter feature)
// router.post('/extract-text', (req, res) => {
//   uploadMiddleware.single('file')(req, res, async (err) => {
//     try {
//       // Handle multer errors
//       if (err) {
//         if (err.code === 'UNEXPECTED_FIELD') {
//           return res.status(400).json({ 
//             error: 'Unexpected field name. Please use "file" as the field name in form-data',
//             details: 'Make sure to set the key as "file" and select "File" type in Postman'
//           });
//         }
//         if (err.code === 'LIMIT_FILE_SIZE') {
//           return res.status(400).json({ 
//             error: 'File too large. Maximum size is 10MB' 
//           });
//         }
//         if (err.message.includes('Only PDF and DOCX files are allowed')) {
//           return res.status(400).json({ 
//             error: 'Invalid file type. Only PDF and DOCX files are allowed' 
//           });
//         }
//         return res.status(500).json({ 
//           error: 'Upload failed',
//           details: err.message 
//         });
//       }

//       if (!req.file) {
//         return res.status(400).json({ 
//           error: 'No file uploaded' 
//         });
//       }

//       console.log('=== Text Extraction Request ===');
//       console.log('File uploaded:', req.file.originalname);
//       console.log('File size:', req.file.size, 'bytes');
//       console.log('File type:', req.file.mimetype);

//       // Extract text from the uploaded resume
//       const extractedText = await parseResume(req.file.path);

//       if (!extractedText || extractedText.trim().length === 0) {
//         return res.status(400).json({ 
//           error: 'Could not extract text from the uploaded file',
//           details: 'The file may be corrupted, password-protected, or contain only images'
//         });
//       }

//       console.log('Text extraction successful');
//       console.log('Extracted text length:', extractedText.length, 'characters');
//       console.log('=== End Text Extraction ===\n');

//       res.json({
//         success: true,
//         message: 'Text extracted successfully from resume',
//         extractedText: extractedText,
//         metadata: {
//           fileName: req.file.originalname,
//           fileSize: req.file.size,
//           characterCount: extractedText.length,
//           wordCount: extractedText.trim().split(/\s+/).length,
//           extractedAt: new Date().toISOString()
//         }
//       });

//     } catch (error) {
//       console.error('Text extraction error:', error);
//       res.status(500).json({ 
//         error: 'Text extraction failed',
//         details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
//       });
//     }
//   });
// });

// // Cover letter generation endpoint
// router.post('/generate-cover-letter', async (req, res) => {
//   try {
//     const { resumeText, jobDescription, tone = 'professional' } = req.body;

//     // Validate required inputs
//     if (!resumeText || !jobDescription) {
//       return res.status(400).json({ 
//         error: 'Both resumeText and jobDescription are required' 
//       });
//     }

//     if (!resumeText.trim() || !jobDescription.trim()) {
//       return res.status(400).json({ 
//         error: 'resumeText and jobDescription cannot be empty' 
//       });
//     }

//     // Validate tone parameter
//     const validTones = ['professional', 'enthusiastic', 'concise', 'formal'];
//     if (!validTones.includes(tone.toLowerCase())) {
//       return res.status(400).json({ 
//         error: `Invalid tone. Must be one of: ${validTones.join(', ')}` 
//       });
//     }

//     console.log('Generating cover letter with Gemini AI...');
//     console.log(`Resume length: ${resumeText.length} characters`);
//     console.log(`Job description length: ${jobDescription.length} characters`);
//     console.log(`Requested tone: ${tone}`);

//     // Get the Gemini model
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Create the prompt for cover letter generation
//     const prompt = `
// You are an expert career assistant integrated into a resume analyzer web app.  
// Your task: generate a personalized, professional cover letter for a candidate based on their resume and a given job description.

// **Resume Text:**
// ---
// ${resumeText}
// ---

// **Job Description:**
// ---
// ${jobDescription}
// ---

// **Requested Tone:** ${tone}

// **Requirements for output:**
// 1. Include a proper greeting (e.g., "Dear Hiring Manager").
// 2. Opening paragraph: express enthusiasm for the role and reference the company/position from the job description.
// 3. Middle paragraphs: highlight candidate's top 2–3 skills/achievements from the resume that best match the job description.
// 4. Explain why the candidate is a strong fit for this role based on the specific requirements mentioned.
// 5. Closing paragraph: polite call-to-action, e.g., "I look forward to the opportunity to discuss my qualifications."
// 6. Maintain requested tone (${tone}).
// 7. Keep the cover letter between 250-400 words.
// 8. Make it specific to this job - avoid generic language.

// **Important:** Return ONLY the cover letter text in plain format. Do not include any explanations, formatting instructions, or additional commentary. The output should be ready to copy and paste into an email or document.
// `;

//     // Generate the cover letter
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const coverLetterText = response.text();

//     if (!coverLetterText || coverLetterText.trim().length === 0) {
//       throw new Error('Generated cover letter is empty');
//     }

//     console.log('Cover letter generated successfully');
//     console.log(`Generated cover letter length: ${coverLetterText.length} characters`);

//     // Return the cover letter
//     res.json({
//       success: true,
//       message: 'Cover letter generated successfully',
//       coverLetter: coverLetterText.trim(),
//       metadata: {
//         tone: tone,
//         wordCount: coverLetterText.trim().split(/\s+/).length,
//         characterCount: coverLetterText.trim().length,
//         generatedAt: new Date().toISOString()
//       }
//     });

//   } catch (error) {
//     console.error('Cover letter generation error:', error);
    
//     // Handle specific Google AI errors
//     if (error.message && error.message.includes('API key')) {
//       return res.status(500).json({ 
//         error: 'AI service configuration error',
//         details: 'Please check API key configuration'
//       });
//     }
    
//     if (error.message && error.message.includes('quota')) {
//       return res.status(429).json({ 
//         error: 'AI service quota exceeded',
//         details: 'Please try again later'
//       });
//     }

//     if (error.message && error.message.includes('safety')) {
//       return res.status(400).json({ 
//         error: 'Content safety violation',
//         details: 'The provided content violates safety guidelines'
//       });
//     }

//     // Generic error response
//     res.status(500).json({ 
//       error: 'Cover letter generation failed',
//       details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
//     });
//   }
// });

// // PDF Download endpoint for cover letters
// router.post('/download-cover-letter-pdf', async (req, res) => {
//   console.log('📄 === Cover Letter PDF Download Request ===');
  
//   try {
//     const { coverLetterText, metadata } = req.body;

//     // Validate input
//     if (!coverLetterText || typeof coverLetterText !== 'string') {
//       console.log('❌ Validation failed: Missing or invalid cover letter text');
//       return res.status(400).json({ 
//         success: false, 
//         error: 'Cover letter text is required and must be a string' 
//       });
//     }

//     if (coverLetterText.trim().length < 50) {
//       console.log('❌ Validation failed: Cover letter text too short');
//       return res.status(400).json({ 
//         success: false, 
//         error: 'Cover letter text is too short (minimum 50 characters)' 
//       });
//     }

//     console.log(`📝 Generating PDF for cover letter (${coverLetterText.length} characters)`);

//     // Generate PDF
//     const pdfBuffer = await generateCoverLetterPDF(coverLetterText, metadata);
    
//     // Generate filename
//     const filename = generatePDFFilename(metadata);
    
//     console.log(`✅ PDF generated successfully: ${filename}`);

//     // Set response headers for PDF download
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
//     res.setHeader('Content-Length', pdfBuffer.length);
    
//     // Send PDF buffer
//     res.send(pdfBuffer);
    
//     console.log('📤 PDF sent to client successfully');

//   } catch (error) {
//     console.error('❌ Cover letter PDF generation error:', error);
    
//     res.status(500).json({
//       success: false,
//       error: process.env.NODE_ENV === 'development' 
//         ? `PDF generation failed: ${error.message}`
//         : 'Failed to generate PDF. Please try again.'
//     });
//   }
// });

// module.exports = router;