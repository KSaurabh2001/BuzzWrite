import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { samplePosts } from "../../data"; // ✅ Adjust path if needed
import { FiArrowLeft } from "react-icons/fi"; // ✅ Back arrow icon
import { useDispatch } from "react-redux";
import { getBlogById, getSavedBlog, saveBlog, unsaveBlog } from "../../Redux/Post/Action"; // ✅ Adjust path if needed
import { useSelector } from "react-redux"; // ✅ For accessing post data

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(true);
  const {currentUser} =useSelector((store) => store.user);
   const post = useSelector((state) => state.post.postById);
   const savedPost=useSelector((state) => state.post.savedPosts);


  


useEffect(() => {
  const token = localStorage.getItem("token");
  dispatch(getBlogById(id, token));
  if (currentUser) {
    dispatch(getSavedBlog(currentUser.id, localStorage.getItem("token"))); // ✅ ADD THIS
  }
}, [id, dispatch, currentUser]);


useEffect(() => {
  if (post && savedPost?.length > 0) {
    const found = savedPost.some((p) => p.id === post.id);
    setIsSaved(!found);
  }
}, [savedPost]);

  if (!post || !post.id) {
    return <div>Loading post...</div>;
  }

  const handleSave = () => {
  if (isSaved) {
    dispatch(saveBlog(currentUser.id, post, localStorage.getItem("token")));
  } else {
    dispatch(unsaveBlog(currentUser.id, post.id, localStorage.getItem("token")));
  }
  // Optimistically toggle
  setIsSaved((prev) => !prev);
};

  const {
    title,
    author,
    category,
    tags,
    imageUrl,
    excerpt,
    content,
    postedOn,
  } = post;

  return (
    <div className="relative min-h-screen text-white">
      {/* 🔳 Fixed Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* 🔙 Back Icon */}

      {/* 🔲 Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 backdrop-blur-lg bg-black/50 rounded-lg shadow-xl">
        {/* 📸 Top Image */}

        <button
          onClick={() => navigate(-1)}
          className=" top-6 mb-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200"
          aria-label="Go Back"
        >
          <FiArrowLeft size={20} />
          <span className="text-sm font-semibold">Back</span>
        </button>
        <img
          src={imageUrl}
          alt="Post banner"
          className="w-full h-72 object-cover rounded-lg mb-6 shadow-md"
        />

        {/* 📝 Title and Author */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold leading-tight">{title}</h1>
          <p className="mt-2 text-sm text-gray-300">
            By <span className="text-indigo-400 font-medium">{author}</span> ·{" "}
            <span className="italic">{new Date(postedOn).toDateString()}</span>
          </p>
        </div>

        {/* 🏷️ Category & Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm">
            {category}
          </span>
          <span>{tags}</span>
        </div>

        {/* ✏️ Excerpt */}
        <p className="mb-6 text-lg italic text-gray-200 text-center max-w-2xl mx-auto">
          {excerpt}
        </p>

        {/* 📖 Content */}
        <div className="prose prose-invert max-w-none text-gray-100 mb-10">
          <p className="whitespace-pre-line">{content}</p>
        </div>

        {/* 🔘 Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {isSaved ? (
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow"
            >
              Save Post
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow"
            >
              UnSave Post
            </button>
          )}
        </div>
        
        
      </div>
    </div>
  );
};

export default PostPage;
