# AI Resume Analyser

A powerful AI-driven resume analysis tool that helps job seekers optimize their resumes for specific job descriptions. The application provides intelligent insights, skill gap analysis, and generates personalized cover letters with PDF download functionality.

## 🚀 Features

### Core Functionality
- **AI-Powered Resume Analysis**: Advanced analysis using Google Gemini AI for accurate skill matching
- **Job Description Matching**: Intelligent comparison between resume content and job requirements
- **Skill Gap Identification**: Precise identification of missing skills based on job requirements
- **Personalized Recommendations**: Tailored career advice and learning priorities

### Advanced Features
- **Cover Letter Generation**: AI-generated personalized cover letters
- **PDF Download**: Professional PDF export for cover letters
- **Real-time Analysis**: Instant feedback as you upload documents
- **Modern UI/UX**: Attractive interface with glassmorphism design and smooth animations

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with animations and glassmorphism effects
- **HTML5** - Semantic markup

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Google Generative AI (Gemini)** - AI-powered analysis
- **Multer** - File upload handling
- **html-pdf-node** - PDF generation
- **pdf-parse** - PDF text extraction

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-resume-analyser
```

### 2. Backend Setup
```bash
cd resume-ai-backend
npm install
```

Create a `.env` file in the backend directory:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../resume-ai-frontend
npm install
```

## 📤 Pushing to GitHub

### Initial Setup (First Time)
```bash
# Navigate to project root
cd ai-resume-analyser

# Initialize git repository (if not already done)
git init

# Add all files (uploads folder will be ignored automatically)
git add .

# Commit your changes
git commit -m "Initial commit: AI Resume Analyser with PDF generation"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/ai-resume-analyser.git

# Push to GitHub
git push -u origin main
```

### Regular Updates
```bash
# Add changes
git add .

# Commit with descriptive message
git commit -m "Add feature: AI-powered skill analysis"

# Push to GitHub
git push origin main
```

### ⚠️ Important Notes:
- **`/uploads` folder is automatically excluded** - contains sensitive user files
- **`.env` files are excluded** - contains your API keys
- **`node_modules` folders are excluded** - can be reinstalled with `npm install`
- Always verify your `.env` file is not pushed (it contains your Gemini API key)

## 🚀 Running the Application

### Start Backend Server
```bash
cd resume-ai-backend
npm start
```
Backend will run on: `http://localhost:5000`

### Start Frontend Development Server
```bash
cd resume-ai-frontend
npm run dev
```
Frontend will run on: `http://localhost:5173`

## 📁 Project Structure

```
ai-resume-analyser/
├── resume-ai-backend/
│   ├── services/
│   │   ├── aiService.js         # Google Gemini AI integration
│   │   └── analysisService.js   # Resume analysis logic
│   ├── uploads/                 # Temporary file storage
│   ├── server.js               # Express server setup
│   └── package.json
└── resume-ai-frontend/
    ├── src/
    │   ├── App.jsx             # Main application component
    │   ├── App.css             # Modern styling with animations
    │   └── main.jsx            # React entry point
    ├── public/
    └── package.json
```

## 🎯 How to Use

1. **Upload Resume**: Click "Choose File" and select your PDF resume
2. **Enter Job Description**: Paste the job description in the text area
3. **Analyze**: Click "Analyze Resume" to get AI-powered insights
4. **Review Results**: 
   - View skill match percentage
   - See matched and missing skills
   - Read personalized career advice
   - Get interview tips
5. **Generate Cover Letter**: Click "Generate Cover Letter" for a personalized letter
6. **Download PDF**: Use "Download as PDF" to save your cover letter

## 🔑 Key Features Explained

### AI-Powered Skill Analysis
- Uses Google Gemini AI for intelligent skill matching
- Focuses only on skills explicitly mentioned in job descriptions
- Avoids suggesting irrelevant technologies
- Provides context-aware recommendations

### Smart PDF Generation
- Professional cover letter formatting
- High-quality PDF output
- Instant download functionality

### Modern UI Design
- Glassmorphism effects
- Smooth animations and transitions
- Responsive design
- Interactive hover effects
- Professional color scheme

## 🚨 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if you have a valid `GEMINI_API_KEY` in your `.env` file
- Ensure port 5000 is not in use by another application

**Frontend build errors:**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (should be v14+)

**API Errors:**
- Verify your Gemini API key is valid and has sufficient quota
- Check network connectivity

## 🔮 Future Enhancements

- [ ] Multiple file format support (DOC, DOCX)
- [ ] Resume template suggestions
- [ ] ATS (Applicant Tracking System) compatibility checker
- [ ] Multiple cover letter templates
- [ ] Resume optimization suggestions
- [ ] Interview question generation
- [ ] Skill trending analysis

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Generative AI for powerful AI capabilities
- React and Vite communities for excellent development tools
- Open source contributors for various libraries used

---

**Made with ❤️ for job seekers worldwide**
