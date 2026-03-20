import { useState } from 'react'
import axios from 'axios'
import PuterChatbot from './PuterChatbot'
import './App.css'
import './PuterChatbot.css'

function App() {
  const [activeTab, setActiveTab] = useState('analyze')

  // ── Resume Analysis State ──
  const [selectedFile, setSelectedFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ── Cover Letter State ──
  const [coverLetterResumeFile, setCoverLetterResumeFile] = useState(null)
  const [coverLetterJobDesc, setCoverLetterJobDesc] = useState('')
  const [coverLetterResult, setCoverLetterResult] = useState(null)
  const [coverLetterLoading, setCoverLetterLoading] = useState(false)
  const [coverLetterTone, setCoverLetterTone] = useState('professional')
  const [coverLetterError, setCoverLetterError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  // ── Handlers: Analysis ──
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setSelectedFile(file); setError('')
    } else {
      setError('Please select a PDF or DOCX file'); setSelectedFile(null)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile || !jobDescription.trim()) { setError('Please upload a resume and enter a job description'); return }
    setLoading(true); setError('')
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('jobDescText', jobDescription)
      const response = await axios.post('http://localhost:5000/upload-and-analyze', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      setAnalysisResult(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during analysis')
    } finally { setLoading(false) }
  }

  // ── Handlers: Cover Letter ──
  const handleCoverLetterFileChange = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setCoverLetterResumeFile(file); setCoverLetterError('')
    } else {
      setCoverLetterError('Please select a PDF or DOCX file'); setCoverLetterResumeFile(null)
    }
  }

  const handleGenerateCoverLetter = async () => {
    if (!coverLetterResumeFile || !coverLetterJobDesc.trim()) { setCoverLetterError('Please upload a resume and enter a job description'); return }
    setCoverLetterLoading(true); setCoverLetterError(''); setCoverLetterResult(null)
    try {
      const formData = new FormData()
      formData.append('file', coverLetterResumeFile)
      const extractResponse = await axios.post('http://localhost:5000/upload/extract-text', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      const resumeText = extractResponse.data.extractedText
      const response = await axios.post('http://localhost:5000/upload/generate-cover-letter', { resumeText, jobDescription: coverLetterJobDesc, tone: coverLetterTone })
      setCoverLetterResult(response.data)
    } catch (err) {
      setCoverLetterError(err.response?.data?.error || 'An error occurred during cover letter generation')
    } finally { setCoverLetterLoading(false) }
  }

  const handleCopyToClipboard = async () => {
    if (coverLetterResult?.coverLetter) {
      try {
        await navigator.clipboard.writeText(coverLetterResult.coverLetter)
        setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000)
      } catch { setCoverLetterError('Failed to copy to clipboard') }
    }
  }

  const handleDownloadPDF = async () => {
    if (!coverLetterResult?.coverLetter) { setCoverLetterError('No cover letter available to download'); return }
    try {
      const response = await axios.post('http://localhost:5000/upload/download-cover-letter-pdf', {
        coverLetterText: coverLetterResult.coverLetter,
        metadata: { date: new Date().toLocaleDateString(), tone: coverLetterTone, generatedAt: coverLetterResult.metadata?.generatedAt }
      }, { responseType: 'blob', headers: { 'Content-Type': 'application/json' } })
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url; link.download = `CoverLetter_${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(link); link.click()
      document.body.removeChild(link); window.URL.revokeObjectURL(url)
    } catch (err) {
      setCoverLetterError(err.response?.data?.error || 'Failed to download PDF. Please try again.')
    }
  }

  const scorePercent = analysisResult ? Math.round(analysisResult.overallScore * 100) : 0
  const scoreColor = scorePercent >= 70 ? '#22c55e' : scorePercent >= 45 ? '#f59e0b' : '#ef4444'

  return (
    <div className="app">
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* ── Header ── */}
      <header className="app-header">
        <div className="logo-chip">
          <span className="logo-dot" />
          AI-Powered
        </div>
        <h1>Resume <span className="grad-text">Intelligence</span> Suite</h1>
        <p>Analyze your skills against any job — then craft a cover letter that gets you noticed.</p>
      </header>

      {/* ── Tab Bar ── */}
      <nav className="tab-bar">
        <button className={`tab-btn ${activeTab === 'analyze' ? 'tab-active' : ''}`} onClick={() => setActiveTab('analyze')}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 3h12M2 6.5h8M2 10h10M2 13.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          Resume Analyzer
          {analysisResult && <span className="tab-badge">✓</span>}
        </button>
        <button className={`tab-btn ${activeTab === 'cover' ? 'tab-active' : ''}`} onClick={() => setActiveTab('cover')}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="2" y="1.5" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M5 5.5h6M5 8h4M5 10.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          Cover Letter
          {coverLetterResult && <span className="tab-badge">✓</span>}
        </button>
      </nav>

      {/* ══════════════ ANALYZE TAB ══════════════ */}
      {activeTab === 'analyze' && (
        <div className="tab-panel">
          {!analysisResult ? (
            <div className="panel-card">
              <div className="panel-card-header">
                <h2>Skill Match Analysis</h2>
                <p>Upload your resume and paste a job description to get an instant AI-powered compatibility report.</p>
              </div>
              <div className="form-row">
                <div className="form-col">
                  <span className="field-label">Resume File</span>
                  <label className="drop-zone" htmlFor="resume-upload">
                    <div className="drop-zone-inner">
                      <div className="drop-icon">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                          <path d="M12 16V8M12 8l-3 3M12 8l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 16.5v1A2.5 2.5 0 005.5 20h13a2.5 2.5 0 002.5-2.5v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </div>
                      {selectedFile
                        ? <><span className="drop-filename">{selectedFile.name}</span><span className="drop-sub">Ready to analyze</span></>
                        : <><span className="drop-title">Click to upload</span><span className="drop-sub">PDF or DOCX supported</span></>
                      }
                    </div>
                    <input id="resume-upload" type="file" accept=".pdf,.docx" onChange={handleFileChange} style={{ display: 'none' }} />
                  </label>
                  {selectedFile && <div className="file-pill"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> {selectedFile.name}</div>}
                </div>
                <div className="form-col form-col-grow">
                  <label className="field-label" htmlFor="job-description">Job Description</label>
                  <textarea id="job-description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here — required skills, responsibilities, qualifications…"
                    className="field-textarea" rows={9} />
                </div>
              </div>
              {error && <div className="alert alert-error">{error}</div>}
              <button onClick={handleAnalyze} disabled={loading || !selectedFile || !jobDescription.trim()} className="btn-primary">
                {loading ? <><span className="spinner" />Analyzing…</> : <>Run Analysis <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></>}
              </button>
            </div>
          ) : (
            <div className="results-layout">
              {/* Score Banner */}
              <div className="score-banner">
                <div className="score-left">
                  <div className="score-ring">
                    <svg viewBox="0 0 80 80" width="80" height="80">
                      <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7"/>
                      <circle cx="40" cy="40" r="32" fill="none" stroke={scoreColor} strokeWidth="7"
                        strokeDasharray={`${2 * Math.PI * 32 * scorePercent / 100} ${2 * Math.PI * 32}`}
                        strokeLinecap="round"
                        transform="rotate(-90 40 40)"
                      />
                    </svg>
                    <span className="ring-num" style={{ color: scoreColor }}>{scorePercent}%</span>
                  </div>
                  <div className="score-info">
                    <div className="score-title">Overall Match</div>
                    <div className="score-sub">{scorePercent >= 70 ? 'Strong match — apply with confidence' : scorePercent >= 45 ? 'Decent match — a few gaps to address' : 'Low match — significant skills missing'}</div>
                  </div>
                </div>
                <button className="btn-ghost" onClick={() => { setAnalysisResult(null); setSelectedFile(null); setJobDescription(''); }}>
                  ↩ New Analysis
                </button>
              </div>

              {/* Results Grid */}
              <div className="results-grid">
                {analysisResult.primary_assessment && (
                  <div className="rcard rcard-wide">
                    <div className="rcard-label">AI Assessment</div>
                    <p className="rcard-body">{analysisResult.primary_assessment}</p>
                  </div>
                )}
                {analysisResult.skillMatches?.matched?.length > 0 && (
                  <div className="rcard">
                    <div className="rcard-label">Matched Skills <span className="count-badge count-green">{analysisResult.skillMatches.matched.length}</span></div>
                    <div className="tag-cloud">
                      {analysisResult.skillMatches.matched.map((s, i) => <span key={i} className="tag tag-green">{s}</span>)}
                    </div>
                  </div>
                )}
                {analysisResult.skillMatches?.missing?.length > 0 && (
                  <div className="rcard">
                    <div className="rcard-label">Skills to Develop <span className="count-badge count-red">{analysisResult.skillMatches.missing.length}</span></div>
                    <div className="tag-cloud">
                      {analysisResult.skillMatches.missing.map((s, i) => <span key={i} className="tag tag-red">{s}</span>)}
                    </div>
                  </div>
                )}
                {analysisResult.roleFitness?.map((rf, i) => (
                  <div key={i} className="rcard rcard-wide">
                    <div className="rcard-label role-header-row">
                      {rf.role}
                      <span className="fitness-pill" style={{
                        background: rf.fitness_score >= 70 ? 'rgba(34,197,94,0.12)' : rf.fitness_score >= 45 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.1)',
                        color: rf.fitness_score >= 70 ? '#4ade80' : rf.fitness_score >= 45 ? '#fcd34d' : '#fca5a5',
                        border: `1px solid ${rf.fitness_score >= 70 ? 'rgba(34,197,94,0.25)' : rf.fitness_score >= 45 ? 'rgba(245,158,11,0.22)' : 'rgba(239,68,68,0.2)'}`
                      }}>{rf.fitness_score}% · {rf.fitness_level}</span>
                    </div>
                    <p className="rcard-body">{rf.analysis}</p>
                    <div className="role-tags-row">
                      {rf.matched_skills?.map((s, si) => <span key={si} className="tag tag-green">{s}</span>)}
                      {rf.missing_skills?.map((s, si) => <span key={si} className="tag tag-red">{s}</span>)}
                    </div>
                  </div>
                ))}
                {analysisResult.recommendations?.length > 0 && (
                  <div className="rcard rcard-wide">
                    <div className="rcard-label">Recommendations</div>
                    <div className="rlist">{analysisResult.recommendations.map((r, i) => <div key={i} className="rlist-item rlist-amber">{r}</div>)}</div>
                  </div>
                )}
                {analysisResult.careerAdvice?.length > 0 && (
                  <div className="rcard">
                    <div className="rcard-label">Career Advice</div>
                    <div className="rlist">{analysisResult.careerAdvice.map((a, i) => <div key={i} className="rlist-item rlist-blue">{a}</div>)}</div>
                  </div>
                )}
                {analysisResult.learningPriorities?.length > 0 && (
                  <div className="rcard">
                    <div className="rcard-label">Learning Priorities</div>
                    <div className="rlist">{analysisResult.learningPriorities.map((p, i) => <div key={i} className="rlist-item rlist-purple">{p}</div>)}</div>
                  </div>
                )}
                {analysisResult.interviewTips?.length > 0 && (
                  <div className="rcard rcard-wide">
                    <div className="rcard-label">Interview Preparation</div>
                    <div className="rlist">{analysisResult.interviewTips.map((t, i) => <div key={i} className="rlist-item rlist-blue">{t}</div>)}</div>
                  </div>
                )}
              </div>

              <div className="cta-bridge">
                <p>Ready to apply? Generate a tailored cover letter using this analysis.</p>
                <button className="btn-primary btn-inline" onClick={() => setActiveTab('cover')}>
                  Generate Cover Letter →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════ COVER LETTER TAB ══════════════ */}
      {activeTab === 'cover' && (
        <div className="tab-panel">
          {!coverLetterResult ? (
            <div className="panel-card">
              <div className="panel-card-header">
                <h2>Cover Letter Generator</h2>
                <p>Upload your resume and a job description — receive a tailored, professional cover letter in seconds.</p>
              </div>
              <div className="form-row">
                <div className="form-col">
                  <span className="field-label">Resume File</span>
                  <label className="drop-zone" htmlFor="cl-resume-upload">
                    <div className="drop-zone-inner">
                      <div className="drop-icon">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                          <path d="M12 16V8M12 8l-3 3M12 8l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 16.5v1A2.5 2.5 0 005.5 20h13a2.5 2.5 0 002.5-2.5v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </div>
                      {coverLetterResumeFile
                        ? <><span className="drop-filename">{coverLetterResumeFile.name}</span><span className="drop-sub">Ready</span></>
                        : <><span className="drop-title">Click to upload</span><span className="drop-sub">PDF or DOCX supported</span></>
                      }
                    </div>
                    <input id="cl-resume-upload" type="file" accept=".pdf,.docx" onChange={handleCoverLetterFileChange} style={{ display: 'none' }} />
                  </label>
                  {coverLetterResumeFile && <div className="file-pill"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> {coverLetterResumeFile.name}</div>}

                  <span className="field-label" style={{ marginTop: 28, display: 'block' }}>Writing Tone</span>
                  <div className="tone-grid">
                    {['professional', 'enthusiastic', 'concise', 'formal'].map(t => (
                      <button key={t} className={`tone-chip ${coverLetterTone === t ? 'tone-active' : ''}`}
                        onClick={() => setCoverLetterTone(t)} disabled={coverLetterLoading}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-col form-col-grow">
                  <label className="field-label" htmlFor="cl-job-desc">Job Description</label>
                  <textarea id="cl-job-desc" value={coverLetterJobDesc} onChange={(e) => setCoverLetterJobDesc(e.target.value)}
                    placeholder="Paste the job description here…" className="field-textarea" rows={11} />
                </div>
              </div>
              {coverLetterError && <div className="alert alert-error">{coverLetterError}</div>}
              <button onClick={handleGenerateCoverLetter} disabled={coverLetterLoading || !coverLetterResumeFile || !coverLetterJobDesc.trim()} className="btn-primary">
                {coverLetterLoading ? <><span className="spinner" />Generating…</> : <>Generate Cover Letter <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></>}
              </button>
            </div>
          ) : (
            <div className="cl-result-layout">
              <div className="cl-result-header">
                <div>
                  <h2>Your Cover Letter</h2>
                  <div className="cl-meta">
                    <span className="meta-pill meta-blue">{coverLetterResult.metadata?.wordCount || 0} words</span>
                    <span className="meta-pill meta-purple">{coverLetterResult.metadata?.tone || coverLetterTone}</span>
                  </div>
                </div>
                <button className="btn-ghost" onClick={() => setCoverLetterResult(null)}>↩ Edit & Regenerate</button>
              </div>
              <div className="cl-body">
                <pre className="cl-text">{coverLetterResult.coverLetter}</pre>
              </div>
              {coverLetterError && <div className="alert alert-error">{coverLetterError}</div>}
              <div className="cl-actions">
                <button onClick={handleCopyToClipboard} disabled={coverLetterLoading} className="btn-action btn-green">
                  {copySuccess ? '✓ Copied!' : 'Copy to Clipboard'}
                </button>
                <button onClick={handleDownloadPDF} disabled={coverLetterLoading} className="btn-action btn-red">
                  Download PDF
                </button>
                <button onClick={handleGenerateCoverLetter} disabled={coverLetterLoading || !coverLetterResumeFile || !coverLetterJobDesc.trim()} className="btn-action btn-amber">
                  {coverLetterLoading ? 'Regenerating…' : 'Regenerate'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="app-footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Resume Intelligence Suite</div>
            <p>AI-powered resume analysis and cover letter generation to accelerate your job search.</p>
          </div>
          <div>
            <div className="footer-heading">Features</div>
            <ul>
              <li>Smart Resume Analysis</li>
              <li>AI Cover Letter Generation</li>
              <li>PDF Downloads</li>
              <li>Real-time Career Insights</li>
              <li>ATS Optimization Tips</li>
            </ul>
          </div>
          <div>
            <div className="footer-heading">How It Works</div>
            <ul>
              <li>Upload resume (PDF / DOCX)</li>
              <li>Paste the job description</li>
              <li>Get instant AI analysis</li>
              <li>Generate tailored cover letter</li>
              <li>Download &amp; apply</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          Powered by Google Gemini AI · {new Date().getFullYear()}
        </div>
      </footer>

      <PuterChatbot userAnalysisContext={analysisResult} />
    </div>
  )
}

export default App