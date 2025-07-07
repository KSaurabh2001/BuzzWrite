import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PostCard from "../BLOG/PostCard";

const SectionChoice = ({
  posts,
  title,
  icon,
  gradientLight = "from-[#f3f4f6] to-[#e5e7eb]",
  gradientDark = "from-[#1f2937] to-[#0f172a]",
  tagline = "Explore curated content just for you.",
}) => {
  const scrollRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDark = () =>
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    checkDark();

    // Optional: Update if theme changes dynamically
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  const gradient = isDarkMode ? gradientDark : gradientLight;

  return (
    <section className={`bg-gradient-to-b ${gradient} py-12 px-6 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold flex justify-center items-center gap-2 text-gray-900 dark:text-white">
            <span>{icon}</span> {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{tagline}</p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-300 dark:bg-gray-800 text-black dark:text-white p-3 rounded-full shadow-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-10 no-scrollbar pb-2"
          >
            {posts?.map((post) => (
              <div key={post.id} className="min-w-[320px] max-w-sm flex-shrink-0">
                <PostCard post={post} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-300 dark:bg-gray-800 text-black dark:text-white p-3 rounded-full shadow-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionChoice;


