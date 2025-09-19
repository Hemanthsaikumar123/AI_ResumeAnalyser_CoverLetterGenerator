import React, { useState, useEffect, useRef } from 'react';

const PuterChatbot = ({ userAnalysisContext = null }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPuterReady, setIsPuterReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Check if Puter is ready with better error handling
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 50; // 5 seconds max wait time
    
    const checkPuter = () => {
      try {
        if (window.puter && window.puter.ai && typeof window.puter.ai.chat === 'function') {
          setIsPuterReady(true);
          console.log('✅ Puter AI is ready!');
          return;
        }
        
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(checkPuter, 100);
        } else {
          console.error('❌ Puter failed to load after 5 seconds');
          setIsPuterReady(false);
        }
      } catch (error) {
        console.error('❌ Error checking Puter:', error);
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(checkPuter, 100);
        }
      }
    };
    
    checkPuter();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Memory management - limit message history
  useEffect(() => {
    if (messages.length > 50) { // Keep only last 50 messages
      setMessages(prev => prev.slice(-50));
    }
  }, [messages]);

  // Initialize with welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        role: 'assistant',
        content: `👋 Hi! I'm your AI career advisor powered by Puter. I can help you with:

🔧 Technology explanations and comparisons
📈 Career guidance and development paths  
📚 Learning roadmaps and resources
💼 Interview preparation tips
🎯 Skill improvement suggestions

${userAnalysisContext ? '🎉 I can see your resume analysis results and provide personalized advice!' : ''}

What would you like to know?`,
        timestamp: new Date(),
        messageId: 'welcome'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, userAnalysisContext]);

  // Handle sending message with Puter AI
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !isPuterReady) return;

    const userMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
      messageId: Date.now().toString()
    };

    // Clear input immediately to prevent duplicate sends
    const currentMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build context for Puter AI
      const contextPrompt = buildContextPrompt(currentMessage);
      
      // Add timeout and better error handling for Puter AI
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('AI response timeout')), 30000)
      );

      const aiPromise = window.puter.ai.chat([
        {
          role: 'system',
          content: `You are a professional technical career advisor and coding mentor. You help developers with career guidance, technology explanations, learning paths, and interview preparation. 

Be helpful, encouraging, and provide actionable advice. Use emojis appropriately and keep responses concise but informative (under 300 words unless detailed explanation is needed).

Focus on practical, real-world advice that helps developers advance their careers.`
        },
        {
          role: 'user',
          content: contextPrompt
        }
      ]);

      // Race between AI response and timeout
      const response = await Promise.race([aiPromise, timeoutPromise]);

      // Safely extract response content
      let aiResponse = '';
      if (typeof response === 'string') {
        aiResponse = response;
      } else if (response && response.content) {
        aiResponse = response.content;
      } else if (response && response.text) {
        aiResponse = response.text;
      } else if (response && typeof response === 'object') {
        // Try to find content in various possible structures
        aiResponse = response.message?.content || 
                    response.choices?.[0]?.message?.content || 
                    response.data?.content ||
                    'I received your message but had trouble formatting the response. Please try again.';
      } else {
        aiResponse = 'I\'m having trouble generating a response right now. Please try rephrasing your question.';
      }
      
      // Enhance response with skill-specific knowledge if relevant
      aiResponse = enhanceWithSkillKnowledge(aiResponse, currentMessage);

      const botMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        messageId: `ai_${Date.now()}`
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Puter AI error:', error);
      
      // More specific error handling
      let errorMessage = '😅 I encountered an issue processing your question. ';
      
      if (error.message.includes('timeout')) {
        errorMessage += 'The response took too long. Please try a simpler question.';
      } else if (error.message.includes('network')) {
        errorMessage += 'Please check your internet connection and try again.';
      } else if (error.message.includes('rate')) {
        errorMessage += 'Too many requests. Please wait a moment and try again.';
      } else {
        errorMessage += 'Could you try rephrasing your question? I\'m here to help with your career development!';
      }
      
      const errorResponse = {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date(),
        messageId: `error_${Date.now()}`
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Build context prompt for Puter AI
  const buildContextPrompt = (message) => {
    let prompt = `User Question: ${message}\n\n`;

    // Add user context if available from resume analysis
    if (userAnalysisContext) {
      prompt += `User's Resume Analysis Context:\n`;
      
      if (userAnalysisContext.matched_skills?.length > 0) {
        prompt += `✅ Current Skills: ${userAnalysisContext.matched_skills.join(', ')}\n`;
      }
      
      if (userAnalysisContext.missing_skills?.length > 0) {
        prompt += `📚 Skills to Develop: ${userAnalysisContext.missing_skills.join(', ')}\n`;
      }
      
      if (userAnalysisContext.skill_analysis?.match_percentage) {
        prompt += `📊 Skill Match: ${Math.round(userAnalysisContext.skill_analysis.match_percentage)}%\n`;
      }
      
      if (userAnalysisContext.recommendations?.length > 0) {
        prompt += `💡 Current Recommendations: ${userAnalysisContext.recommendations[0]}\n`;
      }
      
      prompt += `\n`;
    }

    // Add specific guidance based on question type
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('learn') || lowerMessage.includes('study')) {
      prompt += `Please provide a structured learning path with practical steps and timeframes.\n`;
    } else if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      prompt += `Provide actionable career advice based on current market trends.\n`;
    } else if (lowerMessage.includes('interview')) {
      prompt += `Give specific, practical interview preparation advice.\n`;
    } else if (lowerMessage.includes('vs') || lowerMessage.includes('compare')) {
      prompt += `Compare technologies focusing on career prospects, use cases, and learning difficulty.\n`;
    }

    return prompt;
  };

  // Enhance response with additional resources
  const enhanceWithSkillKnowledge = (response, originalMessage) => {
    const skillResources = {
      'react': '📚 **React Resources:** React Docs, Scrimba React Course, React Beta Docs',
      'javascript': '📚 **JavaScript Resources:** MDN Web Docs, JavaScript.info, Eloquent JavaScript',
      'python': '📚 **Python Resources:** Python.org Tutorial, Automate the Boring Stuff, Real Python',
      'node.js': '📚 **Node.js Resources:** Node.js Docs, Node.js Master Class, Express.js Guide',
      'docker': '📚 **Docker Resources:** Docker Official Tutorial, Play with Docker, Docker for Beginners'
    };

    const lowerMessage = originalMessage.toLowerCase();
    
    // Add resources if specific technologies are mentioned
    for (const [tech, resources] of Object.entries(skillResources)) {
      if (lowerMessage.includes(tech) && !response.includes('Resources:')) {
        response += `\n\n${resources}`;
        break;
      }
    }

    return response;
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick suggestions
  const quickSuggestions = [
    "How do I improve my coding skills?",
    "What should I learn next for frontend development?",
    "How to prepare for technical interviews?",
    "React vs Vue - which should I choose?",
    "Career advice for full-stack developer",
    "What are the most in-demand tech skills?"
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const clearChat = () => {
    setMessages([]);
    setIsOpen(false);
    setTimeout(() => setIsOpen(true), 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button 
          className="chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          title="Open AI Career Advisor"
        >
          🤖
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="puter-chatbot-container">
          <div className="puter-chatbot">
            {/* Header */}
            <div className="chatbot-header">
              <div className="header-info">
                <h3>🤖 AI Career Advisor</h3>
                <span className="powered-by">
                  {isPuterReady ? '✅ Powered by Puter AI' : '⏳ Loading Puter AI...'}
                </span>
              </div>
              <div className="header-actions">
                <button 
                  className="clear-btn" 
                  onClick={clearChat}
                  title="Clear conversation"
                >
                  🗑️
                </button>
                <button 
                  className="close-btn" 
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="messages-container">
              {!isPuterReady && (
                <div className="loading-puter">
                  <div className="loading-spinner">⏳</div>
                  <p>Loading Puter AI...</p>
                </div>
              )}

              {messages.map((message) => (
                <div 
                  key={message.messageId} 
                  className={`message ${message.role}`}
                >
                  <div className="message-content">
                    {message.content.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < message.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="message assistant">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 1 && isPuterReady && (
              <div className="quick-suggestions">
                <div className="suggestions-title">💡 Quick Questions:</div>
                <div className="suggestions-grid">
                  {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-btn"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="input-container">
              <div className="input-wrapper">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isPuterReady 
                      ? "Ask me about technologies, career advice, learning paths..." 
                      : "Waiting for Puter AI to load..."
                  }
                  className="message-input"
                  rows={1}
                  disabled={isLoading || !isPuterReady}
                />
                <button 
                  className="send-btn"
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading || !isPuterReady}
                >
                  {isLoading ? '⏳' : '📤'}
                </button>
              </div>
              <div className="input-footer">
                <span className="ai-notice">
                  ⚡ Powered by Puter AI - No backend required!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PuterChatbot;