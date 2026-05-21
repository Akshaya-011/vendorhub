const mongoose = require('mongoose');

const aiHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      index: true
    },
    prompt: {
      type: String,
      required: true
    },
    response: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['website', 'seo', 'marketing', 'content', 'chatbot', 'analytics'],
      required: true,
      index: true
    },
    tokensUsed: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('AIHistory', aiHistorySchema);
