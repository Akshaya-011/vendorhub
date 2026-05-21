const PaymentService = require('../services/paymentService');
const SubscriptionService = require('../services/subscriptionService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Initiate standard billing tier capture orders
 */
const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { vendorId, amount, planId } = req.body;

  const order = await PaymentService.createOrder(userId, vendorId, amount, planId);
  ApiResponse.success(res, 'Payment transaction order initiated successfully', order);
});

/**
 * Verify captures payment signature parameters
 */
const verifyPayment = asyncHandler(async (req, res) => {
  const result = await PaymentService.verifySignature(req.body);

  // Upgrade active billing subscription plan parameters in Vendor systems upon capture success
  if (result.success && result.payment) {
    const { vendorId, planId, billingCycle } = result.payment;
    await SubscriptionService.upgradeSubscription(
      vendorId, 
      planId, 
      billingCycle || 'monthly', 
      result.payment.razorpayOrderId
    );
  }

  ApiResponse.success(res, 'Payment transaction successfully captured and subscription updated', result);
});

module.exports = {
  createOrder,
  verifyPayment
};
