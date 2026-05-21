const mongoose = require('mongoose');
const { PLANS } = require('../utils/constants');

const vendorSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: [true, 'Business Name is required'],
      trim: true
    },
    businessType: {
      type: String,
      required: [true, 'Business Type is required'], // e.g. Bakery, Beauty, E-commerce
      trim: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: false
    },
    subdomain: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    customDomain: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true
    },
    subscriptionPlan: {
      type: String,
      enum: Object.values(PLANS),
      default: PLANS.FREE
    },
    subscriptionStatus: {
      type: String,
      default: 'active'
    },
    published: {
      type: Boolean,
      default: false
    },
    logo: String,
    bannerImage: String,
    description: String,
    contactEmail: String,
    contactPhone: String,
    address: String,
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Vendor', vendorSchema);
