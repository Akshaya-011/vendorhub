import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Loader2, Sparkles } from 'lucide-react';
import WebsiteRenderer from '../components/WebsiteRenderer';
import { templatesData } from '../data/templates';

export default function VendorStore() {
  const { vendorSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [storeData, setStoreData] = useState(null);
  const [products, setProducts] = useState([]);
  const [templateKey, setTemplateKey] = useState('fashion');
  const [themeConfig, setThemeConfig] = useState({});

  useEffect(() => {
    const loadStorefront = async () => {
      setLoading(true);
      
      try {
        // Attempt to fetch public merchant profile and catalog from backend
        const response = await fetch(`http://localhost:5000/api/v1/vendors/public/${vendorSlug}`);
        
        if (!response.ok) {
          throw new Error('Public storefront lookup offline, simulating presets');
        }

        const resData = await response.json();
        const { vendor, products: vendorProducts } = resData.data;

        setStoreData(vendor);
        setProducts(vendorProducts);
        setTemplateKey(vendor.assignedTemplate || 'fashion');
        setThemeConfig(vendor.themeConfig || {});
        
      } catch (err) {
        console.warn('Using client-side simulated template presets for slug:', vendorSlug);
        
        // Match the slug with templatesData categories or default presets
        const matchedTemplate = templatesData.find(
          (t) => t.slug === vendorSlug || t.id === vendorSlug
        ) || templatesData.find((t) => t.slug === 'fashion');

        // Check if there is a customized local mock profile stored in localStorage
        const storedUser = localStorage.getItem('vendorhub_user');
        let localVendor = null;
        
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          // If the logged-in merchant is viewing their store, populate custom layout
          if (parsed.storeSlug === vendorSlug || parsed.assignedTemplate === vendorSlug) {
            localVendor = {
              businessName: parsed.storeName || parsed.name + "'s Store",
              description: 'Your beautiful custom storefront dynamically compiled by the VendorHub rendering engine.',
              logo: parsed.avatar,
              contactEmail: parsed.email
            };
          }
        }

        setStoreData(localVendor || {
          businessName: matchedTemplate.name,
          description: matchedTemplate.description,
          bannerImage: matchedTemplate.previewImage
        });

        setProducts(matchedTemplate.products);
        setTemplateKey(matchedTemplate.slug);
        setThemeConfig(matchedTemplate.themeConfig);
      } finally {
        setLoading(false);
      }
    };

    loadStorefront();
  }, [vendorSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
        <p className="text-xs uppercase tracking-widest font-semibold text-slate-400">Compiling Storefront Engine...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Dynamic Floating Brand Badge back to VendorHub */}
      <div className="bg-slate-900 text-white py-2 px-4 flex items-center justify-between text-xs font-semibold z-50 relative border-b border-white/5">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Powered by VendorHub Tenant Engine
        </span>
        <Link to="/" className="text-slate-300 hover:text-white transition-colors flex items-center gap-0.5">
          Build your own store <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Render Dynamic Website */}
      <WebsiteRenderer 
        templateKey={templateKey}
        vendorData={storeData}
        products={products}
        themeConfig={themeConfig}
      />
    </div>
  );
}
