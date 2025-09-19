const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

// Import routes
const healthRoutes = require('./routes/health');
const uploadRoutes = require('./routes/upload');
const analysisRoutes = require('./routes/analysis');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/upload', uploadRoutes);
app.use('/upload-and-analyze', uploadRoutes); // Backward compatibility
app.use('/', analysisRoutes); // Legacy endpoints: /parse, /parse-job, /analyze
app.use('/ai', analysisRoutes); // AI similarity endpoint

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'POST /upload',
      'POST /upload-and-analyze',
      'POST /parse',
      'POST /parse-job', 
      'POST /analyze',
      'POST /ai/similarity'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Resume AI Analyzer server is running on port ${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/health`);
  console.log(`   POST http://localhost:${PORT}/upload`);
  console.log(`   POST http://localhost:${PORT}/upload-and-analyze`);
  console.log(`   POST http://localhost:${PORT}/analyze`);
  console.log(`   POST http://localhost:${PORT}/ai/similarity`);
  console.log(`   ✨ Chatbot now handled by frontend with Puter AI!`);
});

module.exports = app;