// src/pages/Home.js

import React, { useRef, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ContactUs from '../components/ContactUs';

// !! Replace with your actual Lambda function URL
const API_URL = 'https://sqkdwhelxkfjod7vtn5xyxm3q40hhfcm.lambda-url.ca-central-1.on.aws/';

const HomePage = ({ addToCart }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newlyAddedItems, setNewlyAddedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const featuredScrollRef = useRef(null);
  const newItemsScrollRef = useRef(null);
  const [showFeaturedButtons, setShowFeaturedButtons] = useState({ left: false, right: true });
  const [showNewItemsButtons, setShowNewItemsButtons] = useState({ left: false, right: true });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch featured products
        const featuredResponse = await fetch(`${API_URL}?featured=true`);
        if (!featuredResponse.ok) {
          throw new Error(`HTTP error! status: ${featuredResponse.status}`);
        }
        const featuredData = await featuredResponse.json();
        setFeaturedProducts(featuredData);

        // Fetch all products to get the most recent ones
        const allProductsResponse = await fetch(API_URL);
        if (!allProductsResponse.ok) {
          throw new Error(`HTTP error! status: ${allProductsResponse.status}`);
        }
        const allProductsData = await allProductsResponse.json();
        // Sort by 'addedAt' timestamp and get the latest 10
        const sortedNewItems = allProductsData
          .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
          .slice(0, 10);
        setNewlyAddedItems(sortedNewItems);

        setLoading(false);
      } catch (e) {
        console.error("Failed to fetch products:", e);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Functions for handling horizontal scroll remain the same
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const checkScrollPosition = (ref, setButtons) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setButtons({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth,
      });
    }
  };

  useEffect(() => {
    const handleFeaturedScroll = () => checkScrollPosition(featuredScrollRef, setShowFeaturedButtons);
    const handleNewItemsScroll = () => checkScrollPosition(newItemsScrollRef, setShowNewItemsButtons);

    const featuredElement = featuredScrollRef.current;
    const newItemsElement = newItemsScrollRef.current;

    if (featuredElement) {
      featuredElement.addEventListener('scroll', handleFeaturedScroll);
      handleFeaturedScroll();
    }
    if (newItemsElement) {
      newItemsElement.addEventListener('scroll', handleNewItemsScroll);
      handleNewItemsScroll();
    }
    
    return () => {
      if (featuredElement) {
        featuredElement.removeEventListener('scroll', handleFeaturedScroll);
      }
      if (newItemsElement) {
        newItemsElement.removeEventListener('scroll', handleNewItemsScroll);
      }
    };
  }, [loading]); // Re-run effect when data loads

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* ... (Welcome section remains the same) ... */}
        <div className="text-center py-8 sm:py-16 mb-8 sm:mb-12 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-4">
            Welcome to My Site!
          </h1>
          <p className="text-sm sm:text-lg text-gray-600">
            A responsive starter template using React, React Router, and Tailwind CSS.
          </p>
        </div>

        {/* Featured Products Section */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">Featured Products</h2>
        <div className="relative">
          {showFeaturedButtons.left && (
            <div className="absolute top-0 left-0 bottom-0 w-24 z-10 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none"></div>
          )}
          <div ref={featuredScrollRef} className="flex flex-nowrap overflow-x-auto scrollbar-hide py-4 space-x-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div key={product.id} className="flex-none w-48 sm:w-64 md:w-80">
                  <ProductCard product={product} addToCart={addToCart} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No featured products found.</p>
            )}
          </div>
          {showFeaturedButtons.right && (
            <div className="absolute top-0 right-0 bottom-0 w-24 z-10 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>
          )}
          {showFeaturedButtons.left && (
            <button
              onClick={() => scroll(featuredScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-75 rounded-full p-2 ml-4 shadow-lg hover:bg-opacity-100 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12 15.75 4.5" />
              </svg>
            </button>
          )}
          {showFeaturedButtons.right && (
            <button
              onClick={() => scroll(featuredScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-75 rounded-full p-2 mr-4 shadow-lg hover:bg-opacity-100 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12 8.25 19.5" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Newly Added Items Section */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 mt-12 sm:mb-8">Newly Added Items</h2>
        <div className="relative">
          {showNewItemsButtons.left && (
            <div className="absolute top-0 left-0 bottom-0 w-24 z-10 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none"></div>
          )}
          <div ref={newItemsScrollRef} className="flex flex-nowrap overflow-x-auto scrollbar-hide py-4 space-x-6">
            {newlyAddedItems.length > 0 ? (
              newlyAddedItems.map((product) => (
                <div key={product.id} className="flex-none w-48 sm:w-64 md:w-80">
                  <ProductCard product={product} addToCart={addToCart} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No new products found.</p>
            )}
          </div>
          {showNewItemsButtons.right && (
            <div className="absolute top-0 right-0 bottom-0 w-24 z-10 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>
          )}
          {showNewItemsButtons.left && (
            <button
              onClick={() => scroll(newItemsScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-75 rounded-full p-2 ml-4 shadow-lg hover:bg-opacity-100 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12 15.75 4.5" />
              </svg>
            </button>
          )}
          {showNewItemsButtons.right && (
            <button
              onClick={() => scroll(newItemsScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-75 rounded-full p-2 mr-4 shadow-lg hover:bg-opacity-100 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12 8.25 19.5" />
              </svg>
            </button>
          )}
        </div>

        <div className="mx-auto max-w-lg md:max-w-2xl">
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default HomePage;