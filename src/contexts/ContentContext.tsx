"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { 
  WebsiteContent as SupabaseContent, 
  Project as SupabaseProject, 
  Achievement, 
  Activity,
  File as SupabaseFile,
  AboutMe,
  BlogPost as SupabaseBlogPost
} from '@/lib/supabase';

// Add this at the top of the file, after imports
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN || 'fallback-admin-token-12345';

// Define types for our content for backward compatibility
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface AcademicAchievement {
  title: string;
  description: string;
  year: string;
}

export interface ExtracurricularActivity {
  title: string;
  description: string;
  period: string;
}

export interface File {
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
}

// About page types
export interface AboutMeContent {
  paragraphs: string[];
}

export interface Collaboration {
  title: string;
  period: string;
  organization: string;
  description: string[];
}

export interface VolunteerExperience {
  title: string;
  period: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

// Blog post types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  published: boolean;
}

// Home page types
export interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  featuredProjects: {
    heading: string;
    subheading: string;
    projectIds: number[]; // IDs from the projects array
  };
}

// Academics page types
export interface CourseEntry {
  subject: string;
  code: string;
}

export interface GradeSection {
  title: string;
  status: string;
  courses: CourseEntry[];
}

export interface ExamScore {
  name: string;
  score: string;
  maxScore: string;
  year: string;
  description: string;
  highlights: string[];
}

export interface AcademicsContent {
  title: string;
  subtitle: string;
  courseHistory: GradeSection[];
  examScores: ExamScore[];
  academicAchievements: AcademicAchievement[];
  academicGoals: string[];
}

export interface WebsiteContent {
  // Projects page content
  projects: Project[];
  academicAchievements: AcademicAchievement[];
  extracurricularActivities: ExtracurricularActivity[];
  files?: File[];
  
  // About page content
  aboutMe?: AboutMeContent;
  collaborations?: Collaboration[];
  volunteering?: VolunteerExperience[];
  education?: Education[];
  
  // Home page content
  home?: HomeContent;
  
  // Blog content
  blogPosts?: BlogPost[];
  
  // Academics page content
  academics?: AcademicsContent;
}

// Fallback content in case API fails
const fallbackContent: WebsiteContent = {
  projects: [
    {
      id: 1,
      title: "TaskTide AI",
      description: "An AI-powered study scheduler for students. It uses AI to help students manage their time and study schedule.",
      image: "/images/trackai.png",
      tags: ["React", "TypeScript", "Tailwind CSS", "OpenAI API", "Gemini API", "Firebase"],
      githubUrl: "https://github.com/DhairyaS450/track-ai-web",
      liveUrl: "https://tasktide-ai.vercel.app/",
    },
  ],
  academicAchievements: [
    {
      title: "Canadian Computing Competition (CCC)",
      description: "Scored 73/75 in the Junior Division, ranking among the top performers at school.",
      year: "2025",
    }
  ],
  extracurricularActivities: [
    {
      title: "Youth Tech Labs",
      description: "Developed AI healthcare application and other tech solutions. Collaborated with peers and presented solutions.",
      period: "February 2025 - Present",
    }
  ],
  files: [
    {
      title: "Resume",
      description: "My current resume detailing academic achievements and technical skills",
      fileUrl: "/files/resume.pdf",
      fileType: "PDF",
    }
  ],
  aboutMe: {
    paragraphs: [
      "Hi! I'm Dhairya Shah, a high school student, developer, and problem-solver with a passion for building innovative digital solutions.",
    ]
  },
  blogPosts: [],
  academics: {
    title: "Academic Journey",
    subtitle: "I currently attend Cameron Heights Collegiate Institute and am in the IB program.\nMy educational path, achievements, and course history",
    courseHistory: [
      {
        title: "Grade 9",
        status: "(Completed)",
        courses: [
          { subject: "English", code: "ENG1W" },
          { subject: "Mathematics", code: "MTH1W" },
          { subject: "Science", code: "SNC1W" },
          { subject: "Geography", code: "CGC1D" }
        ]
      },
      {
        title: "Grade 10",
        status: "(Current Year)",
        courses: [
          { subject: "English", code: "ENG2D" },
          { subject: "Math", code: "MPM2D" },
          { subject: "Science", code: "SNC2D" },
          { subject: "History", code: "CHC2D" }
        ]
      }
    ],
    examScores: [
      {
        name: "2025 CCC Exam",
        score: "58",
        maxScore: "75",
        year: "2025",
        description: "The Canadian Computing Competition (CCC) is a programming competition that tests problem-solving and algorithmic thinking skills.",
        highlights: [
          "Above average performance in algorithmic challenges",
          "Strong problem-solving demonstration",
          "Efficient code implementation"
        ]
      }
    ],
    academicAchievements: [
      {
        title: "Academic Honor Roll",
        year: "2023",
        description: "Maintained high academic standing throughout the academic year."
      }
    ],
    academicGoals: [
      "Participating in advanced programming competitions",
      "Expanding knowledge in artificial intelligence and machine learning",
      "Maintaining strong academic performance while pursuing practical projects"
    ]
  }
};

interface ContentContextType {
  content: WebsiteContent | null;
  isLoading: boolean;
  error: string | null;
  updateContent: (newContent: WebsiteContent) => Promise<boolean>;
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [fetchAttempted, setFetchAttempted] = useState(false);

  // Initial content fetch
  useEffect(() => {
    async function fetchContent() {
      try {
        setIsLoading(true);
        setError(null); // Clear any previous errors
        
        const response = await fetch("/api/content");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.statusText}`);
        }
        
        const data = await response.json();
        setContent(data);
      } catch (err) {
        console.error("Error fetching content:", err);
        // Don't show authentication errors to regular users when just fetching content
        // This allows users to still see static content even if data fetching fails
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (!errorMessage.includes("Authentication")) {
          setError(errorMessage);
        }
        // Use fallback content if API fails
        if (!content) {
          console.log("Using fallback content due to API error");
          setContent(fallbackContent);
        }
      } finally {
        setIsLoading(false);
        setFetchAttempted(true);
      }
    }

    fetchContent();
  }, []);

  // Use fallback content if fetch was attempted but content is still null
  useEffect(() => {
    if (fetchAttempted && !content) {
      setContent(fallbackContent);
    }
  }, [fetchAttempted, content]);

  // Check for token in localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Update token in localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("adminToken", token);
    } else {
      localStorage.removeItem("adminToken");
    }
  }, [token]);

  // Function to update content - requires authentication
  const updateContent = async (newContent: WebsiteContent): Promise<boolean> => {
    // Clear any previous errors
    setError(null);
    
    // Check for authentication
    if (!token) {
      console.error('Authentication required: No token available');
      setError("Authentication required to save changes");
      return false;
    }

    console.log(`Attempting to update content with token: "${token}"`);
    console.log(`Token length: ${token.length}`);
    
    try {
      setIsLoading(true);
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newContent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || `Failed to update content: ${response.statusText}`;
        console.error('Content update failed:', errorMessage, 'Status:', response.status);
        throw new Error(errorMessage);
      }

      console.log('Content updated successfully');
      setContent(newContent);
      return true;
    } catch (err) {
      console.error("Error updating content:", err);
      setError(err instanceof Error ? err.message : String(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: ContentContextType = {
    content,
    isLoading,
    error,
    updateContent,
    isEditMode,
    setEditMode: setIsEditMode,
    token,
    setToken,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
} 