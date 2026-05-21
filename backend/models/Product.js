const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive']
    },
    compareAtPrice: {
      type: Number,
      default: null
    },
    category: {
      type: String,
      default: 'General'
    },
    images: [
      {
        type: String // Cloudinary secure URLs
      }
    ],
    sku: {
      type: String,
      trim: true
    },
    inventory: {
      type: Number,
      default: 0,
      min: [0, 'Inventory cannot be negative']
    },
    variants: [
      {
        name: String, // e.g. "Size"
        values: [String] // e.g. ["S", "M", "L"]
      }
    ],
    variantPrices: [
      {
        combination: String, // e.g. "Size:S"
        price: Number,
        inventory: Number
      }
    ],
    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
