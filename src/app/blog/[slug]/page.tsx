// This is a server component
import { BlogClient } from '@/app/blog/[slug]/client';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Get the slug from the params - must use await since params is a Promise in Next.js 15
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  return <BlogClient slug={slug} />;
} 