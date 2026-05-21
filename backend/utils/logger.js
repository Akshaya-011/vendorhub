const colors = {
  reset: "\x1b[0m",
  info: "\x1b[36m",    // Cyan
  success: "\x1b[32m", // Green
  warn: "\x1b[33m",    // Yellow
  error: "\x1b[31m",   // Red
  debug: "\x1b[35m"    // Magenta
};

const getTimestamp = () => {
  return new Date().toISOString();
};

const formatMessage = (level, message, color) => {
  return `[${getTimestamp()}] ${color}[${level.toUpperCase()}]${colors.reset} ${message}`;
};

const logger = {
  info: (msg) => {
    console.log(formatMessage('info', msg, colors.info));
  },
  success: (msg) => {
    console.log(formatMessage('success', msg, colors.success));
  },
  warn: (msg) => {
    console.warn(formatMessage('warn', msg, colors.warn));
  },
  error: (msg, err = '') => {
    const errorDetail = err ? `\nStack trace:\n${err.stack || err}` : '';
    console.error(formatMessage('error', `${msg}${errorDetail}`, colors.error));
  },
  debug: (msg) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(formatMessage('debug', msg, colors.debug));
    }
  }
};

module.exports = logger;
