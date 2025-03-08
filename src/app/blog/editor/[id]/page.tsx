// This is a server component
import { EditorClient } from '@/app/blog/editor/[id]/client';

export default async function BlogEditorPage({ params }: { params: { id: string } }) {
  // Get the ID from the params - must use await since params is a Promise in Next.js 15
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  return <EditorClient id={id} />;
} 