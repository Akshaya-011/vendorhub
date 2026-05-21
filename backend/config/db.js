const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/vendorhub';
    
    const options = {
      autoIndex: true, // Build indexes in dev, consider disabling in high-traffic prod environments
    };

    logger.info(`Connecting to MongoDB at: ${connStr.replace(/:([^@]+)@/, ':****@')}`);
    
    const conn = await mongoose.connect(connStr, options);
    
    logger.info(`MongoDB Connected successfully: ${conn.connection.host}`);
    
    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB runtime connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB connection lost. Reconnecting...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected successfully.');
    });

  } catch (error) {
    logger.error(`Mongoose connection failure: ${error.message}`);
    // Do not crash the server in dev, but in production we want to restart
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
