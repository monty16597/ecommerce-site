// src/data/products.js

// The complete list of all products
const allProducts = [
  // Cloths products
  { id: '1', name: "Cloth 1", price: 25.99, category: "Cloths", image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+1" },
  { id: '2', name: "Cloth 2", price: 59.50, category: "Cloths", image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+2" },
  { id: '3', name: "Cloth 3", price: 45.00, category: "Cloths", image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+3" },
  { id: '4', name: "Cloth 4", price: 35.75, category: "Cloths", image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+4" },
  
  // BedSheet products
  { id: '5', name: "Luxury Cotton Bedsheet Set", price: 79.99, category: "Bedsheets", image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+1" },
  { id: '6', name: "Silk Blend Bedding", price: 129.50, category: "Bedsheets", image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+2" },
  { id: '7', name: "Striped Duvet Cover", price: 59.99, category: "Bedsheets", image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+3" },
  { id: '8', name: "Solid Color Comforter", price: 89.00, category: "Bedsheets", image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+4" },
  { id: '9', name: "Floral Pattern Sheet", price: 65.75, category: "Bedsheets", image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+5" },
  { id: '10', name: "Geometric Print Set", price: 95.25, category: "Bedsheets", image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+6" },
];

// A dedicated array for featured products
const featuredProducts = [
  { id: '1', name: "Cloth 1", price: 25.99, category: "Cloths", image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+1" },
  { id: '6', name: "Silk Blend Bedding", price: 129.50, category: "Bedsheets", image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+2" },
  { id: '5', name: "Luxury Cotton Bedsheet Set", price: 79.99, category: "Bedsheets", image: "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+1" },
  { id: '3', name: "Cloth 3", price: 45.00, category: "Cloths", image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+3" },
];

// Export both arrays
export { allProducts, featuredProducts };
