// src/pages/ProductDetail.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';

const allProducts = [
  // ... (all your product data)
];

const ProductDetailPage = ({ addToCart }) => { // Accept addToCart prop
  const { id } = useParams();
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 text-center">The product you are looking for does not exist.</p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">Go back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto md:h-full object-cover object-center"
          />
        </div>

        {/* Product Details */}
        <div className="p-6 md:p-8 md:w-1/2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6 text-sm sm:text-base">
            A comprehensive description of the product. This section can include details about features, materials, and care instructions to give the customer all the information they need to make a purchase decision.
          </p>
          <button
            onClick={() => addToCart(product)} // Add product to cart on click
            className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;