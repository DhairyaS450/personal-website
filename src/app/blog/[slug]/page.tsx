// This is a server component
import { BlogClient } from './client';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Extract the slug from params and pass it to the client component
  const slug = params.slug;
  
  return <BlogClient slug={slug} />;
} 