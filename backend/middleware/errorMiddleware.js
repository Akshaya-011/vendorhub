const ApiResponse = require('../utils/apiResponse');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || null;

  // Log error using logger
  logger.error(`${req.method} ${req.originalUrl} - Error captured: ${message}`, err);

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: '${err.keyValue[field]}' on field: '${field}'. Please use another value.`;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Data Validation Failure';
    errors = Object.values(err.errors).map((val) => val.message);
  }

  // Mongoose bad ObjectId format error
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID reference format: '${err.value}' for model property '${err.path}'`;
  }

  // JWT expired
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token signature has expired. Please log in again.';
  }

  // JWT invalid signature
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token signature verification failed.';
  }

  // Include stack details only in development mode
  const payload = process.env.NODE_ENV === 'development' ? {
    stack: err.stack,
    details: errors
  } : errors;

  ApiResponse.error(res, message, statusCode, payload);
};

module.exports = errorHandler;
