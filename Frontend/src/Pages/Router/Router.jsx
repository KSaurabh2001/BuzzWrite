
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import Home from "../Home/Home";
import Auth from "../Auth/Auth";
import Profile from "../Profile/Profile";
import EditProfile from "../EditProfile/EditProfile";   
import AuthorProfile from "../Authors/AuthorProfile";

import Authors from "../Authors/Authors";   
import AllCategories from "../AllCategories/AllCategories";
import AddBlog from "../AddBlog/AddBlog";
import Sidebar from "../../Components/Sidebar";
import SavedBlog from "../SavedBLog/SavedBlog";
import FeaturedPost from "../FeaturedPost/FeaturedPost";
import PostPage from "../../Components/BLOG/PostPage";
import EditBlog from "../../Components/BLOG/EditBlog";
import BuzzBoard from "../BuzzBoard/BuzzBoard";
import { Navigate } from "react-router-dom";
import PostPageCurrentUser from "../../Components/BLOG/PostPageCurrentUser";




const Routers = () => {
  const location =useLocation();
  const reqUser = useSelector(store=>store.user.reqUser);
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
     localStorage.removeItem("token");
  localStorage.removeItem("user");


  window.location.href = "/login";}



  
  return (
    <div>

      
      

{(location.pathname !== "/login" && location.pathname !=="/signup")&& (
    
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header onMenuClick={() => setSidebarOpen(true)} onLogout={handleLogout}/>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />

      <main className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/CreateBlog" element={<AddBlog />} />
          <Route path="/Authors" element={<Authors />} />
          <Route path="/AllCategories" element={<AllCategories />} />
          <Route path="/SavedBlog" element={<SavedBlog/>} />
          <Route path="/FeaturedPost" element={<FeaturedPost/>} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/explore" element={<BuzzBoard />} />
           <Route path="/profile/:id" element={<AuthorProfile />} />
           <Route path="/CurrentUserPost/:id" element={<PostPageCurrentUser />} />
          
          </Routes>
      </main>
    </div>
  )}
  {(location.pathname === "/login" || location.pathname==="/signup") && (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
    </Routes>
  )}
    </div>
    
  );
};

export default Routers;
