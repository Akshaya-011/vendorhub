const Subscription = require('../models/Subscription');
const Vendor = require('../models/Vendor');
const { PLANS, AI_GENERATOR_LIMITS } = require('../utils/constants');

class SubscriptionService {
  /**
   * Initialize a default free plan on signup
   */
  static async initializeFreeSubscription(vendorId) {
    return await Subscription.create({
      vendorId,
      plan: PLANS.FREE,
      billingCycle: 'monthly',
      paymentStatus: 'active',
      currentStart: new Date(),
      currentEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    });
  }

  /**
   * Update plan subscription details upon Razorpay payment capture
   */
  static async upgradeSubscription(vendorId, plan, billingCycle = 'monthly', gatewaySubscriptionId = '') {
    const durationDays = billingCycle === 'yearly' ? 365 : 30;
    const currentStart = new Date();
    const currentEnd = new Date();
    currentEnd.setDate(currentEnd.getDate() + durationDays);

    let subscription = await Subscription.findOne({ vendorId });

    if (subscription) {
      subscription.plan = plan;
      subscription.billingCycle = billingCycle;
      subscription.paymentStatus = 'active';
      subscription.razorpaySubscriptionId = gatewaySubscriptionId || subscription.razorpaySubscriptionId;
      subscription.currentStart = currentStart;
      subscription.currentEnd = currentEnd;
      await subscription.save();
    } else {
      subscription = await Subscription.create({
        vendorId,
        plan,
        billingCycle,
        paymentStatus: 'active',
        razorpaySubscriptionId: gatewaySubscriptionId,
        currentStart,
        currentEnd
      });
    }

    // Reflect updated billing plan directly into Vendor parameters
    await Vendor.findByIdAndUpdate(vendorId, { subscriptionPlan: plan });

    return subscription;
  }

  /**
   * Verify access parameters for feature usage
   */
  static async verifyFeatureAccess(vendorId, featureName) {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return false;

    const currentPlan = vendor.subscriptionPlan;

    // Custom domain feature restricted to premium or higher tiers
    if (featureName === 'custom_domain') {
      return [PLANS.PREMIUM, PLANS.ENTERPRISE].includes(currentPlan);
    }

    // Unlimited products inventory listings locked for Basic and higher
    if (featureName === 'unlimited_products') {
      return [PLANS.BASIC, PLANS.PREMIUM, PLANS.ENTERPRISE].includes(currentPlan);
    }

    return true;
  }

  /**
   * Verify generator limitations limits
   */
  static async checkAILimitations(vendorId, activeGenerationsCount) {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return false;

    const plan = vendor.subscriptionPlan || PLANS.FREE;
    const limit = AI_GENERATOR_LIMITS[plan] || 5;

    return activeGenerationsCount < limit;
  }
}

module.exports = SubscriptionService;
