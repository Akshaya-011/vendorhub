const Vendor = require('../models/Vendor');
const Template = require('../models/Template');
const Website = require('../models/Website');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Fetch active merchant profile details
 */
const getProfile = asyncHandler(async (req, res) => {
  const vendor = req.vendor; // Pre-populated by verifyVendorAccess
  ApiResponse.success(res, 'Merchant profile retrieved successfully', vendor);
});

/**
 * Update merchant branding and domain details
 */
const updateProfile = asyncHandler(async (req, res) => {
  const vendorId = req.vendor._id;
  const vendor = await Vendor.findByIdAndUpdate(vendorId, req.body, {
    new: true,
    runValidators: true
  });
  ApiResponse.success(res, 'Merchant profile updated successfully', vendor);
});

/**
 * Assign selected template to merchant
 */
const selectTemplate = asyncHandler(async (req, res) => {
  const { vendorId, template } = req.body;
  const activeVendorId = vendorId || (req.vendor && req.vendor._id);

  if (!activeVendorId) {
    return ApiResponse.error(res, 'Vendor identification is required', 400);
  }

  // Find the Template matching the provided slug/category in MongoDB
  const matchedTemplate = await Template.findOne({ category: String(template).toLowerCase().trim() });
  
  // Find and update the Vendor record
  const vendor = await Vendor.findById(activeVendorId);
  if (!vendor) {
    return ApiResponse.error(res, 'Vendor record not found', 404);
  }

  if (matchedTemplate) {
    vendor.templateId = matchedTemplate._id;
    // Bump template usage statistics
    matchedTemplate.usageCount = (matchedTemplate.usageCount || 0) + 1;
    await matchedTemplate.save();
  }
  
  await vendor.save();

  // Create or update corresponding Website layouts and theme systems
  let website = await Website.findOne({ vendorId: activeVendorId });
  const baseTheme = matchedTemplate ? matchedTemplate.themeConfig : {
    primaryColor: '#3B82F6',
    secondaryColor: '#1E293B',
    backgroundColor: '#FFFFFF',
    textColor: '#0F172A',
    fontFamily: 'Inter'
  };

  if (!website) {
    website = await Website.create({
      vendorId: activeVendorId,
      pages: [
        {
          title: 'Home',
          slug: 'home',
          sections: matchedTemplate ? matchedTemplate.layoutData : [],
          seo: {
            title: `${vendor.businessName} - Home`,
            description: `Welcome to the official website of ${vendor.businessName}`
          }
        }
      ],
      theme: baseTheme,
      published: true
    });
  } else {
    website.theme = baseTheme;
    if (matchedTemplate && matchedTemplate.layoutData) {
      website.pages[0].sections = matchedTemplate.layoutData;
    }
    await website.save();
  }

  ApiResponse.success(res, 'Template assigned and Website initialized successfully', {
    vendor,
    website
  });
});

/**
 * Public storefront retriever for a vendor subdomain
 */
const getPublicStore = asyncHandler(async (req, res) => {
  const { subdomain } = req.params;
  
  const vendor = await Vendor.findOne({ subdomain: String(subdomain).toLowerCase().trim() }).populate('templateId');
  
  if (!vendor) {
    return ApiResponse.error(res, 'Storefront record not found', 404);
  }

  // Retrieve products listing
  const Product = require('../models/Product');
  const products = await Product.find({ vendorId: vendor._id, status: { $ne: 'archived' } });

  ApiResponse.success(res, 'Public storefront details retrieved', {
    vendor: {
      businessName: vendor.businessName,
      description: vendor.description,
      logo: vendor.logo,
      contactEmail: vendor.contactEmail,
      contactPhone: vendor.contactPhone,
      address: vendor.address,
      bannerImage: vendor.bannerImage,
      assignedTemplate: vendor.templateId ? vendor.templateId.category : 'fashion',
      themeConfig: vendor.templateId ? vendor.templateId.themeConfig : {}
    },
    products
  });
});

module.exports = {
  getProfile,
  updateProfile,
  selectTemplate,
  getPublicStore
};

