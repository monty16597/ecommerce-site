// src/pages/ProductDetails.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// !! Replace with your actual Lambda function URL
const API_URL = 'https://sqkdwhelxkfjod7vtn5xyxm3q40hhfcm.lambda-url.ca-central-1.on.aws/';

const ProductDetailsPage = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // The Lambda function doesn't support a direct ID query, so we'll fetch all products
        // and find the one with the matching ID. This is a common pattern for simple APIs.
        // For production, you might create a new Lambda function that queries by ID.
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const foundProduct = data.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found.");
        }
        setLoading(false);
      } catch (e) {
        console.error("Failed to fetch product:", e);
        setError("Failed to load product details. Please try again later.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{error}</h1>
        <p className="text-gray-600 text-center">The product you are looking for does not exist or an error occurred.</p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">Go back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto md:h-full object-cover object-center"
          />
        </div>
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
            onClick={() => addToCart(product)}
            className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;