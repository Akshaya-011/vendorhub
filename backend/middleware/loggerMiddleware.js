const morgan = require('morgan');
const logger = require('../utils/logger');

// Setup standard request logger using morgan with custom color logs integration
const requestLogger = morgan((tokens, req, res) => {
  const status = tokens.status(req, res);
  const logStr = [
    tokens.method(req, res),
    tokens.url(req, res),
    '- Status:', status,
    '- Length:', tokens.res(req, res, 'content-length') || '0',
    '- Response Time:', tokens['response-time'](req, res), 'ms'
  ].join(' ');

  if (res.statusCode >= 500) {
    logger.error(`API Request failed: ${logStr}`);
  } else if (res.statusCode >= 400) {
    logger.warn(`API Request warning: ${logStr}`);
  } else {
    logger.debug(`API Request: ${logStr}`);
  }
  
  return null; // Return null so morgan itself doesn't print directly to stdout
});

module.exports = requestLogger;
