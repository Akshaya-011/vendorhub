// RestaurantTemplate.jsx – Premium restaurant template component
import React from 'react';

// Example default theme for restaurant template
export const defaultTheme = {
  colors: {
    primary: '#c0392b', // deep red for a vibrant restaurant feel
    background: '#fdf2e9',
    accent: '#e67e22',
  },
  fonts: {
    header: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
};

/**
 * RestaurantTemplate renders a premium restaurant landing page.
 * It receives vendorData, products, and themeConfig props similar to other templates.
 */
export default function RestaurantTemplate({ vendorData = {}, products = [], themeConfig = {} }) {
  const mergedTheme = { ...defaultTheme, ...themeConfig };
  return (
    <section style={{ background: mergedTheme.colors.background, color: mergedTheme.colors.primary, fontFamily: mergedTheme.fonts.body }}>
      <header style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: mergedTheme.fonts.header, margin: 0 }}>
          {vendorData?.businessName || 'Restaurant'}
        </h1>
        <p>{vendorData?.tagline || 'Delicious experiences await'}</p>
      </header>
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', padding: '1rem' }}>
        {products.map((product, idx) => (
          <article key={idx} style={{ border: `1px solid ${mergedTheme.colors.accent}`, borderRadius: '8px', padding: '1rem' }}>
            <h2>{product.title || `Dish ${idx + 1}`}</h2>
            <p>{product.description}</p>
            {product.price && <strong>{product.price}</strong>}
          </article>
        ))}
      </main>
    </section>
  );
}
