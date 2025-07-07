import React, { useState, useRef, useEffect} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { categories } from "../../data";
import { samplePosts } from "../../data";
import PostCard from "../../Components/BLOG/PostCard";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogByCategory } from "../../Redux/Post/Action";

const AllCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const scrollRef = useRef();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const token=localStorage.getItem("token");
  const {postByCategory}=useSelector((store) => store.post);


 

  const filteredPosts = postByCategory;

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleSearch=(name) => {
    setSelectedCategory(name);
    dispatch(getBlogByCategory(name,token));

  }

  return (
    <div className="relative min-h-screen px-6 py-12 overflow-x-hidden">
      {/* ✅ Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="cat.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 dark:bg-opacity-70" />
      </div>
      <button
  onClick={() => navigate(-1)}
  className="absolute top-6 right-6 z-20 p-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 hover:text-red-500 transition-all duration-200"
  aria-label="Close"
>
  <IoClose size={24} />
</button>


      {/* ✅ Foreground Content */}
      <div className="relative z-10 text-white">
        {/* 🔹 1st Div - Title & One-liner */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white-900 dark:text-white">
            📚 Explore by Category
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
            Discover blogs curated under your favorite topics.
          </p>
        </div>

        {/* 🔹 2nd Div - Scrollable Category Cards */}
        <div className="relative mb-12">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <FaChevronLeft className="text-black dark:text-white" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar px-10 py-4"
          >
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <div
                  key={index}
                  onClick={()=>handleSearch(cat.name)}
                  className={`min-w-[180px] cursor-pointer rounded-xl p-6 text-white text-center shadow-md hover:scale-105 transition-transform ${
                    cat.color
                  } ${selectedCategory === cat.name ? "ring-4 ring-white ring-opacity-50" : ""}`}
                >
                  <Icon className="text-3xl mb-2 mx-auto" />
                  <h3 className="text-lg font-semibold">{cat.name}</h3>
                </div>
              );
            })}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <FaChevronRight className="text-black dark:text-white" />
          </button>
        </div>

        {/* 🔹 3rd Div - Filtered Posts */}
        <div>
          {selectedCategory ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Posts under{" "}
                <span className="text-indigo-400">{selectedCategory}</span>
              </h2>
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-300">
                  No posts found in this category.
                </p>
              )}
            </>
          ) : (
            <p className="text-center text-gray-400">
              Select a category to see matching blogs.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCategories;

