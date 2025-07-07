import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import uploadToCloudinary from "../../Config/UploadToCloudinary";
import { useDispatch } from "react-redux";
import { addBlog } from "../../Redux/Post/Action";
import { getBlogForCurrentUser } from "../../Redux/Post/Action";
import { getUserByToken } from "../../Redux/User/Action";


const AddBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = use;
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    username: "",
    category: "",
    excerpt: "",
    content: "",
    tags: [],
    imageUrl: "",
    isFeatured: false,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Image too large. Max 10MB allowed.");
      return;
    }

    try {
      const cloudinaryUrl = await uploadToCloudinary(file);
      if (cloudinaryUrl) {
        setFormData((prev) => ({ ...prev, imageUrl: cloudinaryUrl }));
        setPreview(cloudinaryUrl);
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      alert("Something went wrong while uploading.");
    }
  };
//   const refreshUserPosts = () => {
//   const userId = currentUser?.id;
//   const token = localStorage.getItem("token");
//   if (userId && token) {
//     dispatch(getBlogForCurrentUser(userId, token));
//   } else {
//     console.warn("Cannot refresh posts: missing user ID or token.");
//   }
// };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      isFeatured: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blog Data Submitted:", formData);
    dispatch(addBlog(formData, localStorage.getItem("token")));
    dispatch(getUserByToken(localStorage.getItem("token")));
    navigate("/home");
  };

  return (
    <div className="relative min-h-screen text-gray-900 dark:text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/AddBlog.jpg"
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

      {/* Form Container */}
      <div className="relative z-10 max-w-5xl mx-auto py-16 px-4 md:px-8">
        <h1 className="text-4xl font-extrabold mb-10 text-center">
          📝 Create New Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-2xl p-8 md:p-10 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Career">Career</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Others">Others</option>
            </select>

            <input
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-sm">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-700 dark:text-gray-200"
              />
            </div>

            {preview && (
              <div className="md:col-span-2 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-w-xl h-72 object-cover rounded-xl shadow-lg border border-gray-300 dark:border-gray-600"
                />
              </div>
            )}
          </div>

          {/* ✅ isFeatured Checkbox */}
          <div className="flex items-center gap-3">
            <label className="text-gray-800 dark:text-gray-200 font-medium">
              Mark as Featured:
            </label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleCheckboxChange}
              className="w-5 h-5 accent-indigo-600"
            />
          </div>

          <textarea
            name="excerpt"
            rows="4"
            placeholder="Excerpt - short summary of your blog..."
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            name="content"
            rows="10"
            placeholder="Write your full blog content here..."
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="block w-full py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            🚀 Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
