// src/pages/BedSheet.js

import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const BedSheetPage = () => {
  // Mock data for bedsheet products.
  const bedsheets = [
    { id: 5, name: "Luxury Cotton Bedsheet Set", price: 79.99, image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+1" },
    { id: 6, name: "Silk Blend Bedding", price: 129.50, image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+2" },
    { id: 7, name: "Striped Duvet Cover", price: 59.99, image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+3" },
    { id: 8, name: "Solid Color Comforter", price: 89.00, image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+4" },
    { id: 9, name: "Floral Pattern Sheet", price: 65.75, image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+5" },
    { id: 10, name: "Geometric Print Set", price: 95.25, image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+6" },
  ];

  // State to manage the filter inputs
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Function to filter products based on state
  const filteredBedsheets = bedsheets.filter((product) => {
    const isMinPriceMet = minPrice === '' || product.price >= parseFloat(minPrice);
    const isMaxPriceMet = maxPrice === '' || product.price <= parseFloat(maxPrice);
    return isMinPriceMet && isMaxPriceMet;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <main className="max-w-7xl mx-auto">
        {/* Filter Panel at the top */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sm:mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <h3 className="text-md font-semibold text-gray-700">Price Range:</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Min:</span>
              <input
                type="number"
                className="w-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span className="text-sm text-gray-500">Max:</span>
              <input
                type="number"
                className="w-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Product Listing Section */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">Bedsheets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredBedsheets.length > 0 ? (
            filteredBedsheets.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found matching your filter.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default BedSheetPage;