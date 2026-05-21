const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
      index: true
    },
    eventType: {
      type: String,
      enum: ['pageview', 'click', 'sale', 'add_to_cart', 'session_start'],
      required: true,
      index: true
    },
    pageUrl: {
      type: String,
      default: '/'
    },
    visitorIp: String,
    userAgent: String,
    device: {
      type: String,
      enum: ['desktop', 'tablet', 'mobile', 'unknown'],
      default: 'desktop'
    },
    referrer: String,
    location: {
      country: { type: String, default: 'Unknown' },
      city: { type: String, default: 'Unknown' }
    },
    value: {
      type: Number, // records financial metrics e.g. for sales revenue
      default: 0
    },
    sessionId: {
      type: String,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Add index on vendorId and eventType for highly performant aggregate reporting
analyticsSchema.index({ vendorId: 1, eventType: 1, createdAt: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
