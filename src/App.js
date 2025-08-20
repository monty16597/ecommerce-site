// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import NavBar from './components/NavBar';
import BedPage from './pages/Bed';
import ProductDetailsPage from './pages/ProductDetails';
import ClothsPage from './pages/Cloths';
import CartPage from './pages/Cart';
import AdminPage from './pages/Admin'; // <-- Import the new Admin page

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
 }, [cart]);

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
    <Route path="/bed" element={<BedPage addToCart={addToCart} />} />
    <Route path="/cloths" element={<ClothsPage addToCart={addToCart} />} />
    <Route path="/product/:id" element={<ProductDetailsPage addToCart={addToCart} />} />
    <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} setCart={setCart} />} />
    <Route path="/admin" element={<AdminPage />} /> {/* <-- Add the new route */}
   </Routes>
  </BrowserRouter>
 );
}

export default App;