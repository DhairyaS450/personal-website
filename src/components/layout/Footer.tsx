"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaLock, FaUnlock } from "react-icons/fa";
import { useContent } from "@/contexts/ContentContext";

// Add this constant to the top of the file, after imports
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN || 'fallback-admin-token-12345';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Use our content context
  const { 
    isEditMode, 
    setEditMode, 
    token, 
    setToken, 
    updateContent,
    content
  } = useContent();

  // Check if user is logged in
  const isAdmin = !!token;

  // Then update the login handler
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      console.log('Attempting login...');
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        console.log('Login successful, received token:', data.token);
        console.log('Token length:', data.token.length);
        console.log('Expected token:', ADMIN_TOKEN);
        console.log('Expected token length:', ADMIN_TOKEN.length);
        console.log('Tokens match:', data.token === ADMIN_TOKEN);
        
        // Use the constant token directly to ensure consistency
        setToken(ADMIN_TOKEN);
        setMessage("Admin access granted!");
        setPassword("");
        setTimeout(() => setMessage(""), 3000);
      } else {
        console.error('Login failed:', data.error);
        setMessage(data.error || "Authentication failed");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred during login");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setEditMode(false);
    setMessage("Logged out successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  // This toggles edit mode in our content context
  const toggleEditMode = () => {
    if (isEditMode) {
      // If we're turning edit mode off, we're "saving" the changes
      setMessage("Changes saved successfully!");
    } else {
      // If we're turning edit mode on
      setMessage("Edit mode activated. Click on content to edit.");
    }
    
    setEditMode(!isEditMode);
    setTimeout(() => setMessage(""), 3000);
  };
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="col-span-1">
            <Link href="/" className="font-bold text-xl">
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Dhairya
              </span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xs">
              A passionate student and developer.
            </p>
          </div>

          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                About
              </Link>
              <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Projects
              </Link>
              <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Contact
              </Link>
            </nav>
          </div>

          {/* Social links */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/DhairyaS450" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition" aria-label="GitHub">
                <FaGithub size={24} />
              </a>
              <a href="https://twitter.com/DhairyaShah" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition" aria-label="Twitter">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com/in/dhairya-shah" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
              <a href="mailto:dhairyashah2513@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition" aria-label="Email">
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Admin Section */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Dhairya Shah. All rights reserved.
            </p>
            
            {/* Admin Access */}
            <div className="mt-4 sm:mt-0">
              {!isAdmin ? (
                <button 
                  onClick={() => setShowAdminLogin(!showAdminLogin)}
                  className="text-gray-500 dark:text-gray-500 text-sm flex items-center"
                  aria-label="Admin Access"
                >
                  <FaLock className="mr-1" size={12} />
                  {showAdminLogin ? "Hide Admin" : "Admin Access"}
                </button>
              ) : (
                <div className="flex space-x-4 items-center">
                  <button 
                    onClick={toggleEditMode}
                    className={`text-sm flex items-center ${isEditMode ? 'text-green-500' : 'text-blue-500'}`}
                  >
                    {isEditMode ? "Save Changes" : "Edit Content"}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="text-red-500 text-sm flex items-center"
                  >
                    <FaUnlock className="mr-1" size={12} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Admin Login Form */}
          {showAdminLogin && !isAdmin && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <form onSubmit={handleAdminLogin} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 text-sm flex-grow bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  disabled={isLoggingIn}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition disabled:opacity-50"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          )}
          
          {/* Message Display */}
          {message && (
            <div className={`mt-4 p-2 rounded text-center text-sm ${message.includes("success") || message.includes("granted") ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}>
              {message}
            </div>
          )}
          
          {/* Edit Mode Indicator */}
          {isAdmin && isEditMode && (
            <div className="mt-4 p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm text-center rounded">
              Edit mode is active. Content is now editable.
            </div>
          )}
        </div>
      </div>
    </footer>
  );
} 