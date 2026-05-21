const lucide = require('lucide-react');
const iconsToCheck = [
  'Sparkles', 'PlayCircle', 'CheckCircle2', 'Type', 'Image', 'MousePointerSquare', 
  'Layout', 'Square', 'Video', 'FormInput', 'MessageSquare', 'Plus', 'ArrowRight',
  'Store', 'Globe', 'Menu', 'X', 'Eye', 'LayoutGrid', 'Smartphone', 'ShoppingCart', 
  'Search', 'Headset', 'Mail', 'Share2', 'BarChart3', 'Target', 'Heart',
  'Monitor', 'Tablet', 'Star', 'Twitter', 'Instagram', 'Linkedin', 'Github'
];

const missing = [];
for (const icon of iconsToCheck) {
  if (!lucide[icon]) {
    missing.push(icon);
  }
}

console.log('Missing icons:', missing);
