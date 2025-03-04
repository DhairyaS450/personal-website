import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog | Dhairya Shah",
  description: "Personal blog with articles about web development, design, and technology",
};

// In a real implementation, this data would likely come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn how to set up your first Next.js project with TypeScript and Tailwind CSS.",
    date: "June 15, 2023",
    readTime: "5 min read",
    slug: "getting-started-with-nextjs",
    image: "/images/project1.jpg", // Reusing project image as placeholder
  },
  {
    id: 2,
    title: "The Power of Tailwind CSS",
    excerpt: "Discover why Tailwind CSS has become one of the most popular utility-first CSS frameworks.",
    date: "May 22, 2023",
    readTime: "7 min read",
    slug: "power-of-tailwind-css",
    image: "/images/project2.jpg", // Reusing project image as placeholder
  },
  {
    id: 3,
    title: "React Hooks Explained",
    excerpt: "A comprehensive guide to React hooks and how they make functional components more powerful.",
    date: "April 10, 2023",
    readTime: "10 min read",
    slug: "react-hooks-explained",
    image: "/images/project3.jpg", // Reusing project image as placeholder
  },
  {
    id: 4,
    title: "Building Accessible Websites",
    excerpt: "Learn why web accessibility matters and how to implement it in your projects.",
    date: "March 5, 2023",
    readTime: "8 min read",
    slug: "building-accessible-websites",
    image: "/images/project1.jpg", // Reusing project image as placeholder
  },
  {
    id: 5,
    title: "Introduction to TypeScript",
    excerpt: "Why you should consider using TypeScript in your next JavaScript project.",
    date: "February 18, 2023",
    readTime: "6 min read",
    slug: "introduction-to-typescript",
    image: "/images/project2.jpg", // Reusing project image as placeholder
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-12 max-w-3xl">
        Welcome to my blog where I share my thoughts, experiences, and tutorials on web development, design, and technology.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Featured Post */}
        <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-60 md:h-auto">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 md:w-1/2 md:flex md:flex-col md:justify-center">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{blogPosts[0].date}</span>
                <span className="mx-2">•</span>
                <span>{blogPosts[0].readTime}</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {blogPosts[0].excerpt}
              </p>
              <Link 
                href={`/blog/${blogPosts[0].slug}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>

        {/* Other Posts */}
        {blogPosts.slice(1).map((post) => (
          <div 
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 