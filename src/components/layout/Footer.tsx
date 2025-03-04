import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
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
              A passionate developer focused on creating beautiful and functional web experiences.
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

          {/* Connect */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="mailto:your.email@example.com" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                aria-label="Email"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {currentYear} YourName. All rights reserved.</p>
          <p className="mt-2">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
} 