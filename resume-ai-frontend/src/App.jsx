import { useState } from 'react'
import axios from 'axios'
import PuterChatbot from './PuterChatbot'
import './App.css'
import './PuterChatbot.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Cover Letter Generation State - Independent of Analysis
  const [coverLetterResumeFile, setCoverLetterResumeFile] = useState(null)
  const [coverLetterJobDesc, setCoverLetterJobDesc] = useState('')
  const [coverLetterResult, setCoverLetterResult] = useState(null)
  const [coverLetterLoading, setCoverLetterLoading] = useState(false)
  const [coverLetterTone, setCoverLetterTone] = useState('professional')
  const [coverLetterError, setCoverLetterError] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setSelectedFile(file)
      setError('')
    } else {
      setError('Please select a PDF or DOCX file')
      setSelectedFile(null)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile || !jobDescription.trim()) {
      setError('Please upload a resume and enter a job description')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('jobDescText', jobDescription)

      const response = await axios.post('http://localhost:5000/upload-and-analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setAnalysisResult(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during analysis')
    } finally {
      setLoading(false)
    }
  }

  const handleCoverLetterFileChange = (event) => {
    const file = event.target.files[0]
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setCoverLetterResumeFile(file)
      setCoverLetterError('')
    } else {
      setCoverLetterError('Please select a PDF or DOCX file for your resume')
      setCoverLetterResumeFile(null)
    }
  }

  const handleGenerateCoverLetter = async () => {
    if (!coverLetterResumeFile || !coverLetterJobDesc.trim()) {
      setCoverLetterError('Please upload a resume and enter a job description')
      return
    }

    setCoverLetterLoading(true)
    setCoverLetterError('')
    setCoverLetterResult(null)

    try {
      console.log('Extracting text from resume for cover letter...')
      
      // First, extract text from the resume file using dedicated endpoint
      const formData = new FormData()
      formData.append('file', coverLetterResumeFile)

      const extractResponse = await axios.post('http://localhost:5000/upload/extract-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const resumeText = extractResponse.data.extractedText

      console.log('Generating cover letter...')
      const response = await axios.post('http://localhost:5000/upload/generate-cover-letter', {
        resumeText: resumeText,
        jobDescription: coverLetterJobDesc,
        tone: coverLetterTone
      })

      setCoverLetterResult(response.data)
      console.log('Cover letter generated successfully:', response.data)
    } catch (err) {
      console.error('Cover letter generation error:', err)
      setCoverLetterError(err.response?.data?.error || 'An error occurred during cover letter generation')
    } finally {
      setCoverLetterLoading(false)
    }
  }

  const handleCopyToClipboard = async () => {
    if (coverLetterResult?.coverLetter) {
      try {
        await navigator.clipboard.writeText(coverLetterResult.coverLetter)
        console.log('Cover letter copied to clipboard')
        // Clear any previous errors to show success
        setCoverLetterError('')
      } catch (err) {
        console.error('Failed to copy to clipboard:', err)
        setCoverLetterError('Failed to copy to clipboard')
      }
    }
  }

  // Add PDF download function after handleCopyToClipboard
  const handleDownloadPDF = async () => {
    if (!coverLetterResult?.coverLetter) {
      setCoverLetterError('No cover letter available to download');
      return;
    }

    try {
      console.log('📄 Downloading cover letter as PDF...');
      
      const response = await axios.post('http://localhost:5000/upload/download-cover-letter-pdf', {
        coverLetterText: coverLetterResult.coverLetter,
        metadata: {
          date: new Date().toLocaleDateString(),
          tone: coverLetterTone,
          generatedAt: coverLetterResult.metadata?.generatedAt
        }
      }, {
        responseType: 'blob', // Important for handling binary data
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Create blob and download link
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create temporary download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `CoverLetter_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('✅ PDF downloaded successfully');
      setCoverLetterError(''); // Clear any previous errors

    } catch (error) {
      console.error('❌ PDF download error:', error);
      setCoverLetterError(
        error.response?.data?.error || 'Failed to download PDF. Please try again.'
      );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🤖 AI Resume Analyzer and Cover Letter Generator</h1>
        <p>Upload your resume and job description to get AI-powered insights and required cover letter</p>
      </header>

      <main className="app-main">
        <div className="upload-section">
          <div className="input-group">
            <label htmlFor="resume-upload" className="upload-label">
              📄 Upload Resume (PDF or DOCX)
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="file-input"
            />
            {selectedFile && (
              <p className="file-selected">✅ {selectedFile.name}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="job-description" className="textarea-label">
              💼 Job Description
            </label>
            <textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here consists of required skills..."
              className="job-textarea"
              rows={8}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !selectedFile || !jobDescription.trim()}
            className="analyze-button"
          >
            {loading ? '🔄 Analyzing...' : '🚀 Analyze Resume'}
          </button>

          {error && <div className="error-message">❌ {error}</div>}
        </div>

        {analysisResult && (
          <div className="results-section">
            <h2>📊 Analysis Results</h2>
            
            <div className="results-grid">
              <div className="result-card">
                <h3>📈 Overall Match Score</h3>
                <div className="score">
                  {Math.round(analysisResult.overallScore * 100)}%
                </div>
              </div>

              {analysisResult.primary_assessment && (
                <div className="result-card">
                  <h3>🎯 AI Assessment</h3>
                  <div className="primary-assessment">
                    {analysisResult.primary_assessment}
                  </div>
                </div>
              )}

              {analysisResult.roleFitness && analysisResult.roleFitness.length > 0 && (
                <div className="result-card role-fitness">
                  <h3>👔 Role Fitness Analysis</h3>
                  <div className="role-analysis">
                    {analysisResult.roleFitness.map((roleAnalysis, index) => (
                      <div key={index} className="role-item">
                        <div className="role-header">
                          <h4>{roleAnalysis.role}</h4>
                          <span className={`fitness-score ${roleAnalysis.fitness_level.toLowerCase().replace(/\s+/g, '-')}`}>
                            {roleAnalysis.fitness_score}% - {roleAnalysis.fitness_level}
                          </span>
                        </div>
                        <p className="role-analysis-text">{roleAnalysis.analysis}</p>
                        
                        <div className="role-skills">
                          <div className="matched-skills">
                            <strong>✅ Matched Skills ({roleAnalysis.matched_skills.length}):</strong>
                            <div className="skills-list">
                              {roleAnalysis.matched_skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="skill-tag matched">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {roleAnalysis.missing_skills.length > 0 && (
                            <div className="missing-skills">
                              <strong>⚠️ Skills to Develop ({roleAnalysis.missing_skills.length}):</strong>
                              <div className="skills-list">
                                {roleAnalysis.missing_skills.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="skill-tag missing">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="result-card">
                <h3>🎯 Individual Skill Matches</h3>
                <div className="skills-list">
                  {analysisResult.skillMatches?.matched?.map((skill, index) => (
                    <span key={index} className="skill-tag matched">
                      ✅ {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="result-card">
                <h3>⚠️ Additional Skills Needed</h3>
                <div className="skills-list">
                  {analysisResult.skillMatches?.missing?.map((skill, index) => (
                    <span key={index} className="skill-tag missing">
                      ❌ {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="result-card">
                <h3>💡 AI Recommendations</h3>
                <div className="recommendations">
                  {analysisResult.recommendations?.map((rec, index) => (
                    <div key={index} className="recommendation">
                      {rec}
                    </div>
                  ))}
                </div>
              </div>

              {analysisResult.careerAdvice && analysisResult.careerAdvice.length > 0 && (
                <div className="result-card">
                  <h3>🎯 Career Advice</h3>
                  <div className="career-advice">
                    {analysisResult.careerAdvice.map((advice, index) => (
                      <div key={index} className="advice-item">
                        {advice}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysisResult.learningPriorities && analysisResult.learningPriorities.length > 0 && (
                <div className="result-card">
                  <h3>📚 Learning Priorities</h3>
                  <div className="learning-priorities">
                    {analysisResult.learningPriorities.map((priority, index) => (
                      <div key={index} className="priority-item">
                        • {priority}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysisResult.interviewTips && analysisResult.interviewTips.length > 0 && (
                <div className="result-card">
                  <h3>🤝 Interview Preparation</h3>
                  <div className="interview-tips">
                    {analysisResult.interviewTips.map((tip, index) => (
                      <div key={index} className="tip-item">
                        • {tip}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cover Letter Generation Section - Independent Feature */}
        <div className="cover-letter-section">
          <div className="section-header">
            <h2>📝 Generate Cover Letter</h2>
            <p>Create a personalized cover letter by uploading your resume and entering a job description</p>
          </div>

          <div className="cover-letter-form">
            {/* Resume Upload for Cover Letter */}
            <div className="form-group">
              <label htmlFor="cover-letter-resume-upload" className="form-label">
                📄 Upload Your Resume (PDF or DOCX)
              </label>
              <input
                id="cover-letter-resume-upload"
                type="file"
                accept=".pdf,.docx"
                onChange={handleCoverLetterFileChange}
                className="file-input"
              />
              {coverLetterResumeFile && (
                <p className="file-selected">✅ {coverLetterResumeFile.name}</p>
              )}
            </div>

            {/* Job Description for Cover Letter */}
            <div className="form-group">
              <label htmlFor="cover-letter-job-desc" className="form-label">
                💼 Job Description
              </label>
              <textarea
                id="cover-letter-job-desc"
                value={coverLetterJobDesc}
                onChange={(e) => setCoverLetterJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                className="job-textarea"
                rows={6}
              />
            </div>

            {/* Tone Selection */}
            <div className="form-group">
              <label htmlFor="tone-select" className="form-label">
                🎯 Writing Tone:
              </label>
              <select
                id="tone-select"
                value={coverLetterTone}
                onChange={(e) => setCoverLetterTone(e.target.value)}
                className="tone-select"
                disabled={coverLetterLoading}
              >
                <option value="professional">Professional</option>
                <option value="enthusiastic">Enthusiastic</option>
                <option value="concise">Concise</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <button
              onClick={handleGenerateCoverLetter}
              disabled={coverLetterLoading || !coverLetterResumeFile || !coverLetterJobDesc.trim()}
              className="generate-cover-letter-btn"
            >
              {coverLetterLoading ? '✍️ Generating Cover Letter...' : '📝 Generate Cover Letter'}
            </button>

            {/* Cover Letter Error Display */}
            {coverLetterError && (
              <div className="error-message">❌ {coverLetterError}</div>
            )}
          </div>

          {/* Cover Letter Results */}
          {coverLetterResult && (
            <div className="cover-letter-result">
              <div className="result-header">
                <h3>Your Personalized Cover Letter</h3>
                <div className="result-meta">
                  <span className="word-count">
                    📊 {coverLetterResult.metadata?.wordCount || 0} words
                  </span>
                  <span className="tone-badge">
                    🎨 {coverLetterResult.metadata?.tone || coverLetterTone}
                  </span>
                </div>
              </div>

              <div className="cover-letter-content">
                <pre className="cover-letter-text">{coverLetterResult.coverLetter}</pre>
              </div>

              <div className="cover-letter-actions">
                <button
                  onClick={handleCopyToClipboard}
                  className="copy-btn"
                  disabled={coverLetterLoading}
                >
                  📋 Copy to Clipboard
                </button>
                
                <button
                  onClick={handleDownloadPDF}
                  className="download-pdf-btn"
                  disabled={coverLetterLoading}
                >
                  📄 Download PDF
                </button>
                
                <button
                  onClick={handleGenerateCoverLetter}
                  disabled={coverLetterLoading || !coverLetterResumeFile || !coverLetterJobDesc.trim()}
                  className="regenerate-btn"
                >
                  🔄 Regenerate
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AI Resume Analyzer</h3>
            <p>
              Leverage the power of artificial intelligence to enhance your resume and create compelling cover letters that stand out to employers.
            </p>
            <p>
              Our advanced AI technology analyzes your resume against job requirements and provides personalized insights to boost your career prospects.
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Features</h3>
            <ul>
              <li>Smart Resume Analysis</li>
              <li>AI-Powered Cover Letter Generation</li>
              <li>Professional PDF Downloads</li>
              <li>Real-time Career Insights</li>
              <li>Industry-Specific Recommendations</li>
              <li>ATS Optimization Tips</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>How It Works</h3>
            <ul>
              <li>Upload your resume (PDF/DOCX)</li>
              <li>Paste the job description</li>
              <li>Get instant AI analysis</li>
              <li>Generate tailored cover letters</li>
              <li>Download professional PDFs</li>
              <li>Land your dream job!</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            Made with <span className="heart">❤️</span> by AI Resume Analyzer Team • 
            Powered by Google Gemini AI • {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* Floating background shapes */}
      <div className="floating-shapes"></div>

      {/* Puter AI Chatbot - No Backend Required! */}
      <PuterChatbot userAnalysisContext={analysisResult} />
    </div>
  )
}

export default App
