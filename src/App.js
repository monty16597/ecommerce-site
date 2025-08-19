// src/app.js

import React, { useState, useEffect } from 'react'; // Import useEffect
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import NavBar from './components/Navbar';
import BedSheetPage from './pages/BedSheet';
import ProductDetailPage from './pages/ProductDetail';
import ClothsPage from './pages/Cloths';
import CartPage from './pages/Cart';

function App() {
  // Initialize state with data from localStorage or an empty array
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      return [];
    }
  });

  // useEffect to save the cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]); // The dependency array ensures this runs only when 'cart' changes

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  
  return (
    <BrowserRouter>
      <NavBar cartItemCount={cart.length} />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/bedsheets" element={<BedSheetPage addToCart={addToCart} />} />
        <Route path="/cloths" element={<ClothsPage addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} setCart={setCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;