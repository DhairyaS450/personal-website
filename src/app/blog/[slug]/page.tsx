"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useContent, BlogPost } from "@/contexts/ContentContext";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, Edit } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { content, isLoading, error, isEditMode } = useContent();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [baseUrl, setBaseUrl] = useState('');
  
  // Access params properties safely
  const pageSlug = params?.slug as string;

  // Set base URL for share links
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  useEffect(() => {
    if (content?.blogPosts) {
      const foundPost = content.blogPosts.find(
        (p) => p.slug === pageSlug && (p.published || isEditMode)
      );
      setPost(foundPost || null);
    }
  }, [content, pageSlug, isEditMode]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-12"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12">
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
          Error loading blog post: {error}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12">
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg">
          Blog post not found. This post might be unavailable or unpublished.
        </div>
        <div className="mt-6">
          <Link
            href="/blog"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 md:px-10 py-12">
      <div className="mb-8">
        <Link
          href="/blog"
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Blog
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {post.title}
        </h1>

        <div className="flex items-center flex-wrap text-sm text-gray-600 dark:text-gray-400 mb-4 gap-y-2">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="mx-2">•</span>
          <span>
            {post.published ? (
              "Published"
            ) : (
              <span className="text-amber-600 dark:text-amber-400">Draft</span>
            )}
          </span>
          {isEditMode && (
            <>
              <span className="mx-2">•</span>
              <Link 
                href={`/blog/editor/${post.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Post
              </Link>
            </>
          )}
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.coverImage && (
        <div className="relative h-64 md:h-96 w-full mb-12 rounded-xl overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-lg dark:prose-invert max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
        <h2 className="text-xl font-bold mb-4">Share this post</h2>
        <div className="flex gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              post.title
            )}&url=${encodeURIComponent(
              `${baseUrl}/blog/${post.slug}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              `${baseUrl}/blog/${post.slug}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
} 