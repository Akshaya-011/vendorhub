const mongoose = require('mongoose');
const { PLANS } = require('../utils/constants');

const subscriptionSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
      index: true
    },
    plan: {
      type: String,
      enum: Object.values(PLANS),
      default: PLANS.FREE
    },
    billingCycle: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'monthly'
    },
    paymentStatus: {
      type: String,
      enum: ['active', 'past_due', 'unpaid', 'cancelled', 'expired'],
      default: 'active',
      index: true
    },
    razorpaySubscriptionId: {
      type: String,
      sparse: true,
      index: true
    },
    currentStart: {
      type: Date,
      default: Date.now
    },
    currentEnd: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Default 30 days
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
