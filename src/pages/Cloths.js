import ProductCard from '../components/ProductCard';

const ClothsPage = () => {
  const cloths = [
    { id: 11, name: "Casual T-Shirt", price: 25.99, image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=T-Shirt" },
    { id: 12, name: "Denim Jeans", price: 59.50, image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Jeans" },
    { id: 13, name: "Hooded Sweatshirt", price: 45.00, image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Sweatshirt" },
    { id: 14, name: "Summer Dress", price: 35.75, image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Dress" },
    { id: 15, name: "Formal Blazer", price: 120.00, image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Blazer" },
    { id: 16, name: "Running Shorts", price: 29.99, image: "https://placehold.co/400x300/F0F4F8/3B82F6?text=Shorts" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <main className="max-w-7xl mx-auto">
        {/* Filter Panel at the top */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sm:mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <h3 className="text-md font-semibold text-gray-700">Price Range:</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Min:</span>
              <input type="number" className="w-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
              <span className="text-sm text-gray-500">Max:</span>
              <input type="number" className="w-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="500" />
            </div>
          </div>
        </div>

        {/* Product Listing Section */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">Cloths</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {cloths.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClothsPage;