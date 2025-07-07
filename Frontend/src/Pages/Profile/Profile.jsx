import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import PostCard from "../../Components/BLOG/PostCard";
import { getUserByToken } from "../../Redux/User/Action";
import { getBlogForCurrentUser } from "../../Redux/Post/Action";


const Profile = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("title");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { currentUser } = useSelector((store) => store.user);
  const { userPosts } = useSelector((store) => store.post);

  useEffect(() => {
    if (token && !currentUser) {
      dispatch(getUserByToken(token));
    }
   
  }, [token, currentUser, dispatch]);

  useEffect(() => {
  if (token && currentUser !== null && currentUser.id) {
    dispatch(getBlogForCurrentUser(currentUser.id, token));
  }
}, [token, currentUser, dispatch]);


  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredPosts = userPosts?.filter((post) =>
    filter === "title"
      ? post.title?.toLowerCase().includes(search.toLowerCase())
      : true
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
          alt="background"
          className="w-full h-full object-cover opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm"></div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 z-20 p-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 hover:text-red-500 transition-all duration-200"
        aria-label="Close"
      >
        <IoClose size={24} />
      </button>

      <div className="relative z-10 px-6 py-10">
        {/* User Info */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:flex md:items-center mb-10">
          {currentUser?.image ? (
            <img
              src={currentUser.image}
              alt={currentUser.name || "Profile"}
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 mx-auto md:mx-0"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold mx-auto md:mx-0">
              No Image
            </div>
          )}

          <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentUser?.fullName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              @{currentUser?.username}
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              {currentUser?.occupation}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {currentUser?.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentUser?.gender} | DOB: {currentUser?.dob}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentUser?.address}
            </p>
            <p className="mt-3 text-gray-800 dark:text-gray-200 italic">
              {currentUser?.bio}
            </p>
          </div>
        </div>
      

        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <input
              type="text"
              placeholder="Search saved posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-md text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
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

        {/* Posts Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts?.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              {currentUser?.post?.length === 0
                ? "No posts found"
                : "Loading posts..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

