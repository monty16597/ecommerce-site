// src/components/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      {/* Product Image and Link to Detail Page */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnailURL}
          alt={product.ItemName}
          className="w-full h-48 object-cover object-center"
        />
      </Link>
      {/* Product Details (Name, Price, and Add to Cart Button) */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.ItemName}</h3>
        <p className="text-xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;