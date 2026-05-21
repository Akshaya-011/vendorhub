const mongoose = require('mongoose');
const { ORDER_STATUS, PAYMENT_STATUS } = require('../utils/constants');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  variantSelected: {
    type: String,
    default: ''
  }
});

const orderSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
      index: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // guest checkout is allowed
    },
    customerDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      shippingAddress: {
        addressLine1: { type: String, required: true },
        addressLine2: String,
        city: { type: String, required: true },
        state: String,
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
      }
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      default: 0
    },
    shippingFee: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING
    },
    paymentId: {
      type: String // references Payment.js or raw razorpay details
    },
    orderStatus: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
