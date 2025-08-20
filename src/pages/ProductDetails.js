// src/pages/ProductDetails.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'https://7b23l62uacfekfihmefunsv2eu0gavxv.lambda-url.ca-central-1.on.aws/';

const ProductDetailsPage = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}?id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Product not found or network error');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
        setMainImage(data.thumbnailURL); // Set main image on initial load
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
        <div className="text-xl font-semibold">
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
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
  
  if (!product) {
    return <div className="text-center text-gray-500">Product data is not available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          {/* Main Image */}
          <img
            src={mainImage}
            alt={product.ItemName}
            className="w-full h-auto object-cover object-center rounded-lg mb-4"
          />
          {/* Image Gallery */}
          <div className="flex flex-wrap gap-2 justify-center">
            {product.images && product.images.length > 0 && product.images.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setMainImage(imgUrl)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform duration-200 hover:scale-110 ${mainImage === imgUrl ? 'ring-2 ring-blue-500' : ''}`}
              />
            ))}
          </div>
        </div>
        <div className="p-6 md:p-8 md:w-1/2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            {product.ItemName}
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6 text-sm sm:text-base">
            {product.description}
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