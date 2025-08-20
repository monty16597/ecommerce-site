import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Admin API URLs
const GET_PRODUCTS_URL = 'https://7b23l62uacfekfihmefunsv2eu0gavxv.lambda-url.ca-central-1.on.aws/';
const CREATE_PRODUCT_URL = 'https://c4di5o2y7hqcilnxttsaokqp2y0xylvb.lambda-url.ca-central-1.on.aws/';
const UPDATE_PRODUCT_URL = 'https://lq7ukiqf3qf4ormufgutcwqn2m0urdch.lambda-url.ca-central-1.on.aws/';
const DELETE_PRODUCT_URL = 'https://sxrwmvza666okw37qjmephwulu0vhbip.lambda-url.ca-central-1.on.aws/';

// Credentials for local authentication
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password';
const LOCAL_STORAGE_KEY = 'adminCredentials';

// Main App component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  // Effect to check for stored credentials on load
  useEffect(() => {
    const storedCredentials = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCredentials) {
      try {
        const { storedUsername, storedPassword } = JSON.parse(storedCredentials);
        if (storedUsername === ADMIN_USERNAME && storedPassword === ADMIN_PASSWORD) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error("Failed to parse credentials from localStorage", e);
      }
    }
  }, []);

  // Effect to fetch products only when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Basic ${btoa(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`)}`,
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(GET_PRODUCTS_URL, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Error fetching products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ storedUsername: username, storedPassword: password }));
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleCreateOrUpdate = async (product) => {
    setLoading(true);
    setError('');
    try {
      let response;
      if (editProduct) {
        // Update existing product
        response = await fetch(`${UPDATE_PRODUCT_URL}${product.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(product),
        });
      } else {
        // Create new product
        response = await fetch(CREATE_PRODUCT_URL, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(product),
        });
      }
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save product: ${errorText}`);
      }
      await fetchProducts();
      setEditProduct(null);
    } catch (err) {
      setError('Error saving product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    setLoading(true);
    setError('');
    try {
      // The only change is here: using a query parameter for the ID
      const response = await fetch(`${DELETE_PRODUCT_URL}?id=${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete product: ${errorText}`);
      }
      await fetchProducts();
    } catch (err) {
      setError('Error deleting product: ' + err.message);
    } finally {
      setLoading(false);
      setProductToDelete(null); // Close modal
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setIsAuthenticated(false);
    setEditProduct(null);
    setProductToDelete(null);
    setProducts([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
          Logout
        </button>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}

      {/* Product Form */}
      <ProductForm
        onSave={handleCreateOrUpdate}
        productToEdit={editProduct}
        onCancel={() => setEditProduct(null)}
      />

      {/* Product List */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.ItemName}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditProduct(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setProductToDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <DeleteConfirmModal
          onConfirm={() => handleDelete(productToDelete)}
          onCancel={() => setProductToDelete(null)}
        />
      )}
    </div>
  );
};

// Helper component for the product creation/update form
const ProductForm = ({ onSave, productToEdit, onCancel }) => {
  const [formData, setFormData] = useState({
    ItemName: '',
    price: '',
    category: 'cloth',
    thumbnailURL: '',
    images: [''],
    description: '',
    featured: false,
  });

  // Effect to populate form when editing a product
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        ...productToEdit,
        price: productToEdit.price.toString(),
      });
    } else {
      setFormData({
        ItemName: '',
        price: '',
        category: 'cloth',
        thumbnailURL: '',
        images: [''],
        description: '',
        featured: false,
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImagesChange = (e, index) => {
    const newImages = [...formData.images];
    newImages[index] = e.target.value;
    setFormData({ ...formData, images: newImages });
  };

  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };
    onSave(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {productToEdit && (
          <div>
            <label className="block text-gray-700 font-semibold">Product ID</label>
            <input
              type="text"
              name="id"
              value={productToEdit.id}
              className="w-full p-2 border rounded bg-gray-200"
              readOnly
            />
          </div>
        )}
        <div>
          <label className="block text-gray-700 font-semibold">Name</label>
          <input
            type="text"
            name="ItemName"
            value={formData.ItemName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="cloth">cloth</option>
            <option value="bed">bed</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold">Thumbnail URL</label>
          <input
            type="url"
            name="thumbnailURL"
            value={formData.thumbnailURL}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold">Additional Images</label>
          {formData.images.map((image, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="url"
                value={image}
                onChange={(e) => handleImagesChange(e, index)}
                className="w-full p-2 border rounded"
                placeholder="Image URL"
              />
              <button type="button" onClick={() => handleRemoveImage(index)} className="p-2 bg-red-500 text-white rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddImage} className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">Add Image URL</button>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700 font-semibold">Featured Product</label>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          {productToEdit ? 'Update Product' : 'Add Product'}
        </button>
        {productToEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

// Custom delete confirmation modal component
const DeleteConfirmModal = ({ onConfirm, onCancel }) => {
  return createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Deletion</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default App;
