import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-10 px-6 py-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">✒️ BuzzWriter</h1>
          <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
            Craft. Share. Inspire.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 text-xl">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} BuzzWriter. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
