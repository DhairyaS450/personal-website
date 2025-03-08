"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Add this at the top of the file, after imports
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN || 'fallback-admin-token-12345';

// Define types for our content
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
    // Add more projects here if needed
  ],
  academicAchievements: [
    {
      title: "Canadian Computing Competition (CCC)",
      description: "Scored 73/75 in the Junior Division, ranking among the top performers at school.",
      year: "2025",
    },
    // Add more achievements here if needed
  ],
  extracurricularActivities: [
    {
      title: "Youth Tech Labs",
      description: "Developed AI healthcare application and other tech solutions. Collaborated with peers and presented solutions.",
      period: "February 2025 - Present",
    },
    // Add more activities here if needed
  ],
  files: [
    {
      title: "Resume",
      description: "My current resume detailing academic achievements and technical skills",
      fileUrl: "/files/resume.pdf",
      fileType: "PDF",
    },
    {
      title: "Youth Tech Labs Demo Day Photo",
      description: "Photo of my second place award at the Youth Tech Labs Demo Day",
      fileUrl: "/files/ytl_photo.png",
      fileType: "PNG",
    },
    {
      title: "Pascal Math Competition Certificate",
      description: "Certificate of achievement from the Pascal Math Competition",
      fileUrl: "/files/pascal.jpg",
      fileType: "JPEG",
    },
    {
      title: "CIMC Math Competition Certificate",
      description: "Certificate of achievement from the CIMC Math Competition",
      fileUrl: "/files/cimc.jpg",
      fileType: "JPEG",
    },
    {
      title: "CCC Score",
      description: "Score of 73/75 in the Junior Division of the Canadian Computing Competition",
      fileUrl: "/files/ccc_score.png",
      fileType: "PNG",
    },
    {
      title: "DECA Provincial Proof",
      description: "Proof of participation in DECA Provincials",
      fileUrl: "/files/deca.jpg",
      fileType: "JPEG",
    },
  ],
  
  // About page content
  aboutMe: {
    paragraphs: [
      "Hi! I'm Dhairya Shah, a high school student, developer, and problem-solver with a passion for building innovative digital solutions. Ever since I started coding, I've been fascinated by how technology can streamline everyday tasks and create meaningful change.",
      "I specialize in full-stack development, with a focus on creating scalable and efficient solutions. I'm also experienced in machine learning and AI, and I'm always looking for new ways to use technology to solve problems.",
      "Beyond coding, I'm actively involved in math competitions, DECA, STEM and chess, always looking for ways to challenge myself and grow. I also enjoy working out, playing the guitar, and exploring new technologies.",
      "I'm always open to collaborating on exciting projects or learning opportunities—feel free to reach out!"
    ]
  },
  
  collaborations: [
    {
      title: "Youth Tech Labs",
      period: "February 2025 - Present",
      organization: "Youth Tech Labs",
      description: [
        "Developed solutions for real-world problems related to technology and data science",
        "Created an AI healthcare application with an AI doctor trained on thousands of pieces of relevant data",
        "Used web-scraping and the GPT-3.5 language model to enable multilingual communication",
        "Collaborated with peers to design and implement these projects",
        "Presented solutions at demo days and workshops"
      ]
    },
    {
      title: "TaskTide AI",
      period: "2025",
      organization: "Personal Project",
      description: [
        "Developed an AI-powered scheduling application for personalized, adaptive study plans",
        "Integrated Google Calendar and other task management platforms for real-time updates",
        "Designed an AI chatbot for task automation and study assistance",
        "Currently in testing phase among students, with plans for wider release"
      ]
    },
    {
      title: "Toyota",
      period: "2025",
      organization: "Toyota",
      description: [
        "Assisted in writing software code and developing solutions for internal projects",
        "Gained hands-on experience in a professional technology environment",
        "Learned about industry standards and professional development workflows"
      ]
    }
  ],
  
  volunteering: [
    {
      title: "Cameron Heights Collegiate Institute",
      period: "2025",
      description: [
        "Helped run various school events and activities",
        "Assisted with Grade 9 Orientation by organizing and setting up decorations and food",
        "Checked tickets for school homecoming events"
      ]
    },
    {
      title: "Canada Day Event",
      period: "2025",
      description: [
        "Checked one of the gates to ensure only authorized members entered",
        "Sold tickets for a lucky draw fundraiser",
        "Assisted with event organization and crowd management"
      ]
    },
    {
      title: "Middle School STEM Support",
      period: "2024",
      description: [
        "Provided advice and mentorship to younger students",
        "Helped the STEM club with Arduino programming and projects",
        "Provided assistance to teachers for technical activities"
      ]
    }
  ],
  
  education: [
    {
      institution: "Cameron Heights Collegiate Institute",
      degree: "High School",
      period: "2023 - Present",
      description: "Relevant courses: Exploring Technologies, Introduction to Computer Science Gr 11"
    }
  ],
  
  // Home page content
  home: {
    hero: {
      title: "Dhairya Shah",
      subtitle: "HS Student & Developer",
      description: "I'm passionate about building innovative digital experiences that are fast, intuitive, and accessible. With a strong foundation in software development, I specialize in creating web and mobile applications that solve real-world problems. Currently, I'm exploring AI-driven solutions, full-stack development, and efficient system design."
    },
    featuredProjects: {
      heading: "Featured Projects",
      subheading: "A selection of my recent work. These projects showcase my skills and experience",
      projectIds: [1, 2, 3] // IDs of the featured projects
    }
  },
  
  // Blog content
  blogPosts: [
    // Add blog posts here if needed
  ]
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