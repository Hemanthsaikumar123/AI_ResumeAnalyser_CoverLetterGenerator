# AI Resume Analyser

AI Resume Analyser is a full-stack app that compares a resume against a job description, returns AI-based analysis, and can generate a tailored cover letter with PDF download.

## What It Does

- Upload a PDF or DOCX resume
- Extract plain text from the resume
- Analyze resume vs job description using Gemini
- Return skill match summary and recommendations
- Generate a cover letter from resume + job description + tone
- Download generated cover letter as a PDF

## Tech Stack

### Frontend

- React 19
- Vite 7
- Axios
- Recharts

### Backend

- Node.js + Express
- Google Generative AI SDK (`@google/generative-ai`)
- Multer (file uploads)
- `pdf-parse` and `mammoth` (text extraction)
- `html-pdf-node` / `jspdf` (PDF generation)

## Prerequisites

- Node.js 18+
- npm
- Gemini API key from Google AI Studio

## Setup

1. Clone the repository and enter it:

```bash
git clone <your-repo-url>
cd ai-resume-analyser
```

2. Install backend dependencies:

```bash
cd resume-ai-backend
npm install
```

3. Create backend environment file at `resume-ai-backend/.env`:

```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

4. Install frontend dependencies:

```bash
cd ../resume-ai-frontend
npm install
```

## Run Locally

Start backend:

```bash
cd resume-ai-backend
npm run dev
```

Start frontend in a second terminal:

```bash
cd resume-ai-frontend
npm run dev
```

Default URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API Endpoints

### Health

- `GET /health`

### Resume + Analysis

- `POST /upload-and-analyze`
    - `multipart/form-data`
    - fields: `file`, `jobDescText`

### Upload Utilities

- `POST /upload/extract-text`
    - `multipart/form-data`
    - fields: `file`

- `POST /upload/generate-cover-letter`
    - `application/json`
    - body: `{ "resumeText": "...", "jobDescription": "...", "tone": "professional" }`

- `POST /upload/download-cover-letter-pdf`
    - `application/json`
    - body: `{ "coverLetterText": "...", "metadata": { ... } }`

## Project Structure

```text
ai-resume-analyser/
    README.md
    resume-ai-backend/
        controllers/
        middleware/
        routes/
        services/
        uploads/
        server.js
    resume-ai-frontend/
        src/
        public/
        index.html
```

## Troubleshooting

### 1) `Cannot find module '../services/resumeParserService'`

The backend service file is named `resumeParseService.js`. Any imports should point to:

```js
require('../services/resumeParseService')
```

### 2) Backend starts but requests fail

- Confirm `GEMINI_API_KEY` is set in `resume-ai-backend/.env`
- Restart backend after updating `.env`

### 3) CORS errors in browser

Backend currently allows frontend origin `http://localhost:5173`. Keep frontend on that URL or update CORS config in backend.

## Notes

- Do not commit `.env` files.
- Uploaded files are stored in backend `uploads/`.
- If dependencies break after pull, run `npm install` in both backend and frontend folders.
