import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
 
// Adjust path if needed

const PostCard = ({ post }) => {
  const { title, author, date, imageUrl, excerpt, category, tags ,username} = post;
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  
  const handlePostClick = () => {
  if(currentUser.username===username){
      navigate(`/CurrentUserPost/${post.id}`);
  }else
   { navigate(`/post/${post.id}`);}
  };
 

  return (
    <div className="relative backdrop-blur-lg bg-white/30 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-xl shadow-md overflow-hidden max-w-md w-full mx-auto transition hover:shadow-2xl">
      <img src={imageUrl || "public/fallback.jpg"} alt={title} className="w-full h-52 object-cover" />

      <div className="p-5 text-gray-900 dark:text-white">
        <span className="inline-block bg-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-3 text-white">
          {category}
        </span>

        <div className="flex items-center gap-2 text-sm mb-4 text-gray-700 dark:text-gray-300">
          <img
            src={imageUrl || "public/fallback.jpg"}
            alt={author}
            className="w-6 h-6 rounded-full"
          />
          <span>{author}</span>
          <FaCalendarAlt className="ml-4 text-gray-400" />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>

        <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">
          {title}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
  {tags}

</div>

        <button
        onClick={handlePostClick}
          
          className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline"
        >
          👉 Read more
        </button>
      </div>
    </div>
  );
};

export default PostCard;
