
import React, { useEffect, useState } from "react";
import { samplePosts } from "../../data";
import PostCard from "../../Components/BLOG/PostCard";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../Redux/Post/Action";

const BuzzBoard = () => {
   
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const blogUpdated= useSelector((store) => store.post.userPosts);
  const posts=useSelector((store) => store.post.globalPosts);
  

 useEffect(() => {
  dispatch(getAllBlogs(localStorage.getItem("token")));
  
}, [dispatch, blogUpdated]);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen text-gray-900 dark:text-gray-100">
      {/* 🔳 Fixed Background Image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/BB.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      </div>

      {/* 🧱 Main Content Wrapper */}
      <div className="relative z-10">
        {/* 📹 Hero Section with Video */}
        <div className="relative min-h-[80vh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/Home2.mp4" type="video/mp4" />
          </video>

          {/* Overlay for video */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

          {/* ❌ Close Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 right-6 z-20 p-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:text-red-500 transition"
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>

          {/* 🧠 Hero Text */}
          <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center pt-20">
            <div className="bg-white/30 dark:bg-white/20 px-8 py-6 rounded-xl backdrop-blur-sm shadow-lg">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                🌐 Buzz Board
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                Discover the latest thoughts, innovations, and ideas shared by our buzzing community.
              </p>
            </div>
          </div>
        </div>

        {/* 🔍 Search Bar */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 mt-10">
          <input
            type="search"
            placeholder="Search posts..."
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 📚 Post Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 py-12">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* ❌ No Posts */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 pb-20">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BuzzBoard;

