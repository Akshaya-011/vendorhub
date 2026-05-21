const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      index: true
    },
    name: {
      type: String,
      required: true,
      default: 'Default Theme'
    },
    brandColors: {
      primary: { type: String, default: '#3B82F6' },
      secondary: { type: String, default: '#1E293B' },
      accent: { type: String, default: '#F59E0B' },
      background: { type: String, default: '#FFFFFF' },
      text: { type: String, default: '#0F172A' }
    },
    typography: {
      headingFont: { type: String, default: 'Outfit' },
      bodyFont: { type: String, default: 'Inter' }
    },
    darkTheme: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Theme', themeSchema);
