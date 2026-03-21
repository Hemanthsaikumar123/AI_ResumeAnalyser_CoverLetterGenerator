/**
 * GET /health
 * Simple liveness check.
 */
const getHealth = (req, res) => {
  res.json({
    status:    'ok',
    timestamp: new Date().toISOString(),
    service:   'Resume AI Analyzer',
    version:   '2.0.0',
  });
};

module.exports = { getHealth };