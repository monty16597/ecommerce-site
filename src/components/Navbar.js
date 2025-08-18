import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or brand name */}
        <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-800">
          MySite
        </Link>
        {/* Navigation links */}
        <div className="flex flex-wrap justify-center sm:space-x-4 space-x-2 text-sm sm:text-base">
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;