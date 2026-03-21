const resumeParserService  = require('../services/resumeParseService');
const analysisService      = require('../services/analysisService');

/**
 * POST /upload-and-analyze
 * Body  : multipart/form-data  { file (PDF/DOCX), jobDescText (string) }
 * Returns full analysis result consumed by the frontend Analyze tab.
 */
const analyzeResume = async (req, res) => {
  try {
    // ── 1. Validate file ──────────────────────────────────────────────────
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // ── 2. Validate job description ───────────────────────────────────────
    const { jobDescText } = req.body;
    if (!jobDescText?.trim()) {
      return res.status(400).json({ error: 'jobDescText is required' });
    }

    console.log('\n=== Resume Analysis Request ===');
    console.log('File    :', req.file.originalname, `(${req.file.size} bytes)`);
    console.log('Job desc:', jobDescText.length, 'chars');

    // ── 3. Extract text from resume ───────────────────────────────────────
    const resumeText = await resumeParserService.parseResume(req.file.path);
    if (!resumeText?.trim()) {
      return res.status(400).json({
        error: 'Could not extract text from resume. The file may be corrupted or image-only.',
      });
    }

    // ── 4. Run AI analysis ────────────────────────────────────────────────
    const analysis = await analysisService.analyzeResumeAndJob(resumeText, jobDescText);

    console.log('Analysis complete');
    console.log('=== End Resume Analysis ===\n');

    // ── 5. Respond — shape matches what App.jsx expects ──────────────────
    res.json({
      message:            'Resume analyzed successfully',
      fileName:           req.file.originalname,
      resumeText,
      overallScore:       analysis.overallScore,
      skillMatches:       analysis.skillMatches,
      primary_assessment: analysis.primary_assessment,
      careerAdvice:       analysis.career_advice,
      learningPriorities: analysis.learning_priorities,
      interviewTips:      analysis.interview_tips,
      recommendations:    analysis.recommendations,
      experienceLevel:    analysis.experienceLevel,
      roleType:           analysis.roleType,
      jobTitle:           analysis.jobTitle,
    });

  } catch (error) {
    console.error('analyzeResume error:', error.message);
    res.status(500).json({ error: 'Resume analysis failed', details: error.message });
  }
};

module.exports = { analyzeResume };