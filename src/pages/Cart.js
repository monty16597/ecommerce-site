// src/pages/Cart.js

import React from 'react';

const CartPage = ({ cart, removeFromCart, setCart }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderSummary = cart
      .map((item) => `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');
    
    const total = `Total: $${calculateTotal()}`;
    const emailBody = `Order Details:\n\n${orderSummary}\n\n${total}`;
    
    // Construct the mailto link
    const mailtoLink = `mailto:admin@example.com?subject=New%20Order&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty. Go add some products!</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:text-blue-500"
                    >
                      -
                    </button>
                    <span className="px-3 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:text-blue-500"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t">
              <h2 className="text-xl font-bold text-gray-800">Total: ${calculateTotal()}</h2>
              <button
                onClick={handleCheckout}
                className="mt-4 sm:mt-0 px-6 py-3 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 transform hover:scale-105"
              >
                Mail Us Cart Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;