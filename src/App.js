// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import NavBar from './components/Navbar';
import BedSheetPage from './pages/BedSheet';
import ProductDetailPage from './pages/ProductDetail';
import ClothsPage from './pages/Cloths'; // Import the new component

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/bedsheets" element={<BedSheetPage />} />
        <Route path="/cloths" element={<ClothsPage />} /> {/* Add the new route */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;