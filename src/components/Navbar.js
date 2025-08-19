// src/components/NavBar.js

import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Make sure to install react-icons

const NavBar = ({ cartItemCount }) => {
  return (
    <nav className="bg-white shadow-lg p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or brand name */}
        <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-800">
          MySite
        </Link>
        {/* Navigation links */}
        <div className="flex flex-wrap justify-center items-center sm:space-x-4 space-x-2 text-sm sm:text-base">
          <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
            Home
          </Link>
          <Link to="/bedsheets" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
            Bedsheets
          </Link>
          <Link to="/cloths" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
            Cloths
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
            About
          </Link>
          {/* Cart Icon with Item Count */}
          <Link to="/cart" className="relative text-gray-600 hover:text-blue-500 transition-colors duration-200 ml-4">
            <FaShoppingCart className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
