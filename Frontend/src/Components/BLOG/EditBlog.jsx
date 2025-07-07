import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { samplePosts } from "../../data"; // Adjust the path if needed
import { FiArrowLeft } from "react-icons/fi"; // ✅ Back arrow icon
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../../Redux/Post/Action";
import { updateBlog } from "../../Redux/Post/Action";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const post=useSelector((store) => store.post.postById);
  const token=localStorage.getItem("token");

  useEffect(()=> {
    dispatch(getBlogById(id,token))
  },[id,dispatch])

  const [formData, setFormData] = useState({
    id: post.id,
    title: post.title || "",
    author: post.author || "",
    category: post.category || "",
    tags: post.tags || "",
    imageUrl: post.imageUrl || "",
    excerpt: post.excerpt || "",
    content:  post.content || "",
    isFeatured: post.isFeatured || false,
    username: post.username
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      isFeatured: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated blog data:", formData);
    dispatch(updateBlog(formData,token));
    navigate(-1);
  };

  return (
    <div className=" min-h-screen flex justify-center items-start bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="relative bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-3xl">
        <button
  onClick={() => navigate(-1)}
  className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200"
  aria-label="Go Back"
>
  <FiArrowLeft size={20} />
  <span className="text-sm font-semibold">Back</span>
</button>


        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          ✍️ Edit Blog Post
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block dark:text-gray-200 font-medium mb-1">
              Blog Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block dark:text-gray-200 font-medium mb-1">
              Author Name
            </label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block dark:text-gray-200 font-medium mb-1">
              Category
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block dark:text-gray-200 font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block dark:text-gray-200 font-medium mb-1">
              Image URL
            </label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block dark:text-gray-200 font-medium mb-1">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              rows="3"
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block dark:text-gray-200 font-medium mb-1">
              Content
            </label>
            <textarea
              name="content"
              rows="8"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-gray-800 dark:text-gray-200 font-medium">
              Featured:
            </label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleCheckboxChange}
              className="w-5 h-5 accent-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded"
          >
            💾 Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
