import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Search, Filter, Star, ChevronRight } from 'lucide-react';

// Mock data for a vendor's store
const VENDOR_DATA = {
  name: "Mitchell's Boutique",
  description: "Curated modern fashion and accessories for everyday elegance.",
  coverImage: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
  logoColor: "from-amber-400 to-orange-500",
  rating: 4.8,
  reviews: 124,
  products: [
    { id: 1, name: 'Linen Summer Dress', price: '$89.00', image: 'bg-amber-50', tag: 'Bestseller' },
    { id: 2, name: 'Woven Straw Tote', price: '$45.00', image: 'bg-orange-50', tag: 'New' },
    { id: 3, name: 'Minimalist Gold Hoops', price: '$32.00', image: 'bg-yellow-50', tag: null },
    { id: 4, name: 'Classic White Sneaker', price: '$110.00', image: 'bg-stone-50', tag: null },
    { id: 5, name: 'Silk Sleep Mask', price: '$24.00', image: 'bg-rose-50', tag: 'Sale' },
    { id: 6, name: 'Tortoise Shell Sunglasses', price: '$58.00', image: 'bg-amber-100', tag: null },
  ]
};

export default function VendorStore() {
  const { vendorSlug } = useParams();
  // In a real app, you would fetch vendor data based on vendorSlug
  // const { data, isLoading } = useQuery(['vendor', vendorSlug], fetchVendor);
  
  const store = VENDOR_DATA;

  return (
    <div className="min-h-screen bg-white">
      {/* Platform Header (Optional, for navigation back to VendorHub) */}
      <div className="bg-gray-900 text-white py-2 px-4 flex items-center justify-between text-xs font-medium">
        <span>Powered by VendorHub</span>
        <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center">
          Create your own store <ChevronRight className="w-3 h-3 ml-1" />
        </Link>
      </div>

      {/* Store Header / Hero */}
      <div 
        className="h-64 sm:h-80 w-full relative"
        style={{ background: store.coverImage }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        
        {/* Store Profile Area */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12 border border-gray-100">
          {/* Logo */}
          <div className={`w-32 h-32 rounded-full border-4 border-white shadow-md bg-gradient-to-br ${store.logoColor} flex items-center justify-center flex-shrink-0 text-white text-4xl font-bold`}>
            {store.name.charAt(0)}
          </div>
          
          <div className="flex-1 text-center sm:text-left mt-2">
            <h1 className="text-3xl font-display font-bold text-gray-900">{store.name}</h1>
            <p className="text-gray-500 mt-2 max-w-2xl">{store.description}</p>
            
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 text-sm">
              <div className="flex items-center text-amber-500 font-medium">
                <Star className="w-4 h-4 fill-current mr-1" />
                {store.rating} ({store.reviews} reviews)
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">Free shipping over $50</span>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-md flex items-center justify-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Cart (0)
            </button>
          </div>
        </div>

        {/* Storefront Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search store..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {store.products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className={`relative aspect-[4/5] rounded-2xl mb-4 overflow-hidden ${product.image} flex items-center justify-center`}>
                {/* Simulated product image shape */}
                <div className="w-3/4 h-3/4 bg-white/40 backdrop-blur-sm rounded-xl shadow-sm transform group-hover:scale-105 transition-transform duration-300" />
                
                {product.tag && (
                  <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-md ${
                    product.tag === 'Sale' ? 'bg-red-500 text-white' : 'bg-gray-900 text-white'
                  }`}>
                    {product.tag}
                  </span>
                )}

                {/* Add to cart overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black/50 to-transparent">
                  <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 text-lg group-hover:text-amber-600 transition-colors">{product.name}</h3>
                <p className="text-gray-500 mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
