import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-20 flex items-center justify-center min-h-[90vh] md:min-h-screen text-center px-4">
      <div className="bg-black bg-opacity-60 p-10 md:p-16 rounded-lg max-w-3xl shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Welcome to <span className="text-indigo-400">BuzzWrite</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-8">
          The space where your ideas take flight. Read. Write. Inspire.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={() => navigate("/CreateBlog")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-semibold"
          >
            ✍️ Add Blog
          </button>
          <button
            onClick={() => navigate("/AllCategories")}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition font-semibold"
          >
            📚 Explore Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
