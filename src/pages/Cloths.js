// src/pages/Cloths.js

import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { allProducts } from '../data/productsData'; // Corrected import to use named export

const ClothsPage = ({ addToCart }) => {
  // Filter products by the "Cloths" category
  const cloths = allProducts.filter(p => p.category === "Cloths");

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredCloths = cloths.filter((product) => {
    const isMinPriceMet = minPrice === '' || product.price >= parseFloat(minPrice);
    const isMaxPriceMet = maxPrice === '' || product.price <= parseFloat(maxPrice);
    return isMinPriceMet && isMaxPriceMet;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <main className="max-w-7xl mx-auto">
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
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">Cloths</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredCloths.length > 0 ? (
            filteredCloths.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found matching your filter.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClothsPage;
