import { Link } from 'react-router-dom';
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Our Project
        </h1>
        <p className="text-md text-gray-600 mb-6">
          This site was designed to demonstrate a modern, component-based React application setup. We use React Router for simple page navigation and Tailwind CSS for utility-first styling, ensuring a clean and professional look with minimal effort.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;