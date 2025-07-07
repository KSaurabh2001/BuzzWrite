import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaUserEdit,
  FaPlusSquare,
  FaUsers,
  FaThList,
  FaSignOutAlt,FaGlobe
} from "react-icons/fa";
import { FaBookmark, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";



const Sidebar = ({ isOpen, onClose, onLogout }) => {

  const {currentUser} =useSelector((store)=> store.user);
  return (
    <>
      {/* 🧊 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* 📦 Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 👤 Header with logo and close */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
            //user image and name
        
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="logo"
              className="w-10 h-10 rounded-full shadow-md"
            />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              BuzzWrite
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 text-xl hover:text-red-500 transition"
            aria-label="Close Sidebar"
          >
            ✕
          </button>
        </div>

        {/* 📚 Navigation Links */}
        <nav className="flex flex-col px-4 py-6 gap-4 flex-grow">
          <SidebarLink to="/home" icon={<FaHome />} label="Home" onClose={onClose} />
          <SidebarLink to="/CreateBlog" icon={<FaPlusSquare />} label="Create Blog" onClose={onClose} />
          <SidebarLink to="/explore" icon={<FaGlobe />} label="Buzz Board" onClose={onClose} />
          <SidebarLink to="/Authors" icon={<FaUsers />} label="Authors" onClose={onClose} />
          <SidebarLink to="/AllCategories" icon={<FaThList />} label="Categories" onClose={onClose} />
          <SidebarLink to="/SavedBlog" icon={<FaBookmark />} label="Saved Blogs" onClose={onClose} />
          <SidebarLink to="/FeaturedPost" icon={<FaStar  />} label="Featured Blogs" onClose={onClose} />
          
          <SidebarLink to="/Profile" icon={<FaUser />} label="Profile" onClose={onClose} />
          <SidebarLink to="/EditProfile" icon={<FaUserEdit />} label="Edit Profile" onClose={onClose} />

        </nav>

        {/* 🚪 Logout Button */}
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={() => {
              onLogout();  // Trigger logout logic
              onClose();   // Close the sidebar
            }}
            className="w-full flex items-center gap-3 text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 transition font-medium"
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

// 🧩 Reusable Link Component
const SidebarLink = ({ to, icon, label, onClose }) => (
  <Link
    to={to}
    onClick={onClose}
    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  >
    <span className="text-xl">{icon}</span>
    <span className="text-base font-medium">{label}</span>
  </Link>
);

export default Sidebar;
