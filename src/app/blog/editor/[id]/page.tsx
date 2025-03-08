import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import the editor client component using dynamic import
const EditorClient = dynamic(() => import('./client').then(mod => mod.EditorClient), {
  ssr: true, // Enable server-side rendering
  loading: () => <div>Loading editor component...</div>,
});

// Match the exact type expected by Next.js in production
type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export default function BlogEditorPage({ params }: Props) {
  // Basic validation of the id parameter
  if (!params.id) {
    return notFound();
  }
  
  return (
    <Suspense fallback={<div>Loading blog editor...</div>}>
      <EditorClient id={params.id} />
    </Suspense>
  );
} 