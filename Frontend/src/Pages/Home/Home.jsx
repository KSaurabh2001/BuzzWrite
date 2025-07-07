import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsSection from "../../Components/Home/StatsSection";
import HeroSection from "../../Components/Home/HeroSection";
import FeaturedPost from "../../Components/Home/FeaturedPost";
import SavedPost from "../../Components/Home/SavedPost";
import QuoteTipSection from "../../Components/Home/StatsSection";

import { samplePosts } from "../../data.jsx";
import Footer from "../../Components/Home/Footer1.jsx";
import HeroStatsQuoteSection from "../../Components/Home/StatsSection";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedBlog, getSavedBlog } from "../../Redux/Post/Action.js";

const Home = () => {
  // const [current, setCurrent] = useState(0);
  // const [fade, setFade] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {savedPosts,featuredPosts,userPosts}=useSelector((store) => store.post );
  const{currentUser}=useSelector((store) => store.user);
const token=localStorage.getItem("token");


   useEffect(() => {
  const token = localStorage.getItem("token");
  
  if (currentUser?.id && token) {
    dispatch(getFeaturedBlog(token));
    dispatch(getSavedBlog(currentUser.id, token));
  }
}, [userPosts, currentUser]);

    

  


  return (
    <div className="home-container">
      {/* Hero Banner */}
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 object-cover w-full h-full -z-10"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/Home4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <div className="absolute inset-0 bg-black bg-opacity-50 z-10" /> */}
        </div>

        <div className="relative z-20 flex items-center justify-center min-h-[90vh] md:min-h-screen text-center px-4">
          <div className="bg-black bg-opacity-70 p-10 md:p-16 rounded-lg max-w-3xl shadow-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Welcome to <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
  BuzzWrite
</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              The space where your ideas take flight. Read. Write. Inspire.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <div className="flex flex-wrap gap-4 mt-6">
                {/* Add Blog Button */}
                <button
                  onClick={() => navigate("/CreateBlog")}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 hover:shadow-md transition-all duration-200 font-semibold"
                >
                  ✍️ <span>Add Blog</span>
                </button>

                {/* Buzz Board Button */}
                <button
                  onClick={() => navigate("/explore")}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200 font-semibold"
                >
                  🌐 <span>Buzz Board</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      
      <HeroStatsQuoteSection />

      {/* Featured Posts */}
      <FeaturedPost posts={featuredPosts} />

      {/* Saved Posts */}
      <SavedPost posts={savedPosts} />
      <Footer />
    </div>
  );
};

export default Home;
