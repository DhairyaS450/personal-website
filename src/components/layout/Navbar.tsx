"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";

const NavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/projects?academic_achievements", label: "Accomplishments" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full fixed top-0 bg-white/80 dark:bg-black/90 backdrop-blur-md z-50 py-4 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl md:text-2xl">
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Dhairya
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {NavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative ${
                pathname === link.href
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              } transition duration-200`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
          
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-500" size={18} />
            ) : (
              <FaMoon className="text-gray-700" size={18} />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-500" size={18} />
            ) : (
              <FaMoon className="text-gray-700" size={18} />
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <FiX className="text-gray-800 dark:text-gray-200" size={24} />
            ) : (
              <FiMenu className="text-gray-800 dark:text-gray-200" size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4"
        >
          <div className="flex flex-col space-y-4">
            {NavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 px-4 rounded ${
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                } transition duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
} 