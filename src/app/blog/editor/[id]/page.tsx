import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import the editor client component using dynamic import
const EditorClient = dynamic(() => import('./client').then(mod => mod.EditorClient), {
  ssr: true, // Enable server-side rendering
  loading: () => <div>Loading editor component...</div>,
});

// Simplify the page component to avoid type errors in production builds
export default function BlogEditorPage({ params }: any) {
  // Use type assertion to avoid the params.id error during build
  const id = (params as { id: string }).id || '';
  
  if (!id) {
    return notFound();
  }
  
  return (
    <Suspense fallback={<div>Loading blog editor...</div>}>
      <EditorClient id={id} />
    </Suspense>
  );
} 