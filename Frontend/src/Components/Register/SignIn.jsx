import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { loginAction } from "../../Redux/Auth/Action";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserByToken } from "../../Redux/User/Action";
import { ToastContainer } from 'react-toastify';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store);

  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const token = localStorage.getItem("token");

 useEffect(() => {
  if (login) {
    localStorage.setItem("token", login);
    dispatch(getUserByToken(login));
  }
}, [login]);  

   useEffect(() => {
    if (user.currentUser && token) {
      navigate(`/home`);
    }
  }, [user.currentUser]);



  // Validation schema
  const validationSchema = Yup.object().shape({
     username: Yup.string().email("Invalid Username").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  });
  


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent reload
    console.log("Sign In Data:", formData);
    dispatch(loginAction(formData));

  };

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google");
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-gray-800 dark:to-gray-700 text-white shadow-2xl rounded-2xl p-10 max-w-md w-full border border-white/20">
      <h2 className="text-3xl font-extrabold text-center mb-8">
        🔐 Sign In to <span className="text-white">Buzz Writer</span>
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-3 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-white hover:bg-gray-100 text-indigo-700 py-3 rounded-md font-semibold transition-transform hover:scale-105"
        >
          Sign In
        </button>
      </form>

      <div className="my-6 text-center relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/30"></div>
        </div>
        <div className="relative bg-transparent px-3 text-white/80 text-sm">or</div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 border border-white/30 bg-white text-gray-800 py-2.5 px-4 rounded-md shadow hover:bg-gray-100 transition"
      >
        <FcGoogle size={22} />
        <span className="font-medium">Sign in with Google</span>
      </button>

      <p className="mt-6 text-center text-sm text-white/90">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="underline cursor-pointer font-semibold"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default SignIn;

