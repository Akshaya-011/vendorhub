const crypto = require('crypto');
const razorpayConfig = require('../config/razorpay');
const Payment = require('../models/Payment');
const logger = require('../utils/logger');

class PaymentService {
  /**
   * Initialize a standard payment request order
   */
  static async createOrder(userId, vendorId, amount, planId = 'free') {
    const amountInPaise = amount * 100; // Razorpay operates in Paise

    // If Razorpay keys are mock or missing, fall back to Simulated Mock Orders
    if (razorpayConfig.isMockEnabled) {
      const mockOrderId = `order_mock_${crypto.randomBytes(6).toString('hex')}`;
      logger.info(`Simulated: Created mock payment order invoice: ${mockOrderId}`);
      
      const payment = await Payment.create({
        vendorId,
        userId,
        amount,
        razorpayOrderId: mockOrderId,
        status: 'created',
        planId
      });

      return {
        id: mockOrderId,
        amount: amountInPaise,
        currency: 'INR',
        receipt: payment._id,
        isMock: true
      };
    }

    try {
      const options = {
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`
      };

      const razorpayOrder = await razorpayConfig.instance.orders.create(options);

      await Payment.create({
        vendorId,
        userId,
        amount,
        razorpayOrderId: razorpayOrder.id,
        status: 'created',
        planId
      });

      return {
        ...razorpayOrder,
        isMock: false
      };
    } catch (error) {
      logger.error('Razorpay Order creation error: ', error);
      throw new Error(`Payment Order generation failed: ${error.message}`);
    }
  }

  /**
   * Verify digital signature for a captured transaction
   */
  static async verifySignature(verificationData) {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = verificationData;

    // Verify mock signatures directly
    if (razorpayConfig.isMockEnabled || razorpayOrderId.startsWith('order_mock_')) {
      const payment = await Payment.findOne({ razorpayOrderId });
      if (!payment) {
        throw new Error('Associated transaction record not found');
      }

      payment.status = 'captured';
      payment.razorpayPaymentId = razorpayPaymentId || `pay_mock_${crypto.randomBytes(6).toString('hex')}`;
      payment.razorpaySignature = razorpaySignature || 'mock_signature_verified';
      await payment.save();

      return { success: true, payment };
    }

    try {
      // Validate payment signature authenticity
      const text = `${razorpayOrderId}|${razorpayPaymentId}`;
      const generatedSignature = crypto
        .createHmac('sha256', razorpayConfig.keySecret)
        .update(text)
        .digest('hex');

      const isSignatureValid = generatedSignature === razorpaySignature;

      if (!isSignatureValid) {
        throw new Error('Digital payment signature verification failed');
      }

      const payment = await Payment.findOne({ razorpayOrderId });
      if (!payment) {
        throw new Error('Associated payment order not found');
      }

      payment.status = 'captured';
      payment.razorpayPaymentId = razorpayPaymentId;
      payment.razorpaySignature = razorpaySignature;
      await payment.save();

      return { success: true, payment };
    } catch (error) {
      logger.error('Payment verification error: ', error);
      
      const payment = await Payment.findOne({ razorpayOrderId });
      if (payment) {
        payment.status = 'failed';
        payment.errorMessage = error.message;
        await payment.save();
      }

      throw error;
    }
  }
}

module.exports = PaymentService;
