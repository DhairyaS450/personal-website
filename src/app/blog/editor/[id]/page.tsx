// This is a server component
import { EditorClient } from './client';

export default function BlogEditorPage({ params }: { params: { id: string } }) {
  // Extract the ID from params and pass it to the client component
  const id = params.id;
  
  return <EditorClient id={id} />;
} 