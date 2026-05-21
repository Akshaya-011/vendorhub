const mongoose = require('mongoose');
const { TEMPLATE_CATEGORIES } = require('../utils/constants');

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: TEMPLATE_CATEGORIES,
      required: true,
      index: true
    },
    previewImage: {
      type: String,
      required: true
    },
    description: String,
    layoutData: {
      type: mongoose.Schema.Types.Mixed, // The complete JSON section list representation
      required: true
    },
    themeConfig: {
      primaryColor: { type: String, default: '#3B82F6' },
      secondaryColor: { type: String, default: '#1E293B' },
      backgroundColor: { type: String, default: '#FFFFFF' },
      textColor: { type: String, default: '#0F172A' },
      fontFamily: { type: String, default: 'Inter' }
    },
    isPremium: {
      type: Boolean,
      default: false
    },
    usageCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Template', templateSchema);
