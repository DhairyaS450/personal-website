"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContent } from "@/contexts/ContentContext";
import { generateSlug } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Save,
  Eye,
  ChevronLeft
} from 'lucide-react';

interface EditorClientProps {
  id: string;
}

interface EditorProps {
  id: string;
  isNew: boolean;
}

// Define a type for the post's state
interface PostState {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  published: boolean;
}

export function EditorClient({ id }: EditorClientProps) {
  const router = useRouter();
  const { isEditMode, token } = useContent();
  
  // Determine if this is a new post
  const isNew = id === "new";
  
  // If not in edit mode or no token, redirect to blog page
  useEffect(() => {
    if (!isEditMode || !token) {
      router.push('/blog');
    }
  }, [isEditMode, token, router]);

  if (!isEditMode || !token) {
    return null; // Don't render anything while redirecting
  }

  return <BlogPostEditor id={id} isNew={isNew} />;
}

function BlogPostEditor({ id, isNew }: EditorProps) {
  const router = useRouter();
  const { content, updateContent } = useContent();
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  // Initialize post state
  const [post, setPost] = useState<PostState>({
    id: isNew ? uuidv4() : id,
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: [],
    published: false,
  });

  // Load existing post data if editing
  useEffect(() => {
    if (!isNew && content?.blogPosts) {
      const existingPost = content.blogPosts.find(p => p.id === id);
      if (existingPost) {
        console.log("Loading existing post:", existingPost);
        
        // Create a properly typed PostState with all required fields
        const typedPost: PostState = {
          id: existingPost.id,
          title: existingPost.title,
          slug: existingPost.slug,
          content: existingPost.content || "", // Ensure content is never undefined
          excerpt: existingPost.excerpt,
          coverImage: existingPost.coverImage || "",
          publishedAt: existingPost.publishedAt,
          updatedAt: existingPost.updatedAt || new Date().toISOString(),
          tags: existingPost.tags,
          published: existingPost.published
        };
        
        console.log("Setting post state with content:", typedPost.content);
        setPost(typedPost);
        setTagsInput(existingPost.tags.join(", "));
      } else {
        // Post not found, redirect to blog
        console.log("Post not found with ID:", id);
        router.push('/blog');
      }
    }
  }, [isNew, id, content, router]);

  // Configure the editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Write your blog post content here...',
      }),
    ],
    content: post.content,
    onUpdate: ({ editor }: { editor: any }) => {
      const newContent = editor.getHTML();
      console.log(`Editor content updated (${newContent.length} chars)`);
      
      setPost(prev => {
        const updated = {
          ...prev,
          content: newContent,
        };
        return updated;
      });
    },
  });

  // Update editor content when post content changes
  useEffect(() => {
    if (editor && post.content && editor.getHTML() !== post.content) {
      editor.commands.setContent(post.content);
    }
  }, [editor, post.content]);

  // Update slug when title changes
  useEffect(() => {
    if (post.title) {
      setPost(prev => ({
        ...prev,
        slug: generateSlug(prev.title),
      }));
    }
  }, [post.title]);

  // Handle tag input changes
  const handleTagsChange = (input: string) => {
    setTagsInput(input);
    const tags = input
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    setPost(prev => ({ ...prev, tags }));
  };

  // Handle form field changes
  const handleChange = (field: keyof PostState, value: string | boolean) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };

  // Save the post
  const savePost = async () => {
    if (!post.title) {
      alert("Please provide a title for your blog post");
      return;
    }

    try {
      setIsSaving(true);
      
      // Log the current post state for debugging
      console.log("Saving post with content:", post);
      
      // Generate excerpt if it's empty
      if (!post.excerpt.trim()) {
        // Get text content from HTML and truncate
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = post.content;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        const excerpt = textContent.slice(0, 150) + (textContent.length > 150 ? '...' : '');
        setPost(prev => ({ ...prev, excerpt }));
      }
      
      // Update the post's updatedAt field
      const updatedPost = {
        ...post,
        content: post.content || "", // Ensure content is explicitly set and never undefined
        updatedAt: new Date().toISOString(),
      };
      
      console.log("Final post object to save:", {
        id: updatedPost.id,
        title: updatedPost.title,
        contentLength: updatedPost.content?.length || 0,
        contentPreview: updatedPost.content?.substring(0, 100) || "",
      });
      
      // Prepare the updated content
      if (!content) {
        throw new Error("No content available");
      }

      // Create a copy of the content with properly initialized arrays if needed
      const updatedContent = {
        projects: content.projects || [],
        academicAchievements: content.academicAchievements || [],
        extracurricularActivities: content.extracurricularActivities || [],
        files: content.files || [],
        aboutMe: content.aboutMe,
        collaborations: content.collaborations,
        volunteering: content.volunteering,
        education: content.education,
        home: content.home,
        blogPosts: content.blogPosts || []
      };
      
      // Ensure blogPosts is always defined and is an array
      if (!updatedContent.blogPosts) {
        updatedContent.blogPosts = [];
      }
      
      // Find the post's index in the array if it exists
      const existingPostIndex = updatedContent.blogPosts.findIndex(p => p.id === updatedPost.id);
      
      if (existingPostIndex >= 0) {
        // Update existing post
        updatedContent.blogPosts[existingPostIndex] = updatedPost;
        console.log("Updating existing post at index:", existingPostIndex);
      } else {
        // Add new post
        updatedContent.blogPosts.push(updatedPost);
        console.log("Adding new post");
      }
      
      // Log the updated content before saving
      console.log("Saving updated content with blogPosts:", updatedContent.blogPosts);
      
      // Save to backend
      const success = await updateContent(updatedContent);
      
      if (success) {
        console.log("Post saved successfully");
        // Show success message briefly before redirecting
        alert("Post saved successfully!");
        // Redirect back to blog page after successful save
        router.push('/blog');
      } else {
        console.error("Failed to save post");
        alert("Failed to save the blog post. Please try again.");
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("An error occurred while saving the blog post.");
    } finally {
      setIsSaving(false);
    }
  };

  const togglePublishStatus = () => {
    setPost(prev => ({ ...prev, published: !prev.published }));
  };

  if (!editor) {
    return <div className="p-12 text-center">Loading editor...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => router.push('/blog')}
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Blog
        </button>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-1.5 rounded-md flex items-center ${
              previewMode 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            <Eye className="h-4 w-4 mr-1.5" />
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          
          <button
            onClick={togglePublishStatus}
            className={`px-3 py-1.5 rounded-md ${
              post.published
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            {post.published ? 'Published' : 'Draft'}
          </button>
          
          <button
            onClick={savePost}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-1.5" />
            {isSaving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>
      
      {/* Title Input */}
      <div className="mb-6">
        <input
          type="text"
          value={post.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Post Title"
          className="w-full text-3xl md:text-4xl font-bold bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
        />
        {post.title && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Slug: {post.slug}
          </div>
        )}
      </div>
      
      {/* Cover Image Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Cover Image URL
        </label>
        <input
          type="text"
          value={post.coverImage}
          onChange={(e) => handleChange('coverImage', e.target.value)}
          placeholder="Enter image URL"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
        />
      </div>
      
      {/* Tags Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder="javascript, react, tutorial"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
        />
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Excerpt Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Excerpt (shown in blog listing)
        </label>
        <textarea
          value={post.excerpt}
          onChange={(e) => handleChange('excerpt', e.target.value)}
          placeholder="Brief description of your post"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 resize-none"
        />
      </div>
      
      {/* Toolbar and Editor */}
      {!previewMode && (
        <div className="mb-2 flex flex-wrap items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-t-lg p-2 bg-gray-50 dark:bg-gray-800">
          {/* Text formatting */}
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor?.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Bold"
          >
            <Bold className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor?.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Italic"
          >
            <Italic className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor?.isActive('underline') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Underline"
          >
            <UnderlineIcon className="h-5 w-5" />
          </button>
          
          <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"></div>
          
          {/* Headings */}
          <select 
            onChange={(e) => {
              const level = Number(e.target.value) as 1 | 2 | 3 | 0;
              if (level === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor?.chain().focus().setHeading({ level }).run();
              }
            }}
            value={
              editor?.isActive('heading', { level: 1 }) ? '1' : 
              editor?.isActive('heading', { level: 2 }) ? '2' : 
              editor?.isActive('heading', { level: 3 }) ? '3' : '0'
            }
            className="p-2 rounded bg-transparent border border-gray-300 dark:border-gray-600"
          >
            <option value="0">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
          
          <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"></div>
          
          {/* Lists */}
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor?.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Bullet List"
          >
            <List className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor?.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Numbered List"
          >
            <ListOrdered className="h-5 w-5" />
          </button>
          
          <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"></div>
          
          {/* Link */}
          <button
            onClick={() => {
              const url = window.prompt('Enter URL');
              if (url) {
                editor?.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor?.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Insert Link"
          >
            <LinkIcon className="h-5 w-5" />
          </button>
          
          {/* Image */}
          <button
            onClick={() => {
              const url = window.prompt('Enter image URL');
              if (url) {
                editor?.chain().focus().setImage({ src: url }).run();
              }
            }}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Insert Image"
          >
            <ImageIcon className="h-5 w-5" />
          </button>
        </div>
      )}
      
      {/* Editor or Preview */}
      <div className={`min-h-[500px] p-4 border border-gray-300 dark:border-gray-700 rounded-b-lg ${previewMode ? 'rounded-t-lg' : ''} bg-white dark:bg-gray-800`}>
        {previewMode ? (
          <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </div>
  );
} 