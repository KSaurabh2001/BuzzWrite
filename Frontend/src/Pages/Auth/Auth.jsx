

import React from "react";
import { useLocation } from "react-router-dom";
import Signin from "../../Components/Register/SignIn";
import Signup from "../../Components/Register/SignUp";

const Auth = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex">
      {/* 🔹 Left Half Video - More visible */}
      <div className="absolute top-0 left-0 w-3/4 h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/login.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 🔸 Right Half Video - Dimmed */}
      <div className="absolute top-0 right-0 w-1/4 h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/login2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* 🔲 Main Content */}
      <div className="relative z-10 flex min-h-screen w-full">
        {/* ✨ Left Section - Branding */}
        <div className="w-1/2 flex flex-col justify-center items-center text-center px-10">
          {/* <h1 className="text-9xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-md mb-4">
            BuzzWrite
          </h1>
    */}
    <div className="bg-white/20 dark:bg-white/10 px-8 py-6 rounded-xl backdrop-blur-sm shadow-lg">
  {/* <h1
    className="text-9xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent text-center"
    style={{
      textShadow: `
        0 0 4px rgba(59, 130, 246, 0.4),
        0 0 6px rgba(147, 51, 234, 0.3),
        0 0 8px rgba(244, 114, 182, 0.2)
      `
    }}
  > */}
  <h1 className="text-9xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-md mb-4"
  style={{
      WebkitTextStroke: "2px #e9d5ff",
       textShadow: "0 0 8px rgba(233, 213, 255, 0.3)"
    }}
  >
          
    BuzzWrite
  </h1>
  <p className="text-xl text-white font-medium max-w-md">
            Fuel your thoughts. Shape your stories. Discover the power of expressive writing with BuzzWrite.
          </p>
</div>

          
        </div>

        {/* ✍️ Right Section - Sign In/Sign Up */}
        <div className="w-1/2 flex items-center justify-center px-6">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl">
            {location.pathname === "/login" ? <Signin /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
