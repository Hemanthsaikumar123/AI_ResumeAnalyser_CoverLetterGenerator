const resumeParserService  = require('../services/resumeParseService');
const coverLetterService   = require('../services/coverLetterService');
const pdfService           = require('../services/pdfService');

// ─────────────────────────────────────────────────────────────────────────────
/**
 * POST /upload/extract-text
 * Body  : multipart/form-data  { file }
 * Used by the Cover Letter tab to extract resume text before generation.
 */
const extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('=== Text Extraction ===');
    console.log('File:', req.file.originalname, `(${req.file.size} bytes)`);

    const extractedText = await resumeParserService.parseResume(req.file.path);

    if (!extractedText?.trim()) {
      return res.status(400).json({
        error:   'Could not extract text from the uploaded file',
        details: 'The file may be corrupted, password-protected, or contain only images',
      });
    }

    console.log('Extracted', extractedText.length, 'chars');
    console.log('=== End Text Extraction ===\n');

    res.json({
      success:       true,
      message:       'Text extracted successfully',
      extractedText,
      metadata: {
        fileName:       req.file.originalname,
        fileSize:       req.file.size,
        characterCount: extractedText.length,
        wordCount:      extractedText.trim().split(/\s+/).length,
        extractedAt:    new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('extractText error:', error.message);
    res.status(500).json({ error: 'Text extraction failed', details: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
/**
 * POST /upload/generate-cover-letter
 * Body  : application/json  { resumeText, jobDescription, tone }
 * Returns generated cover letter text + metadata.
 */
const generateCoverLetter = async (req, res) => {
  try {
    const { resumeText, jobDescription, tone = 'professional' } = req.body;

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return res.status(400).json({ error: 'resumeText and jobDescription are required' });
    }

    const validTones = ['professional', 'enthusiastic', 'concise', 'formal'];
    if (!validTones.includes(tone.toLowerCase())) {
      return res.status(400).json({ error: `tone must be one of: ${validTones.join(', ')}` });
    }

    console.log('=== Cover Letter Generation ===');
    console.log(`Resume: ${resumeText.length} chars | Job: ${jobDescription.length} chars | Tone: ${tone}`);

    const coverLetter = await coverLetterService.generateCoverLetter(resumeText, jobDescription, tone);

    console.log('Generated', coverLetter.length, 'chars');
    console.log('=== End Cover Letter Generation ===\n');

    res.json({
      success:     true,
      message:     'Cover letter generated successfully',
      coverLetter,
      metadata: {
        tone,
        wordCount:      coverLetter.split(/\s+/).length,
        characterCount: coverLetter.length,
        generatedAt:    new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('generateCoverLetter error:', error.message);

    if (error.message?.toLowerCase().includes('rate limit') || error.message?.includes('429')) {
      return res.status(429).json({ error: 'AI rate limit reached. Please wait a minute and retry.' });
    }
    res.status(500).json({ error: 'Cover letter generation failed', details: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
/**
 * POST /upload/download-cover-letter-pdf
 * Body  : application/json  { coverLetterText, metadata }
 * Returns: PDF binary blob  (Content-Type: application/pdf)
 */
const downloadCoverLetterPDF = async (req, res) => {
  try {
    const { coverLetterText, metadata } = req.body;

    if (!coverLetterText || typeof coverLetterText !== 'string' || coverLetterText.trim().length < 50) {
      return res.status(400).json({ error: 'Valid coverLetterText (min 50 chars) is required' });
    }

    console.log('=== PDF Generation ===');

    const pdfBuffer = await pdfService.generateCoverLetterPDF(coverLetterText, metadata);
    const filename  = pdfService.generatePDFFilename(metadata);

    res.setHeader('Content-Type',        'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length',      pdfBuffer.length);
    res.send(pdfBuffer);

    console.log('✅ PDF sent:', filename);
    console.log('=== End PDF Generation ===\n');

  } catch (error) {
    console.error('downloadCoverLetterPDF error:', error.message);
    res.status(500).json({ error: 'PDF generation failed', details: error.message });
  }
};

module.exports = { extractText, generateCoverLetter, downloadCoverLetterPDF };