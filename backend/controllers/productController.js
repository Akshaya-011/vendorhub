const Product = require('../models/Product');
const AIContentGenerator = require('../ai-agent/services/aiContentGenerator');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Register a new product listing
 */
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, inventory, sku, variants, variantPrices } = req.body;
  const vendorId = req.vendor._id;

  // Let AI generate description if empty
  let finalDescription = description;
  if (!finalDescription || finalDescription.trim() === '') {
    try {
      const aiResult = await AIContentGenerator.generateContent(
        'product', 
        `Product name is: ${name}. Category is: ${category || 'General'}.`
      );
      finalDescription = aiResult.content;
    } catch (err) {
      finalDescription = 'Premium quality selection crafted carefully to meet your requirements.';
    }
  }

  const product = await Product.create({
    vendorId,
    name,
    price,
    description: finalDescription,
    category: category || 'General',
    inventory: inventory || 0,
    sku,
    variants: variants || [],
    variantPrices: variantPrices || []
  });

  ApiResponse.created(res, 'Product listing successfully added to inventory', product);
});

/**
 * Fetch all product listings of a vendor
 */
const getProducts = asyncHandler(async (req, res) => {
  const vendorId = req.vendor._id;
  const products = await Product.find({ vendorId, status: { $ne: 'archived' } });
  ApiResponse.success(res, 'Vendor product catalog retrieved', products);
});

/**
 * Fetch single product details
 */
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return ApiResponse.error(res, 'Product record not found', 404);
  }
  ApiResponse.success(res, 'Product details retrieved successfully', product);
});

/**
 * Edit product parameters
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!product) {
    return ApiResponse.error(res, 'Product record not found', 404);
  }
  ApiResponse.success(res, 'Product specifications updated successfully', product);
});

/**
 * Archive a product listing
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { status: 'archived' });
  if (!product) {
    return ApiResponse.error(res, 'Product record not found', 404);
  }
  ApiResponse.success(res, 'Product successfully archived from catalog listings');
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
