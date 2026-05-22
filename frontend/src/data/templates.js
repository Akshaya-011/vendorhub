// Front-end dynamic template database catalog
export const templatesData = [
  {
    id: 'bakery-deluxe',
    name: 'Sweet Crust Bakers',
    slug: 'bakery',
    category: 'Bakery',
    previewImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&fit=crop',
    description: 'Rustic warm theme perfect for craft bread bakeries, donut shops, and pastry stores.',
    themeConfig: {
      primaryColor: '#8B4513',
      secondaryColor: '#D2691E',
      backgroundColor: '#FFF8DC',
      textColor: '#5C4033',
      fontFamily: "'Playfair Display', serif"
    },
    tags: ['Rustic', 'Bakery', 'Organic'],
    products: [
      { id: 'b1', name: 'Signature Sourdough', price: 8.50, category: 'Bread', tag: 'Bestseller', description: 'Freshly baked using our 50-year-old sourdough starter, organic flour, and water.', image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=600&fit=crop' },
      { id: 'b2', name: 'Cinnamon Roll Deluxe', price: 4.50, category: 'Cakes & Pastries', tag: 'New', description: 'Sweet dough stuffed with premium Indonesian cinnamon and iced with organic glaze.', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&fit=crop' },
      { id: 'b3', name: 'Fresh Glazed Donut', price: 3.00, category: 'Donuts', tag: 'Popular', description: 'Sweet pillowy donut glazed with high-grade Belgian chocolate sauce.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&fit=crop' },
      { id: 'b4', name: 'Pain Au Chocolat', price: 4.00, category: 'Cakes & Pastries', tag: null, description: 'Flaky multi-layered puff pastry filled with bittersweet dark chocolate chips.', image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&fit=crop' }
    ]
  },
  {
    id: 'fashion-vogue',
    name: 'Atelier Vogue',
    slug: 'fashion',
    category: 'Fashion',
    previewImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&fit=crop',
    description: 'Minimalist high-contrast elegance with bold typography, perfect for lookbooks and modern boutiques.',
    themeConfig: {
      primaryColor: '#1E293B',
      secondaryColor: '#BE123C',
      backgroundColor: '#FAFAFA',
      textColor: '#0F172A',
      fontFamily: "'Playfair Display', Georgia, serif"
    },
    tags: ['Premium', 'Minimalist', 'Editorial'],
    products: [
      { id: 'f1', name: 'Organic Linen Dress', price: 110.00, category: 'Apparel', tag: 'Lookbook', description: 'Breathable lightweight linen summer dress tailored in neutral sandstone tones.', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&fit=crop' },
      { id: 'f2', name: 'Woven Straw Tote', price: 58.00, category: 'Accessories', tag: 'Trending', description: 'Eco-friendly handwoven palm fiber beach bag with calf leather straps.', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&fit=crop' },
      { id: 'f3', name: 'Classic Silk Scarves', price: 45.00, category: 'Accessories', tag: null, description: '100% natural Mulberry silk printed scarf featuring dynamic abstract artwork.', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&fit=crop' },
      { id: 'f4', name: 'Sandstone Leather Slide', price: 85.00, category: 'Footwear', tag: 'Bestseller', description: 'Cushioned organic leather flat sandals perfect for warm walks.', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&fit=crop' }
    ]
  },
  {
    id: 'grocery-mart',
    name: 'FreshCart Groceries',
    slug: 'grocery',
    category: 'Grocery',
    previewImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&fit=crop',
    description: 'Clean, emerald-accented daily essentials store with intuitive category filtering.',
    themeConfig: {
      primaryColor: '#10B981',
      secondaryColor: '#34D399',
      backgroundColor: '#F9FAFB',
      textColor: '#111827',
      fontFamily: "'Inter', sans-serif"
    },
    tags: ['Daily', 'Fresh', 'Essentials'],
    products: [
      { id: 'g1', name: 'Organic Bananas', price: 2.99, category: 'Produce', tag: 'Fresh', description: 'A bunch of fresh, organic yellow bananas.', image: 'https://images.unsplash.com/photo-1571501716641-55734107ccfa?w=600&fit=crop' },
      { id: 'g2', name: 'Almond Milk', price: 4.50, category: 'Dairy', tag: 'Vegan', description: 'Unsweetened almond milk, dairy-free alternative.', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&fit=crop' },
      { id: 'g3', name: 'Whole Wheat Bread', price: 3.50, category: 'Bakery', tag: null, description: 'Freshly baked whole wheat sandwich bread.', image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=600&fit=crop' },
      { id: 'g4', name: 'Mixed Nuts Snack', price: 8.99, category: 'Snacks', tag: 'Bestseller', description: 'A healthy mix of almonds, cashews, and walnuts.', image: 'https://images.unsplash.com/photo-1599598425947-33002620f443?w=600&fit=crop' }
    ]
  },
  {
    id: 'pickles-heritage',
    name: 'Heritage Pickles',
    slug: 'pickles',
    category: 'Pickles',
    previewImage: 'https://images.unsplash.com/photo-1589114471273-00e98032bf26?w=600&fit=crop',
    description: 'Traditional, warm theme showcasing homemade, sun-dried organic Indian pickles.',
    themeConfig: {
      primaryColor: '#B91C1C',
      secondaryColor: '#F59E0B',
      backgroundColor: '#FFFBEB',
      textColor: '#451A03',
      fontFamily: "'Playfair Display', serif"
    },
    tags: ['Traditional', 'Spicy', 'Homemade'],
    products: [
      { id: 'pi1', name: 'Spicy Mango Pickle', price: 12.00, category: 'Mango', tag: 'Classic', description: 'Traditional cut mango pickle infused with mustard and fenugreek.', image: 'https://images.unsplash.com/photo-1626200419188-f15e469bbca1?w=600&fit=crop' },
      { id: 'pi2', name: 'Tangy Lime Pickle', price: 10.00, category: 'Lime', tag: 'Popular', description: 'Sun-dried limes preserved in salt and mild red chilli.', image: 'https://images.unsplash.com/photo-1513682121497-80211f36a790?w=600&fit=crop' },
      { id: 'pi3', name: 'Garlic Chilli Mix', price: 14.50, category: 'Spicy', tag: 'Hot', description: 'Intensely spicy garlic cloves and green chillies in cold-pressed mustard oil.', image: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=600&fit=crop' },
      { id: 'pi4', name: 'Sweet Lemon Pickle', price: 11.00, category: 'Mixed', tag: null, description: 'A sweet and sour lemon preserve made with jaggery.', image: 'https://images.unsplash.com/photo-1578841772186-b413155700b0?w=600&fit=crop' }
    ]
  },
  {
    id: 'restaurant-omakase',
    name: 'Tavern Wood Fire',
    slug: 'restaurant',
    category: 'Restaurant',
    previewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&fit=crop',
    description: 'Appetizing visual design showcasing menus, table reservations, and smoking specialties.',
    themeConfig: {
      primaryColor: '#EA580C',
      secondaryColor: '#B45309',
      backgroundColor: '#FAF7F2',
      textColor: '#1C1917',
      fontFamily: "'Playfair Display', serif"
    },
    tags: ['Culinary', 'Cozy', 'Booking'],
    products: [
      { id: 'r1', name: 'Wood-Fired Ribeye', price: 42.00, category: 'Mains', tag: 'Chef Special', description: '16oz prime Angus beef smoked with oak firewood, finished with herb butter.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&fit=crop' },
      { id: 'r2', name: 'Charcoal Smoked Pizza', price: 18.50, category: 'Mains', tag: 'Popular', description: 'Naturally leavened sourdough topped with fresh burrata, basil and spicy salami.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&fit=crop' },
      { id: 'r3', name: 'Truffle Parmesan Fries', price: 9.00, category: 'Starters', tag: null, description: 'Hand-cut russet potatoes dusted with white truffle oil and fresh rosemary.', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&fit=crop' },
      { id: 'r4', name: 'Craft IPA Honey Beer', price: 8.00, category: 'Drinks', tag: 'Local Brew', description: 'Freshly tapped pale ale featuring notes of field clover honey and pine hops.', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&fit=crop' }
    ]
  },
  {
    id: 'healthcare-care',
    name: 'Elite Clinical Care',
    slug: 'healthcare',
    category: 'Healthcare',
    previewImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&fit=crop',
    description: 'Clean medical blue-accented clinical layout emphasizing clinical diagnostics and telehealth schedules.',
    themeConfig: {
      primaryColor: '#0284C7',
      secondaryColor: '#0D9488',
      backgroundColor: '#F8FAFC',
      textColor: '#1E293B',
      fontFamily: "'Inter', sans-serif"
    },
    tags: ['Clinical', 'Clean', 'Telehealth'],
    products: [
      { id: 'h1', name: 'Paracetamol 500mg', price: 5.00, category: 'Fever', tag: 'Essential', description: 'Fast relief from fever and mild to moderate pain.', image: 'https://images.unsplash.com/photo-1584308666744-24d5e47854f3?w=600&fit=crop' },
      { id: 'h2', name: 'Cough Syrup Expectorant', price: 12.50, category: 'Cold & Cough', tag: 'Popular', description: 'Relieves chest congestion and persistent coughing.', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&fit=crop' },
      { id: 'h3', name: 'Multivitamin Complex', price: 25.00, category: 'Vitamins', tag: 'Daily', description: 'Comprehensive daily multivitamin and mineral supplement.', image: 'https://images.unsplash.com/photo-1550572017-edb3df1ad070?w=600&fit=crop' },
      { id: 'h4', name: 'Blood Sugar Monitor kit', price: 45.00, category: 'Diabetes', tag: null, description: 'Complete kit including glucometer, test strips, and lancets.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&fit=crop' }
    ]
  },
  {
    id: 'education-academy',
    name: 'Academy Pro',
    slug: 'education',
    category: 'Education',
    previewImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&fit=crop',
    description: 'Trustworthy, structural green-accented academy layout tailored for courses, bootcamps and certifications.',
    themeConfig: {
      primaryColor: '#059669',
      secondaryColor: '#0284C7',
      backgroundColor: '#FCFDFB',
      textColor: '#1F2937',
      fontFamily: "'Inter', sans-serif"
    },
    tags: ['Academy', 'L.M.S', 'Bootcamps'],
    products: [
      { id: 'd1', name: 'Full-Stack JavaScript Boot', price: 899.00, category: 'Web Development', tag: 'Accredited', description: 'Comprehensive 12-week course covering React, Node, Express, and MongoDB architectures.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&fit=crop' },
      { id: 'd2', name: 'UX/UI Foundations Academy', price: 349.00, category: 'Design', tag: 'Popular', description: 'Self-paced wireframing, interactive prototyping, and Figma layout masteries.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&fit=crop' },
      { id: 'd3', name: 'Python Data Science Master', price: 499.00, category: 'Data Science', tag: 'Bestseller', description: 'Comprehensive machine learning models using NumPy, Pandas, and SciKit libraries.', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&fit=crop' },
      { id: 'd4', name: 'SaaS SEO Growth Roadmap', price: 199.00, category: 'Marketing', tag: null, description: 'Build high-traffic backlink structures, keyword targets, and load speed audits.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&fit=crop' }
    ]
  },
  {
    id: 'beauty-luxe',
    name: 'Luxe Petals Spa',
    slug: 'beauty',
    category: 'Beauty',
    previewImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&fit=crop',
    description: 'Pastel rose theme showcasing high-end skin care treatments, cosmetics and therapeutic massages.',
    themeConfig: {
      primaryColor: '#EC4899',
      secondaryColor: '#F472B6',
      backgroundColor: '#FFF5F5',
      textColor: '#4A1D1D',
      fontFamily: "'Playfair Display', serif"
    },
    tags: ['Cosmetics', 'Luxury Spa', 'Pastel'],
    products: [
      { id: 'u1', name: 'Aromatherapy Facial', price: 95.00, category: 'Services', tag: 'Signature', description: 'Hot stone steam facial infused with lavender oil and white clay skin masks.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&fit=crop' },
      { id: 'u2', name: 'Botanical Night Serum', price: 68.00, category: 'Lotions', tag: 'New Formula', description: 'Collagen-boosting nocturnal oil made from premium organic hibiscus seeds.', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&fit=crop' },
      { id: 'u3', name: 'Hydrating Mud Spa Wrap', price: 150.00, category: 'Services', tag: 'Indulge', description: 'Full-body dead sea nutrient mud wrapping session finishing with mineral baths.', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&fit=crop' },
      { id: 'u4', name: 'Rosewater Glow Toner', price: 32.00, category: 'Lotions', tag: null, description: 'Ph-balancing facial mist made from steam-distilled Bulgarian damask rose petals.', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&fit=crop' }
    ]
  },
  {
    id: 'paints-craze',
    name: 'ColorCraze Paints',
    slug: 'paints',
    category: 'Paints',
    previewImage: 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=600&fit=crop',
    description: 'Vibrant indigo theme optimized for displaying paint hues, palettes, and hardware items.',
    themeConfig: {
      primaryColor: '#6366F1',
      secondaryColor: '#8B5CF6',
      backgroundColor: '#FAFAFA',
      textColor: '#1E293B',
      fontFamily: "'Inter', sans-serif"
    },
    tags: ['Colors', 'Hardware', 'Interiors'],
    products: [
      { id: 'pt1', name: 'Premium Interior Matte (White)', price: 45.00, category: 'Interior', tag: 'Bestseller', description: 'Washable, anti-fungal premium white matte finish wall paint. 1 Gallon.', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&fit=crop' },
      { id: 'pt2', name: 'WeatherProtect Exterior (Grey)', price: 65.00, category: 'Exterior', tag: 'Durable', description: 'Harsh weather resistant exterior emulsion paint. 1 Gallon.', image: 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=600&fit=crop' },
      { id: 'pt3', name: 'Glossy Enamel (Black)', price: 25.00, category: 'Enamel', tag: null, description: 'High-gloss oil-based enamel for wood and metal surfaces. 1 Quart.', image: 'https://images.unsplash.com/photo-1572293007244-8b603eebe8b1?w=600&fit=crop' },
      { id: 'pt4', name: 'Pro Roller Brush Set', price: 18.50, category: 'Brushes', tag: 'Essential', description: 'Professional grade 9-inch roller with two microfiber sleeves and a tray.', image: 'https://images.unsplash.com/photo-1583847268964-b28e5f8f9479?w=600&fit=crop' }
    ]
  }
];
