const Razorpay = require('razorpay');
const logger = require('../utils/logger');

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

const isConfigured = keyId && keyId !== 'rzp_test_your_razorpay_key_id_here' && keySecret;

let razorpayInstance = null;

if (isConfigured) {
  try {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });
    logger.info('Razorpay initialized successfully.');
  } catch (error) {
    logger.error('Razorpay initialization failed: ', error);
  }
} else {
  logger.warn('Razorpay is not fully configured. Payment and Billing system will run in SIMULATED fallback mode.');
}

module.exports = {
  instance: razorpayInstance,
  isMockEnabled: !isConfigured,
  keyId: keyId || 'rzp_test_mock_id',
  keySecret: keySecret || 'mock_secret',
  webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || 'mock_webhook_secret'
};
