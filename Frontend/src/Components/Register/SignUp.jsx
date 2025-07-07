import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { signupAction } from "../../Redux/Auth/Action";
import { useSelector } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();

  
  const dispatch = useDispatch();
  const { Signup } = useSelector((store) => store.auth);

  // Step 1: Define state for form fields
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  // Step 2: Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (Signup) {
      navigate("/login");

    }
  }, [Signup]);

  // Step 3: Submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Submitted Form Data:", formData);
    dispatch(signupAction(formData));
    // Reset form fields
    setFormData({
      fullName: "",
      username: "",
      email: "",
      password: "",
    });
  };

  const handleGoogleSignUp = () => {
    console.log("Sign up with Google");
  };

  return (
    <div className="bg-gradient-to-br from-pink-400 to-purple-500 dark:from-gray-800 dark:to-gray-700 text-white shadow-2xl rounded-2xl p-10 max-w-md w-full border border-white/20">
      <h2 className="text-3xl font-extrabold text-center mb-8">
        ✍️ Sign Up for <span className="text-white">Buzz Writer</span>
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-3 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-pink-300 focus:outline-none transition"
          required
        />

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username (must be unique)"
          className="w-full px-4 py-3 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-pink-300 focus:outline-none transition"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-3 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-pink-300 focus:outline-none transition"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-pink-300 focus:outline-none transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-white hover:bg-gray-100 text-pink-700 py-3 rounded-md font-semibold transition-transform hover:scale-105"
        >
          Create Account
        </button>
      </form>

      <div className="my-6 text-center relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/30"></div>
        </div>
        <div className="relative bg-transparent px-3 text-white/80 text-sm">or</div>
      </div>

      <button
        onClick={handleGoogleSignUp}
        className="w-full flex items-center justify-center gap-3 border border-white/30 bg-white text-gray-800 py-2.5 px-4 rounded-md shadow hover:bg-gray-100 transition"
      >
        <FcGoogle size={22} />
        <span className="font-medium">Sign up with Google</span>
      </button>

      <p className="mt-6 text-center text-sm text-white/90">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="underline cursor-pointer font-semibold"
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default SignUp;
