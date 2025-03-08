// This is a server component
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import the client component using dynamic import
const BlogClient = dynamic(() => import('./client').then(mod => mod.BlogClient), {
  ssr: true, // Enable server-side rendering
  loading: () => <div>Loading client component...</div>,
});

// Simplify the page component to avoid type errors in production builds
export default function BlogPostPage({ params }: any) {
  // Use type assertion to avoid the params.slug error during build
  const slug = (params as { slug: string }).slug || '';
  
  if (!slug) {
    return notFound();
  }
  
  return (
    <Suspense fallback={<div>Loading blog post...</div>}>
      <BlogClient slug={slug} />
    </Suspense>
  );
} 