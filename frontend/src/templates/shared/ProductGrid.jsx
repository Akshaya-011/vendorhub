import React, { useState } from 'react';
import ProductCard from '../../components/products/ProductCard';

export default function ProductGrid({ products = [], themeConfig = {}, onAddToCart, onProductPreview }) {
  const primaryColor = themeConfig.primaryColor || '#3B82F6';
  const textColor = themeConfig.textColor || '#0F172A';
  const backgroundColor = themeConfig.backgroundColor || '#FFFFFF';

  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="products" className="py-20 sm:py-24" style={{ backgroundColor: backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 
            className="text-3xl sm:text-4xl font-display font-black tracking-tight mb-4"
            style={{ color: textColor }}
          >
            Featured Collections
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full mb-4" style={{ backgroundColor: primaryColor }} />
          <p className="text-sm sm:text-base opacity-70" style={{ color: textColor }}>
            Explore our curated catalog of premium handcrafted items designed specifically for your premium lifestyle.
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-2xl" style={{ borderColor: `${textColor}20` }}>
            <p className="opacity-60" style={{ color: textColor }}>No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <ProductCard
                key={product._id || product.id || i}
                product={product}
                index={i}
                themeConfig={themeConfig}
                onAddToCart={onAddToCart}
                onProductPreview={onProductPreview}
                isHovered={hoveredId === (product._id || product.id)}
                setHoveredId={setHoveredId}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
