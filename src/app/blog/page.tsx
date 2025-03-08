"use client";

import Image from "next/image";
import Link from "next/link";
import { useContent, BlogPost } from "@/contexts/ContentContext";
import { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { formatDate } from "@/lib/utils";



export default function BlogPage() {
  const { content, isLoading, error, isEditMode } = useContent();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Load blog posts from content
  useEffect(() => {
    if (content?.blogPosts) {
      // Sort blog posts by publishedAt date, newest first
      const sortedPosts = [...content.blogPosts]
        .filter(post => post.published || isEditMode)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      setBlogPosts(sortedPosts);
    }
  }, [content?.blogPosts, isEditMode]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-1 md:col-span-2 h-80 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
          Error loading blog: {error}
        </div>
      </div>
    );
  }

  // Handle case where there are no blog posts yet
  if (blogPosts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
          {isEditMode && (
            <Link href="/blog/editor/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-300">
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Create Post
            </Link>
          )}
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-12 max-w-3xl">
          Welcome to my blog where I share my thoughts, experiences, and tutorials on web development, design, and technology.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center">
          {isEditMode ? (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">No blog posts yet. Create your first post!</p>
              <Link href="/blog/editor/new" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300">
                <PlusCircleIcon className="h-5 w-5 inline-block mr-2" />
                Create Your First Post
              </Link>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No blog posts yet. Check back soon!</p>
          )}
        </div>
      </div>
    );
  }

  const featuredPost = blogPosts[0]; // First post is featured
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
        {isEditMode && (
          <Link href="/blog/editor/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-300">
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Create Post
          </Link>
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-12 max-w-3xl">
        Welcome to my blog where I share my thoughts, experiences, and tutorials on web development, design, and technology.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Featured Post */}
        <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-60 md:h-auto">
              <Image
                src={featuredPost.coverImage || "/images/blog-placeholder.jpg"}
                alt={featuredPost.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 md:w-1/2 md:flex md:flex-col md:justify-center">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 flex-wrap">
                <span>{formatDate(featuredPost.publishedAt)}</span>
                <span className="mx-2">•</span>
                <span>
                  {featuredPost.published ? (
                    "Published"
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400">Draft</span>
                  )}
                </span>
                {featuredPost.tags.length > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="flex flex-wrap gap-2">
                      {featuredPost.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </span>
                  </>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-4">{featuredPost.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex gap-3">
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Read More →
                </Link>
                {isEditMode && (
                  <Link 
                    href={`/blog/editor/${featuredPost.id}`}
                    className="text-gray-600 dark:text-gray-400 hover:underline font-medium"
                  >
                    Edit
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Other Posts */}
        {otherPosts.map((post) => (
          <div 
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={post.coverImage || "/images/blog-placeholder.jpg"}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 flex-wrap gap-y-1">
                <span>{formatDate(post.publishedAt)}</span>
                <span className="mx-2">•</span>
                <span>
                  {post.published ? (
                    "Published"
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400">Draft</span>
                  )}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex gap-3">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Read More →
                </Link>
                {isEditMode && (
                  <Link 
                    href={`/blog/editor/${post.id}`}
                    className="text-gray-600 dark:text-gray-400 hover:underline font-medium"
                  >
                    Edit
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 