import React, { useState } from "react";
import PostCard from "../../Components/BLOG/PostCard";


import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { searchBlogs } from "../../Redux/Post/Action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFeaturedBlog } from "../../Redux/Post/Action";

const FeaturedPosts = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("title");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {featuredPosts, userPosts} = useSelector((store) => store.post);
  const {currentUser}=useSelector((store) => store.user);

  
      useEffect(() => {
  
        dispatch(getFeaturedBlog(localStorage.getItem("token")));
        
  
      },[userPosts,currentUser?.id]);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const searchHandler = (value) => {
    setSearch(value);

    dispatchEvent(searchBlogs(search, localStorage.getItem("token")));
  };

  const filteredPosts = featuredPosts.filter(
    (post) =>
      post.isFeatured && post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen text-white">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 z-20 p-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 hover:text-red-500 transition-all duration-200"
        aria-label="Close"
      >
        <IoClose size={24} />
      </button>
      {/* Content Layer */}
      <div className="relative z-10 px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">🌟 Featured Blogs</h1>
          <p className="text-gray-300 text-lg mt-2">
            Dive into our top handpicked articles curated just for you.
          </p>
        </div>
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search saved posts..."
              value={search}
              onChange={(e) => searchHandler(e.target.value)}
              className="flex-1 px-4 py-2 rounded-md text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Search Button */}
            {/* <button className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition">
              🔍 Search
            </button> */}

            {/* Filter Dropdown */}
            <select
              value={filter}
              onChange={handleFilterChange}
              className="px-4 py-2 rounded-md text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="title">Filter by Title</option>
              <option value="date">Filter by Date Created</option>
            </select>
          </div>
        </div>

        {/* Post Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.length > 0 ? (
            featuredPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="col-span-3 text-center text-lg text-gray-300">
              No featured posts found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
