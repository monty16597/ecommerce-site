// src/pages/Home.js

import ProductCard from '../components/ProductCard';

const HomePage = ({ addToCart }) => { // FIX: Accept addToCart prop
  const products = [
    { id: 1, name: "Stylish Backpack", price: 49.99, image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Backpack" },
    { id: 2, name: "Premium Headphones", price: 199.99, image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Headphones" },
    { id: 3, name: "Digital Watch", price: 79.99, image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Watch" },
    { id: 4, name: "Portable Speaker", price: 89.99, image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Speaker" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-8 sm:py-16 mb-8 sm:mb-12 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-4">
            Welcome to My Site!
          </h1>
          <p className="text-sm sm:text-lg text-gray-600">
            A responsive starter template using React, React Router, and Tailwind CSS.
          </p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;