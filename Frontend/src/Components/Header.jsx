import React, { useEffect, useState } from "react";
import { FaBars, FaMoon, FaSun, FaPenNib } from "react-icons/fa";

const Header = ({onMenuClick, onLogout}) => {
  const [theme, setTheme] = useState("light");
  const [time, setTime] = useState("");

  // 🕒 Update live date and time



  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const dateString = now.toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(`${dateString} ${timeString}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🌙 Toggle Theme
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    if (isDark) {
      html.classList.remove("dark");
      setTheme("light");
    } else {
      html.classList.add("dark");
      setTheme("dark");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 shadow-md flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-3">
        {/* 🖼️ Logo Icon */}
        <FaPenNib className="text-2xl text-white" />
        <h1 className="text-2xl font-bold text-white">BuzzWrite</h1>
        
       
      </div>

      <div className="flex items-center gap-4">
        {/* 🌙 Theme Toggle */}
         <span className="text-sm text-white hidden sm:block">{time}</span>
        <button
          onClick={toggleTheme}
          className="text-xl text-white hover:text-yellow-300 transition"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {/* 📂 Sidebar Toggle */}
        <button
          onClick={onMenuClick}
          className="text-2xl text-white hover:text-yellow-300 transition"
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
