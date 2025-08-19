// src/app.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import NavBar from './components/Navbar';
import BedSheetPage from './pages/BedSheet';
import ProductDetailPage from './pages/ProductDetail';
import ClothsPage from './pages/Cloths';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/bedsheets" element={<BedSheetPage />} />
        <Route path="/cloths" element={<ClothsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;