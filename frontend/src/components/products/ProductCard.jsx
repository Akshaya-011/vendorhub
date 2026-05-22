import React from 'react';
import { Star, ShoppingBag, Eye, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ 
  product, 
  index, 
  themeConfig = {}, 
  onAddToCart, 
  onProductPreview, 
  isHovered, 
  setHoveredId 
}) {
  const primaryColor = themeConfig.primaryColor || '#3B82F6';
  const textColor = themeConfig.textColor || '#0F172A';
  
  const price = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;

  const fallbackImage = 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=600&fit=crop';

  return (
    <motion.div
      onMouseEnter={() => setHoveredId(product._id || product.id)}
      onMouseLeave={() => setHoveredId(null)}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-2xl overflow-hidden border transition-all duration-300 relative flex flex-col h-full shadow-sm hover:shadow-xl hover:-translate-y-1"
      style={{ 
        borderColor: isHovered ? `${primaryColor}40` : `${textColor}0c`,
        boxShadow: isHovered ? `0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 0 15px -3px ${primaryColor}15` : 'none'
      }}
    >
      {/* Image Block */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0 w-full">
        <img 
          src={product.image || product.previewImage || fallbackImage} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />

        {/* Tag Badge */}
        {product.tag && (
          <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg text-white shadow-sm" style={{ backgroundColor: primaryColor }}>
            {product.tag}
          </span>
        )}

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={() => onProductPreview && onProductPreview(product)}
            className="p-3 bg-white text-gray-900 rounded-full shadow-lg transition-transform hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onAddToCart && onAddToCart(product)}
            className="p-3 text-white rounded-full shadow-lg transition-transform hover:scale-110"
            style={{ backgroundColor: primaryColor }}
            title="Add to Cart"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-extrabold opacity-50" style={{ color: textColor }}>
            {product.category || 'Collection'}
          </span>
          <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary-600 transition-colors" style={{ color: textColor }}>
            {product.name}
          </h3>
          {product.rating && (
            <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
            </div>
          )}
          {product.description && (
            <p className="text-xs line-clamp-2 mt-1.5 opacity-60" style={{ color: textColor }}>
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: `${textColor}0c` }}>
          <span className="font-black text-lg" style={{ color: textColor }}>
            {price}
          </span>
          <button
            onClick={() => onAddToCart && onAddToCart(product)}
            className="px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 hover:shadow-md flex items-center gap-1.5 border"
            style={{ 
              borderColor: `${primaryColor}30`, 
              color: primaryColor,
              backgroundColor: `${primaryColor}06`
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
