import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const API_URL =
  'https://7b23l62uacfekfihmefunsv2eu0gavxv.lambda-url.ca-central-1.on.aws/';

const BedPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);   // ✅ define state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBedItems = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}?category=bed`);
        if (!res.ok) throw new Error('Failed to fetch bed');
        const data = await res.json();
        setProducts(data);   // ✅ works now
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBedItems();
  }, []);

  if (loading) return <p className="text-center">Loading Bed Items...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default BedPage;
