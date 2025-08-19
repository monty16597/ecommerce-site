// src/components/ContactUs.js

import React from 'react';

const ContactUs = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    // !! IMPORTANT: Replace "YOUR_ACCESS_KEY_HERE" with your actual Web3Forms access key
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.error("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Network or submission error", error);
      setResult("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mt-12 mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>
      <form onSubmit={onSubmit} className="flex flex-col space-y-6 max-w-lg mx-auto">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="text-gray-700 font-semibold mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105"
        >
          Submit Form
        </button>
      </form>
      {result && (
        <span className="mt-4 block text-center font-medium text-gray-600">
          {result}
        </span>
      )}
    </div>
  );
};

export default ContactUs;
