import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../Redux/User/Action";
import uploadToCloudinary from "../../Config/UploadToCloudinary";

const EditProfile = () => {
  const { currentUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [previewURL, setPreviewURL] = useState(currentUser?.image || "");

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    occupation: currentUser?.occupation || "",
    gender: currentUser?.gender || "",
    dob: currentUser?.dob || "", // ✅ 'dob' (not 'DOB')
    address: currentUser?.address || "",
    bio: currentUser?.bio || "",
    password: "",
    image: currentUser?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Image too large. Max 10MB allowed.");
      return;
    }

    const url = await uploadToCloudinary(file);
    if (url) {
      setFormData((prev) => ({ ...prev, image: url }));
      setPreviewURL(url); // ✅ use Cloudinary URL instead of objectURL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser?.id) {
      console.error("User not available");
      return;
    }

    dispatch(editUser(currentUser.id, formData, localStorage.getItem("token")));
    navigate("/profile");
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img src="/EDIT.jpg" alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/60 backdrop-blur-sm" />
      </div>

      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 z-20 p-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 hover:text-red-500 transition-all duration-200"
        aria-label="Close"
      >
        <IoClose size={24} />
      </button>

      {/* Form */}
      <div className="relative z-10 py-16 px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-5xl w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
            🛠️ Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Image */}
            <div className="col-span-1 flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-indigo-500 dark:border-indigo-400">
                {previewURL ? (
                  <img src={previewURL} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-300">
                    No Image
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-sm text-center py-2 cursor-pointer"
                >
                  📁 Upload
                </label>
              </div>
            </div>

            {/* Input Fields */}
            <div className="col-span-1 grid grid-cols-1 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="input-field"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="input-field"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="input-field"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="input-field"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="input-field"
              />
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {/* Bio */}
            <div className="col-span-1 md:col-span-2">
              <textarea
                name="bio"
                rows={4}
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={handleChange}
                className="input-field resize-none"
              />
            </div>

            {/* Submit */}
            <div className="col-span-1 md:col-span-2 text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
              >
                💾 Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
