// This is a server component
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import the client component using dynamic import
const BlogClient = dynamic(() => import('./client').then(mod => mod.BlogClient), {
  ssr: true, // Enable server-side rendering
  loading: () => <div>Loading client component...</div>,
});

// Match the exact type expected by Next.js in production
type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

export default function BlogPostPage({ params }: Props) {
  // Basic validation of the slug parameter
  if (!params.slug) {
    return notFound();
  }
  
  return (
    <Suspense fallback={<div>Loading blog post...</div>}>
      <BlogClient slug={params.slug} />
    </Suspense>
  );
} 