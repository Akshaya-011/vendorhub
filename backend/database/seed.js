const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Template = require('../models/Template');
const logger = require('../utils/logger');

const connectDB = async () => {
  const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/vendorhub';
  await mongoose.connect(connStr);
};

const templates = [
  {
    name: 'Sweet Crust Bakers',
    category: 'bakery',
    previewImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&fit=crop',
    description: 'Rustic warm theme perfect for craft bread bakeries, donut shops, and pastry stores.',
    isPremium: false,
    themeConfig: {
      primaryColor: '#8B4513',
      secondaryColor: '#D2691E',
      backgroundColor: '#FFF8DC',
      textColor: '#5C4033',
      fontFamily: "'Playfair Display', serif"
    },
    layoutData: [
      { id: 'hero-bakery', name: 'Bakery Hero', type: 'hero', components: [{ id: 'b-title', type: 'text', content: 'Crafted Sourdough & Freshly Baked Goods' }] }
    ]
  },
  {
    name: 'Atelier Vogue',
    category: 'fashion',
    previewImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&fit=crop',
    description: 'Minimalist high-contrast elegance with bold typography, perfect for lookbooks and modern boutiques.',
    isPremium: false,
    themeConfig: {
      primaryColor: '#1E293B',
      secondaryColor: '#BE123C',
      backgroundColor: '#FAFAFA',
      textColor: '#0F172A',
      fontFamily: "'Playfair Display', Georgia, serif"
    },
    layoutData: [
      { id: 'hero-fashion', name: 'Fashion Hero', type: 'hero', components: [{ id: 'f-title', type: 'text', content: 'Minimalist Editorial Silhouette' }] }
    ]
  },
  {
    name: 'FreshCart Groceries',
    category: 'grocery',
    previewImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&fit=crop',
    description: 'Clean, emerald-accented daily essentials store with intuitive category filtering.',
    isPremium: false,
    themeConfig: {
      primaryColor: '#10B981',
      secondaryColor: '#34D399',
      backgroundColor: '#F9FAFB',
      textColor: '#111827',
      fontFamily: "'Inter', sans-serif"
    },
    layoutData: [
      { id: 'hero-grocery', name: 'Grocery Hero', type: 'hero', components: [{ id: 'g-title', type: 'text', content: 'Your daily essentials, delivered' }] }
    ]
  },
  {
    name: 'Heritage Pickles',
    category: 'pickles',
    previewImage: 'https://images.unsplash.com/photo-1589114471273-00e98032bf26?w=600&fit=crop',
    description: 'Traditional, warm theme showcasing homemade, sun-dried organic Indian pickles.',
    isPremium: false,
    themeConfig: {
      primaryColor: '#B91C1C',
      secondaryColor: '#F59E0B',
      backgroundColor: '#FFFBEB',
      textColor: '#451A03',
      fontFamily: "'Playfair Display', serif"
    },
    layoutData: [
      { id: 'hero-pickles', name: 'Pickles Hero', type: 'hero', components: [{ id: 'p-title', type: 'text', content: 'Authentic Homemade Pickles' }] }
    ]
  },
  {
    name: 'Tavern Wood Fire',
    category: 'restaurant',
    previewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&fit=crop',
    description: 'Appetizing visual design showcasing menus, table reservations, and smoking specialties.',
    isPremium: false,
    themeConfig: {
      primaryColor: '#EA580C',
      secondaryColor: '#B45309',
      backgroundColor: '#FAF7F2',
      textColor: '#1C1917',
      fontFamily: "'Playfair Display', serif"
    },
    layoutData: [
      { id: 'hero-restaurant', name: 'Tavern Hero', type: 'hero', components: [{ id: 'r-title', type: 'text', content: 'Slow-Cooked Smokehouse Barbecue' }] }
    ]
  },
  {
    name: 'Elite Clinical Care',
    category: 'healthcare',
    previewImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&fit=crop',
    description: 'Clean medical blue-accented clinical layout emphasizing clinical diagnostics and telehealth schedules.',
    isPremium: false,
    themeConfig: {
      primaryColor: '#0284C7',
      secondaryColor: '#0D9488',
      backgroundColor: '#F8FAFC',
      textColor: '#1E293B',
      fontFamily: "'Inter', sans-serif"
    },
    layoutData: [
      { id: 'hero-health', name: 'Clinics Hero', type: 'hero', components: [{ id: 'h-title', type: 'text', content: 'Pediatric & Cardiovascular consults' }] }
    ]
  },
  {
    name: 'Academy Pro',
    category: 'education',
    previewImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&fit=crop',
    description: 'Trustworthy, structural green-accented academy layout tailored for courses, bootcamps and certifications.',
    isPremium: false,
    themeConfig: {
      primaryColor: '#059669',
      secondaryColor: '#0284C7',
      backgroundColor: '#FCFDFB',
      textColor: '#1F2937',
      fontFamily: "'Inter', sans-serif"
    },
    layoutData: [
      { id: 'hero-edu', name: 'Academy Hero', type: 'hero', components: [{ id: 'd-title', type: 'text', content: 'Acquire verified graduation badges' }] }
    ]
  },
  {
    name: 'Luxe Petals Spa',
    category: 'beauty',
    previewImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&fit=crop',
    description: 'Pastel rose theme showcasing high-end skin care treatments, cosmetics and therapeutic massages.',
    isPremium: true,
    themeConfig: {
      primaryColor: '#EC4899',
      secondaryColor: '#F472B6',
      backgroundColor: '#FFF5F5',
      textColor: '#4A1D1D',
      fontFamily: "'Playfair Display', serif"
    },
    layoutData: [
      { id: 'hero-beauty', name: 'Beauty Hero', type: 'hero', components: [{ id: 'u-title', type: 'text', content: 'Botanical Lotus oils & spa therapies' }] }
    ]
  },
  {
    name: 'ColorCraze Paints',
    category: 'paints',
    previewImage: 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=600&fit=crop',
    description: 'Vibrant indigo theme optimized for displaying paint hues, palettes, and hardware items.',
    isPremium: true,
    themeConfig: {
      primaryColor: '#6366F1',
      secondaryColor: '#8B5CF6',
      backgroundColor: '#FAFAFA',
      textColor: '#1E293B',
      fontFamily: "'Inter', sans-serif"
    },
    layoutData: [
      { id: 'hero-paints', name: 'Paints Hero', type: 'hero', components: [{ id: 'pt-title', type: 'text', content: 'Flawless colors for your walls' }] }
    ]
  }
];

const seedDatabase = async () => {
  try {
    logger.info('Connecting to Database to execute seed job...');
    await connectDB();
    logger.info('Connected! Cleaning old template records...');
    
    await Template.deleteMany();
    logger.info('Old templates cleared. Injecting 9 custom templates...');
    
    await Template.insertMany(templates);
    logger.success('9 Templates seeded successfully into catalog!');
    
    mongoose.connection.close();
    logger.info('Database connection closed safely. Seed job finished.');
  } catch (error) {
    logger.error('Seed operation failed: ', error);
    process.exit(1);
  }
};

seedDatabase();
