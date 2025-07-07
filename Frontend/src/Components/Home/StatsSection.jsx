import React, { useEffect, useState } from "react";
import { FaBookOpen, FaStar, FaBookmark, FaQuoteLeft, FaLightbulb } from "react-icons/fa";
import CountUp from "react-countup"; // Make sure to install: npm install react-countup
import { useSelector } from "react-redux";


const items = [
  {
    type: "quote",
    content: "“Your time is limited, so don’t waste it living someone else’s life.”",
    author: "Steve Jobs",
  },
  {
    type: "tip",
    content: "Write clean code — not just for the compiler, but for the next developer (which might be you).",
    author: "Coding Tip",
  },
  {
    type: "quote",
    content: "“Simplicity is the ultimate sophistication.”",
    author: "Leonardo da Vinci",
  },
  {
    type: "tip",
    content: "Use semantic HTML tags. They’re important for accessibility and SEO.",
    author: "Frontend Tip",
  },
  {
    type: "quote",
    content: "“Programs must be written for people to read, and only incidentally for machines to execute.”",
    author: "Harold Abelson",
  },
  {
    type: "tip",
    content: "Break big problems into smaller pieces — it's the essence of good software design.",
    author: "Software Design Tip",
  },
  {
    type: "quote",
    content: "“The best way to predict the future is to invent it.”",
    author: "Alan Kay",
  },
  {
    type: "tip",
    content: "Always validate user input — never trust the client.",
    author: "Security Tip",
  },
  {
    type: "quote",
    content: "“It always seems impossible until it's done.”",
    author: "Nelson Mandela",
  },
  {
    type: "tip",
    content: "Keep functions short and focused. If it’s doing too much, refactor it.",
    author: "Clean Code Tip",
  },
  {
    type: "quote",
    content: "“Good design is as little design as possible.”",
    author: "Dieter Rams",
  },
  {
    type: "tip",
    content: "Use version control even for personal projects — your future self will thank you.",
    author: "Git Tip",
  },
  {
    type: "quote",
    content: "“If you can’t explain it simply, you don’t understand it well enough.”",
    author: "Albert Einstein",
  },
  {
    type: "tip",
    content: "Consistent naming is more important than clever naming.",
    author: "Developer Wisdom",
  },
  {
    type: "quote",
    content: "“Talk is cheap. Show me the code.”",
    author: "Linus Torvalds",
  },
  {
    type: "tip",
    content: "Use `async/await` over nested callbacks for cleaner asynchronous code.",
    author: "JavaScript Tip",
  },
  {
    type: "quote",
    content: "“Strive not to be a success, but rather to be of value.”",
    author: "Albert Einstein",
  },
  {
    type: "tip",
    content: "Write tests — especially for critical paths. It saves time in the long run.",
    author: "Testing Tip",
  },
  {
    type: "quote",
    content: "“Don’t comment bad code — rewrite it.”",
    author: "Brian Kernighan",
  },
  {
    type: "tip",
    content: "Focus on understanding the problem before jumping into the solution.",
    author: "Problem Solving Tip",
  },
];

const HeroStatsQuoteSection = () => {
  const [index, setIndex] = useState(0);
  const current = items[index];
  const {savedPosts,featuredPosts}=useSelector((store) => store.post );
  const{currentUser}=useSelector((store) => store.user);

  const stats = [
  { label: "Total Posts", count: currentUser?.post.length, icon: <FaBookOpen className="text-blue-500" /> },
  { label: "Featured", count: featuredPosts?.length, icon: <FaStar className="text-yellow-400" /> },
  { label: "Saved Posts", count: savedPosts?.length, icon: <FaBookmark className="text-purple-500" /> },
];


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition duration-300">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group transform transition duration-300 hover:scale-105"
              title={stat.label}
            >
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white dark:bg-gray-800 ring-2 ring-indigo-200 dark:ring-gray-700 flex items-center justify-center text-2xl shadow-md group-hover:shadow-xl">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                <CountUp end={stat.count} duration={1.2} />
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quote / Tip Card */}
        <div className="text-center p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-transparent hover:border-white transition-all duration-300">
          <div className="flex justify-center mb-4 text-4xl text-indigo-600 dark:text-yellow-300">
            {current.type === "quote" ? <FaQuoteLeft /> : <FaLightbulb />}
          </div>
          <p className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white italic transition-all duration-300">
            {current.content}
          </p>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            — {current.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroStatsQuoteSection;
