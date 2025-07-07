import React, { useEffect, useState } from "react";
import UserCard from "../../Components/BLOG/UserCard";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors } from "../../Redux/User/Action";

const Author = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authors } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getAllAuthors(localStorage.getItem("token")));
  }, [dispatch]);

  // ✅ Final filtering logic
const filteredUsers = Array.isArray(authors)
  ? authors.filter((user) => {
      const fullName = user?.fullName || "";
      const search = searchTerm.trim().toLowerCase();
      return fullName.toLowerCase().includes(search);
    })
  : [];


  return (
    <div className="relative min-h-screen text-gray-900 dark:text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/Author.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/30 dark:bg-[#0f172a]/50 backdrop-blur-sm" />
      </div>

      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 z-20 p-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 hover:text-red-500 transition-all duration-200"
        aria-label="Close"
      >
        <IoClose size={24} />
      </button>

      {/* Foreground Content */}
      <div className="relative z-10 py-12 px-4 min-h-screen">
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-3/4 px-5 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition"
          >
            🔍 Search
          </button>
        </div>

        {/* Author Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <UserCard key={user.id || index} user={user} />
            ))
          ) : (
            <div className="text-center col-span-full text-gray-400">
              No authors found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Author;
