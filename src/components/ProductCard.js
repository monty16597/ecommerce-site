// src/components/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    // Link to the product details page using the product's ID
    <Link to={`/product/${product.id}`} className="block bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover object-center"
      />
      {/* Product Details (Name and Price) */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;