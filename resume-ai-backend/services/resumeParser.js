const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Function to parse resume files
async function parseResume(filePath) {
  try {
    const fileExtension = path.extname(filePath).toLowerCase();
    
    if (fileExtension === '.pdf') {
      // Parse PDF file
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
      
    } else if (fileExtension === '.docx') {
      // Parse DOCX file using mammoth
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
      
    } else {
      throw new Error('Unsupported file format. Only PDF and DOCX are supported.');
    }
    
  } catch (error) {
    throw new Error(`Failed to parse resume: ${error.message}`);
  }
}

module.exports = {
  parseResume
};