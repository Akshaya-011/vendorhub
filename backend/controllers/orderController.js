const Order = require('../models/Order');
const Product = require('../models/Product');
const NotificationService = require('../services/notificationService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Handle new consumer checkout purchases
 */
const createOrder = asyncHandler(async (req, res) => {
  const { vendorId, customerDetails, items, subtotal, tax, shippingFee, totalAmount, paymentId } = req.body;

  // Deduct products inventory parameters immediately
  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (product) {
      product.inventory = Math.max(0, product.inventory - item.quantity);
      await product.save();
    }
  }

  const order = await Order.create({
    vendorId,
    customerDetails,
    items,
    subtotal,
    tax,
    shippingFee,
    totalAmount,
    paymentStatus: 'success', // Simulated success capture
    paymentId
  });

  // Log notifications to the merchant alert dashboard
  try {
    const ProductModule = require('../models/Product');
    const firstItem = items[0] ? items[0].name : 'Product';
    
    // Find Vendor owner
    const VendorModule = require('../models/Vendor');
    const vendor = await VendorModule.findById(vendorId);
    
    if (vendor) {
      await NotificationService.sendNotification({
        userId: vendor.ownerId,
        vendorId,
        title: 'New Checkout Order Captured!',
        message: `${customerDetails.name} bought ${firstItem} worth ₹${totalAmount}.`,
        type: 'success',
        link: `/orders/${order._id}`
      });
    }
  } catch (err) {
    // Notify log failures shouldn't block checkout completion responses
  }

  ApiResponse.created(res, 'Checkout order completed successfully', order);
});

/**
 * Fetch merchant incoming orders listing
 */
const getOrders = asyncHandler(async (req, res) => {
  const vendorId = req.vendor._id;
  const orders = await Order.find({ vendorId }).sort({ createdAt: -1 });
  ApiResponse.success(res, 'Orders list loaded successfully', orders);
});

/**
 * Shift shipment progress parameters
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  const order = await Order.findByIdAndUpdate(
    id,
    { orderStatus },
    { new: true }
  );

  if (!order) {
    return ApiResponse.error(res, 'Order record not found', 404);
  }

  ApiResponse.success(res, 'Order delivery status updated successfully', order);
});

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus
};
