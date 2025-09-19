// Function to parse job description and extract structured information
function parseJobDescription(jobText) {
  try {
    const result = {
      job_title: '',
      required_skills: [],
      responsibilities: [],
      qualifications: []
    };

    // Convert to lowercase for pattern matching
    const lowerText = jobText.toLowerCase();
    const lines = jobText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Extract job title (usually the first significant line or after "position:", "title:", "role:")
    const titlePatterns = [
      /(?:position|title|role|job)\s*:?\s*(.+)/i,
      /^(.+?)\s*(?:position|role|opening|vacancy)/i
    ];

    for (const line of lines.slice(0, 10)) { // Check first 10 lines
      if (line.length > 5 && line.length < 100) {
        for (const pattern of titlePatterns) {
          const match = line.match(pattern);
          if (match) {
            result.job_title = match[1].trim();
            break;
          }
        }
        if (result.job_title) break;
        
        // If no pattern matches, check if line looks like a job title
        if (!result.job_title && /\b(developer|engineer|manager|analyst|designer|specialist|coordinator|director|lead|senior|junior)\b/i.test(line)) {
          result.job_title = line;
        }
      }
    }

    // Extract skills (look for technical skills, programming languages, tools)
    // Enhanced skill extraction with better patterns and context
    const skillPatterns = [
      /(?:required\s+)?(?:skills?|technologies?|tools?|languages?|frameworks?)\s*(?:required|needed|include)?:?\s*(.+)/i,
      /(?:experience\s+(?:with|in)|proficiency\s+(?:in|with)|knowledge\s+of|familiar\s+with)\s*:?\s*(.+)/i,
      /(?:must\s+have|should\s+have|required|essential)\s*:?\s*(.+)/i,
      /(?:proficient\s+in|expertise\s+in|strong\s+(?:in|with))\s*:?\s*(.+)/i,
      /(?:minimum|at\s+least).*(?:years?|experience).*(?:in|with|of)\s*:?\s*(.+)/i
    ];

    // Enhanced skill normalization with comprehensive synonym mapping
    const skillSynonyms = {
      // JavaScript variations
      'js': 'javascript',
      'vanilla js': 'javascript',
      'es6': 'javascript',
      'es2015': 'javascript',
      'ecmascript': 'javascript',
      
      // TypeScript variations
      'ts': 'typescript',
      'typescript': 'typescript',
      
      // Node.js variations
      'node': 'node.js',
      'nodejs': 'node.js',
      'node js': 'node.js',
      
      // React variations
      'reactjs': 'react',
      'react.js': 'react',
      'react native': 'react native',
      
      // Angular variations
      'angularjs': 'angular',
      'angular2': 'angular',
      'angular4': 'angular',
      'ng': 'angular',
      
      // Vue variations
      'vuejs': 'vue',
      'vue.js': 'vue',
      'vue2': 'vue',
      'vue3': 'vue',
      
      // CSS variations
      'css3': 'css',
      'scss': 'sass',
      'less css': 'less',
      
      // Database variations
      'postgresql': 'postgresql',
      'postgres': 'postgresql',
      'mysql': 'mysql',
      'mongo': 'mongodb',
      'nosql': 'mongodb',
      
      // Cloud variations
      'amazon web services': 'aws',
      'google cloud': 'gcp',
      'google cloud platform': 'gcp',
      'microsoft azure': 'azure',
      
      // Python variations
      'python3': 'python',
      'py': 'python',
      
      // Git variations
      'github': 'git',
      'gitlab': 'git',
      'version control': 'git',
      
      // Testing variations
      'unit testing': 'testing',
      'automated testing': 'testing',
      'test automation': 'testing',
      
      // Other common variations
      'api': 'api development',
      'rest': 'rest api',
      'restful': 'rest api',
      'ml': 'machine learning',
      'ai': 'artificial intelligence',
      'devops': 'devops',
      'ci/cd': 'ci/cd',
      'docker': 'docker',
      'k8s': 'kubernetes',
      'selenium': 'selenium',
      'postman': 'postman'
    };

    // Map high-level terms to specific skills with confidence weights
    const skillMappings = {
      'frontend': { skills: ['html', 'css', 'javascript', 'react', 'angular', 'vue'], confidence: 0.8 },
      'front-end': { skills: ['html', 'css', 'javascript', 'react', 'angular', 'vue'], confidence: 0.8 },
      'frontend development': { skills: ['html', 'css', 'javascript', 'react', 'angular', 'vue'], confidence: 0.9 },
      'ui/ux': { skills: ['html', 'css', 'javascript', 'figma'], confidence: 0.7 },
      'web development': { skills: ['html', 'css', 'javascript'], confidence: 0.8 },
      'backend': { skills: ['node.js', 'python', 'java', 'sql', 'api development'], confidence: 0.8 },
      'back-end': { skills: ['node.js', 'python', 'java', 'sql', 'api development'], confidence: 0.8 },
      'backend development': { skills: ['node.js', 'python', 'java', 'sql', 'api development'], confidence: 0.9 },
      'server-side': { skills: ['node.js', 'python', 'java', 'sql'], confidence: 0.7 },
      'database': { skills: ['sql', 'mysql', 'postgresql', 'mongodb'], confidence: 0.8 },
      'databases': { skills: ['sql', 'mysql', 'postgresql', 'mongodb'], confidence: 0.8 },
      'cloud': { skills: ['aws', 'azure', 'gcp'], confidence: 0.7 },
      'cloud computing': { skills: ['aws', 'azure', 'gcp'], confidence: 0.8 },
      'devops': { skills: ['docker', 'kubernetes', 'jenkins', 'ci/cd'], confidence: 0.8 },
      'version control': { skills: ['git'], confidence: 0.9 },
      'testing': { skills: ['jest', 'selenium', 'pytest'], confidence: 0.7 },
      'web frameworks': { skills: ['react', 'angular', 'vue', 'django', 'flask'], confidence: 0.8 },
      'mobile development': { skills: ['react native', 'flutter', 'swift', 'kotlin'], confidence: 0.8 },
      'data analysis': { skills: ['pandas', 'numpy', 'python', 'sql', 'excel'], confidence: 0.8 },
      'data science': { skills: ['pandas', 'numpy', 'matplotlib', 'scikit-learn', 'python', 'statistics'], confidence: 0.9 },
      'machine learning': { skills: ['scikit-learn', 'tensorflow', 'pytorch', 'python', 'statistics'], confidence: 0.9 },
      'data visualization': { skills: ['matplotlib', 'seaborn', 'plotly', 'tableau', 'power bi'], confidence: 0.8 },
      'business intelligence': { skills: ['tableau', 'power bi', 'sql', 'excel'], confidence: 0.8 },
      'statistical analysis': { skills: ['statistics', 'python', 'r', 'excel'], confidence: 0.8 }
    };

    // Function to normalize skills
    function normalizeSkill(skill) {
      const normalized = skill.toLowerCase().trim();
      return skillSynonyms[normalized] || normalized;
    }

    // Comprehensive skill database
    const technicalSkills = [
      // Programming Languages
      'javascript', 'python', 'java', 'typescript', 'c#', 'c++', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'scala', 'r',
      
      // Frontend
      'react', 'angular', 'vue', 'html', 'css', 'sass', 'scss', 'less', 'bootstrap', 'tailwind', 'jquery', 'webpack', 'vite', 'next.js', 'nuxt',
      
      // Backend
      'node.js', 'express', 'django', 'flask', 'spring', 'laravel', 'rails', 'asp.net', 'fastapi', 'nestjs',
      
      // Databases
      'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'oracle', 'sqlite',
      
      // Data Science & Analytics
      'pandas', 'numpy', 'matplotlib', 'seaborn', 'plotly', 'scikit-learn', 'tensorflow', 'pytorch', 'keras',
      'jupyter', 'anaconda', 'tableau', 'power bi', 'excel', 'statistics', 'machine learning', 'deep learning',
      'data visualization', 'data analysis', 'data mining', 'big data', 'apache spark', 'hadoop', 'sas', 'spss',
      
      // Cloud & DevOps
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'terraform', 'ansible',
      
      // Tools & Methodologies
      'git', 'jira', 'confluence', 'slack', 'figma', 'postman', 'selenium', 'jest', 'pytest', 'junit',
      'agile', 'scrum', 'kanban', 'devops', 'tdd', 'ci/cd', 'microservices', 'api development', 'rest api', 'graphql',
      'testing', 'debugging', 'performance optimization', 'database design', 'responsive design', 'ui/ux'
    ];

    // Enhanced skill extraction with normalization and weighting
    const extractedSkills = new Map(); // Use Map to store skills with confidence scores

    // Function to add skill with confidence weighting
    function addSkill(skill, confidence = 0.5, source = 'general') {
      const normalized = normalizeSkill(skill);
      if (technicalSkills.includes(normalized)) {
        const currentEntry = extractedSkills.get(normalized) || { confidence: 0, sources: [] };
        const newConfidence = Math.max(currentEntry.confidence, confidence);
        extractedSkills.set(normalized, {
          confidence: newConfidence,
          sources: [...currentEntry.sources, source]
        });
      }
    }

    // First, expand high-level terms to specific skills with confidence weighting
    const expandedText = lowerText;
    for (const [term, mapping] of Object.entries(skillMappings)) {
      if (expandedText.includes(term)) {
        console.log(`Found high-level term "${term}", expanding to: ${mapping.skills.join(', ')}`);
        mapping.skills.forEach(skill => addSkill(skill, mapping.confidence, 'high-level-mapping'));
      }
    }

    // Enhanced skill section detection with confidence weighting
    const highConfidenceSections = [
      /(?:required\s+)?(?:skills?|technical\s+skills?|technologies?)\s*:?\s*(.+)/i,
      /(?:requirements?|must\s+have)\s*:?\s*(.+)/i
    ];

    const mediumConfidenceSections = [
      /(?:tools?|languages?|frameworks?)\s*:?\s*(.+)/i,
      /(?:experience\s+(?:with|in)|proficiency\s+(?:in|with)|knowledge\s+of|familiar\s+with)\s*:?\s*(.+)/i,
      /(?:proficient\s+in|expertise\s+in|strong\s+(?:in|with))\s*:?\s*(.+)/i
    ];

    const lowConfidenceSections = [
      /(?:minimum|at\s+least).*(?:years?|experience).*(?:in|with|of)\s*:?\s*(.+)/i,
      /(?:preferred|nice\s+to\s+have|bonus)\s*:?\s*(.+)/i
    ];

    // Extract from high confidence sections (bullet points under "Skills", "Requirements" etc.)
    for (const line of lines) {
      let confidence = 0.5;
      let matched = false;

      // Check if line is a bullet point for higher confidence
      const isBulletPoint = /^\s*[•◦▪■▫\-*→✓]\s*/.test(line);
      
      // High confidence patterns
      for (const pattern of highConfidenceSections) {
        const match = line.match(pattern);
        if (match) {
          confidence = isBulletPoint ? 0.95 : 0.85;
          matched = true;
          extractSkillsFromText(match[1], confidence, 'high-confidence-section');
          break;
        }
      }

      // Medium confidence patterns
      if (!matched) {
        for (const pattern of mediumConfidenceSections) {
          const match = line.match(pattern);
          if (match) {
            confidence = isBulletPoint ? 0.8 : 0.65;
            matched = true;
            extractSkillsFromText(match[1], confidence, 'medium-confidence-section');
            break;
          }
        }
      }

      // Low confidence patterns
      if (!matched) {
        for (const pattern of lowConfidenceSections) {
          const match = line.match(pattern);
          if (match) {
            confidence = isBulletPoint ? 0.6 : 0.4;
            extractSkillsFromText(match[1], confidence, 'low-confidence-section');
            break;
          }
        }
      }
    }

    // Helper function to extract skills from text with confidence
    function extractSkillsFromText(text, baseConfidence, source) {
      const skillsText = text.toLowerCase();
      
      // Check for high-level terms in this line
      for (const [term, mapping] of Object.entries(skillMappings)) {
        if (skillsText.includes(term)) {
          mapping.skills.forEach(skill => addSkill(skill, Math.min(baseConfidence * mapping.confidence, 0.95), source));
        }
      }
      
      // Split by various delimiters and clean
      const skills = skillsText.split(/[,;|&\n•◦▪■▫\-\*→✓]/)
        .map(s => s.trim())
        .filter(s => s.length > 1 && s.length < 50)
        .filter(s => !s.match(/^[0-9]+$/)) // Remove pure numbers
        .filter(s => !['and', 'or', 'with', 'in', 'of', 'the', 'a', 'an', 'years', 'experience'].includes(s));
      
      skills.forEach(skill => {
        addSkill(skill, baseConfidence, source);
      });
    }

    // Look for specific technical skills throughout the text with confidence scoring
    for (const skill of technicalSkills) {
      const skillRegex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (skillRegex.test(lowerText)) {
        // Determine confidence based on context
        let confidence = 0.5; // Base confidence for general mentions
        
        // Higher confidence if mentioned in skills/requirements sections
        const skillContext = lowerText.match(new RegExp(`.*${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*`, 'i'));
        if (skillContext && skillContext[0]) {
          const context = skillContext[0];
          if (/(?:skills?|requirements?|must\s+have|required|technologies?)/.test(context)) {
            confidence = 0.8;
          } else if (/(?:preferred|nice\s+to\s+have|bonus|plus)/.test(context)) {
            confidence = 0.6;
          }
        }
        
        addSkill(skill, confidence, 'direct-mention');
      }
    }

    // Convert Map to sorted array with confidence scores
    const skillsWithConfidence = Array.from(extractedSkills.entries())
      .map(([skill, data]) => ({
        name: skill,
        confidence: data.confidence,
        sources: data.sources
      }))
      .sort((a, b) => b.confidence - a.confidence); // Sort by confidence descending

    // Clean up and filter the results, keeping confidence information
    result.required_skills = skillsWithConfidence
      .filter(item => item.name && item.name.trim().length > 0)
      .filter(item => !item.name.includes('(') || item.name.includes('years')) // Keep experience requirements but remove other parentheses
      .slice(0, 20) // Limit to top 20 skills
      .map(item => ({
        skill: item.name.trim(),
        confidence: item.confidence,
        sources: item.sources
      }));
    // Enhanced separation of responsibilities vs qualifications
    const responsibilityPatterns = [
      /(?:responsibilities|duties|role|tasks?)\s*:?\s*(.+)/i,
      /(?:you\s+will|candidate\s+will|responsible\s+for)\s*:?\s*(.+)/i,
      /(?:day\s+to\s+day|daily)\s*:?\s*(.+)/i
    ];

    const responsibilityIndicators = [
      '•', '◦', '▪', '■', '▫', '-', '*', '→', '✓'
    ];

    const actionVerbs = [
      'develop', 'design', 'implement', 'manage', 'lead', 'create', 'build', 'maintain', 
      'support', 'analyze', 'optimize', 'collaborate', 'coordinate', 'ensure', 'monitor', 
      'troubleshoot', 'test', 'deploy', 'configure', 'integrate', 'write', 'review',
      'participate', 'contribute', 'assist', 'execute', 'deliver', 'plan', 'organize'
    ];

    // Qualification indicators - if a line contains these, it goes to qualifications
    const qualificationIndicators = [
      'years', 'year', 'degree', 'bachelor', 'master', 'phd', 'certification', 'certified',
      'diploma', 'graduate', 'education', 'university', 'college', 'experience in',
      'minimum', 'required experience', 'preferred experience'
    ];

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      // Check if line contains qualification indicators first
      const isQualification = qualificationIndicators.some(indicator => 
        lowerLine.includes(indicator)
      );
      
      if (isQualification) {
        // This line contains years, degree, or certification - goes to qualifications
        result.qualifications.push(line);
        continue;
      }

      // Check responsibility patterns
      let addedAsResponsibility = false;
      for (const pattern of responsibilityPatterns) {
        const match = line.match(pattern);
        if (match) {
          result.responsibilities.push(match[1].trim());
          addedAsResponsibility = true;
          break;
        }
      }

      if (addedAsResponsibility) continue;

      // Check for bullet points or lines starting with action verbs
      if (responsibilityIndicators.some(indicator => line.startsWith(indicator))) {
        const cleanLine = line.replace(/^[•◦▪■▫\-*→✓]\s*/, '').trim();
        if (cleanLine.length > 10) {
          // Double-check this isn't a qualification even though it's a bullet point
          const cleanLower = cleanLine.toLowerCase();
          if (qualificationIndicators.some(indicator => cleanLower.includes(indicator))) {
            result.qualifications.push(cleanLine);
          } else {
            result.responsibilities.push(cleanLine);
          }
        }
      }

      // Check for action verbs at start of line (but not if it contains qualification indicators)
      else if (actionVerbs.some(verb => 
        new RegExp(`^${verb}\\b`, 'i').test(line)
      )) {
        result.responsibilities.push(line);
      }
    }

    // Extract qualifications with enhanced patterns
    const qualificationPatterns = [
      /(?:qualifications?|requirements?|education|experience|certification)\s*:?\s*(.+)/i,
      /(?:bachelor|master|degree|phd|certification|years?\s+of\s+experience)\s*(.+)/i,
      /(?:minimum|preferred|required)\s+(?:qualifications?|requirements?|experience)\s*:?\s*(.+)/i,
      /(?:\d+\+?\s*years?)\s+(?:of\s+)?(?:experience|exp)\s*(?:in|with|of)?\s*(.+)/i,
      /(?:degree\s+in|bachelor\s+in|master\s+in|phd\s+in)\s*(.+)/i
    ];

    for (const line of lines) {
      for (const pattern of qualificationPatterns) {
        const match = line.match(pattern);
        if (match) {
          result.qualifications.push(match[1].trim());
        }
      }

      // Check for education and experience indicators with enhanced detection
      if (/\b(?:\d+\+?\s*years?|bachelor|master|phd|certification|degree|diploma|graduate)\b/i.test(line)) {
        // Avoid duplicates by checking if already added
        if (!result.qualifications.includes(line)) {
          result.qualifications.push(line);
        }
      }
    }

    // Remove duplicates and clean up with enhanced deduplication
    const uniqueSkills = new Map();
    result.required_skills.forEach(skillObj => {
      const normalized = normalizeSkill(skillObj.skill);
      if (!uniqueSkills.has(normalized) || uniqueSkills.get(normalized).confidence < skillObj.confidence) {
        uniqueSkills.set(normalized, skillObj);
      }
    });
    
    result.required_skills = Array.from(uniqueSkills.values())
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 20); // Limit to top 20 skills by confidence

    // Enhanced deduplication for responsibilities and qualifications
    result.responsibilities = [...new Set(result.responsibilities)]
      .filter(resp => resp.length > 15) // Filter out very short responsibilities
      .slice(0, 15); // Limit to 15 responsibilities
    
    result.qualifications = [...new Set(result.qualifications)]
      .filter(qual => qual.length > 10) // Filter out very short qualifications
      .slice(0, 10); // Limit to 10 qualifications

    // If job title is still empty, try to extract from first few meaningful lines
    if (!result.job_title && lines.length > 0) {
      result.job_title = lines[0];
    }

    // Add metadata about parsing confidence
    result.parsing_metadata = {
      total_skills_found: result.required_skills.length,
      high_confidence_skills: result.required_skills.filter(s => s.confidence >= 0.8).length,
      medium_confidence_skills: result.required_skills.filter(s => s.confidence >= 0.6 && s.confidence < 0.8).length,
      low_confidence_skills: result.required_skills.filter(s => s.confidence < 0.6).length,
      responsibilities_count: result.responsibilities.length,
      qualifications_count: result.qualifications.length
    };

    console.log('Job parsing completed:', result.parsing_metadata);

    return result;

  } catch (error) {
    throw new Error(`Failed to parse job description: ${error.message}`);
  }
}

// Enhanced function to get skill confidence scores for external use
function getSkillConfidenceScores(jobText) {
  try {
    const parsed = parseJobDescription(jobText);
    return {
      skills: parsed.required_skills,
      metadata: parsed.parsing_metadata,
      skill_insights: {
        most_critical: parsed.required_skills.filter(s => s.confidence >= 0.9),
        important: parsed.required_skills.filter(s => s.confidence >= 0.7 && s.confidence < 0.9),
        preferred: parsed.required_skills.filter(s => s.confidence < 0.7)
      }
    };
  } catch (error) {
    return { error: error.message };
  }
}

// Function to normalize external skills (for resume processing)
function normalizeExternalSkill(skill) {
  const skillSynonyms = {
    'js': 'javascript',
    'vanilla js': 'javascript',
    'es6': 'javascript',
    'node': 'node.js',
    'nodejs': 'node.js',
    'reactjs': 'react',
    'angularjs': 'angular',
    'vuejs': 'vue',
    'css3': 'css',
    'scss': 'sass',
    'postgres': 'postgresql',
    'mongo': 'mongodb',
    'k8s': 'kubernetes',
    'ml': 'machine learning',
    'ai': 'artificial intelligence'
  };
  
  const normalized = skill.toLowerCase().trim();
  return skillSynonyms[normalized] || normalized;
}

module.exports = {
  parseJobDescription,
  getSkillConfidenceScores,
  normalizeExternalSkill
};