"use client";

import { useState } from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

// export const metadata = {
//   title: "Contact | Dhairya Shah",
//   description: "Get in touch with me for collaborations, questions, or just to say hello",
// };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // Simulate form submission
    try {
      // In a real implementation, you would send the data to an API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Have a question or want to work together? Feel free to reach out using the form below.
          </p>
          
          {submitSuccess ? (
            <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg p-4 mb-6">
              <p>Thank you for your message! I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              {submitError && (
                <div className="text-red-600 dark:text-red-400">
                  {submitError}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
        
        {/* Contact Info */}
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <FaEnvelope className="text-blue-600 dark:text-blue-400 text-xl mt-1 mr-4" />
              <div>
                <h3 className="font-medium text-lg">Email</h3>
                <a 
                  href="mailto:dhairyashah2513@gmail.com" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  dhairyashah2513@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-xl mt-1 mr-4" />
              <div>
                <h3 className="font-medium text-lg">Location</h3>
                <p className="text-gray-700 dark:text-gray-300">Kitchener, Ontario, Canada</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaPhone className="text-blue-600 dark:text-blue-400 text-xl mt-1 mr-4" />
              <div>
                <h3 className="font-medium text-lg">Phone</h3>
                <p className="text-gray-700 dark:text-gray-300">+1 (548) 384-7522</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Connect with me</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/DhairyaS450" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                <a 
                  href="https://twitter.com/DhairyaS450" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  aria-label="Twitter"
                >
                  <FaTwitter size={24} />
                </a>
                <a 
                  href="https://linkedin.com/in/dhairyashah2513" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 