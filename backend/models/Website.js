const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  id: String,
  type: String, // e.g. text, button, image, video, productGrid
  content: mongoose.Schema.Types.Mixed, // flexible structured content
  styles: mongoose.Schema.Types.Mixed  // custom CSS-like styling options
});

const sectionSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String, // e.g. hero, aboutUs, contactForm, gallery
  layout: String, // e.g. single-col, two-col
  components: [componentSchema],
  styles: mongoose.Schema.Types.Mixed
});

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  sections: [sectionSchema],
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }
});

const websiteSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
      unique: true,
      index: true
    },
    pages: [pageSchema],
    theme: {
      primaryColor: { type: String, default: '#3B82F6' },
      secondaryColor: { type: String, default: '#1E293B' },
      backgroundColor: { type: String, default: '#FFFFFF' },
      textColor: { type: String, default: '#0F172A' },
      fontFamily: { type: String, default: 'Inter' }
    },
    seoSettings: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      googleAnalyticsId: String,
      robotsTxt: String
    },
    published: {
      type: Boolean,
      default: false
    },
    draft: {
      pages: mongoose.Schema.Types.Mixed,
      theme: mongoose.Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Website', websiteSchema);
