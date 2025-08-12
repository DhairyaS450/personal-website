"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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

// New Accomplishments Page Types
export interface AccomplishmentModalContent {
  title: string;
  fullDescription: string;
  keyHighlights: string[];
  evidenceUrl?: string;
}

export interface PodiumAchievement {
  rank: 1 | 2 | 3;
  title: string;
  caption: string;
  imageUrl: string;
  badgeUrl: string;
  modalContent: AccomplishmentModalContent;
}

export interface HonorableMention {
  title: string;
  caption: string;
  imageUrl: string;
  badgeUrl: string;
  year: string;
  modalContent: AccomplishmentModalContent;
}

export interface AcademicsContent {
  title: string;
  subtitle: string;
  podiumAchievements: PodiumAchievement[];
  honorableMentions: HonorableMention[];
  // Deprecated fields, will be removed later
  courseHistory?: GradeSection[];
  examScores?: ExamScore[];
  academicAchievements?: AcademicAchievement[];
  academicGoals?: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatarUrl?: string;
}

export interface Service {
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

export interface ProjectFile {
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
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
  softSkills?: string[];
  futureGoals?: string[];
  
  // Home page content
  home?: HomeContent;
  
  // Blog content
  blogPosts?: BlogPost[];
  
  // Academics page content
  academics?: AcademicsContent;

  projectFiles?: ProjectFile[];
  testimonials?: Testimonial[];
  services?: Service[];
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
  collaborations: [
    {
      title: "Project Collaboration",
      period: "2023-Present",
      organization: "ABC Company",
      description: ["Collaborated on a project to develop a new AI-powered study scheduler for students. The project was a success and we achieved our goals."]
    }
  ],
  volunteering: [
    {
      title: "Youth Tech Labs",
      period: "February 2025 - Present",
      description: ["Developed AI healthcare application and other tech solutions. Collaborated with peers and presented solutions."]
    }
  ],
  education: [
    {
      institution: "Cameron Heights Collegiate Institute",
      degree: "IB Diploma",
      period: "2023-Present",
      description: "Currently attending Cameron Heights Collegiate Institute and pursuing the IB program."
    }
  ],
  softSkills: [
    "Strong communication and presentation skills",
    "Team leadership and collaboration",
    "Problem-solving and critical thinking",
    "Time management and organization",
    "Adaptability and quick learning"
  ],
  futureGoals: [
    "Pursue a degree in Computer Engineering or ML",
    "Develop expertise in artificial intelligence and machine learning",
    "Contribute to open-source projects and build a strong portfolio",
    "Gain internship experience at tech companies",
    "Create innovative solutions that have positive social impact"
  ],
  blogPosts: [],
  academics: {
    title: "Achievements",
    subtitle: "I currently attend Cameron Heights Collegiate Institute and am in the IB program.\nMy educational path, achievements, and course history",
    podiumAchievements: [
      {
        rank: 1,
        title: "Top in Class - Grade 10 Math",
        caption: "Achieved highest mark in the class for Grade 10 Math.",
        imageUrl: "/images/achievements/math_topper.jpg",
        badgeUrl: "/images/badges/gold_badge.png",
        modalContent: {
          title: "Top in Class - Grade 10 Math",
          fullDescription: "Dhairya Shah achieved the highest mark in the class for Grade 10 Math, demonstrating exceptional analytical and problem-solving skills.",
          keyHighlights: [
            "Consistently high grades throughout the year",
            "Active participation in math competitions",
            "Demonstrated leadership in group projects"
          ],
          evidenceUrl: "/files/math_topper_certificate.pdf"
        }
      }
    ],
    honorableMentions: [
      {
        title: "Honorable Mention - Science Fair 2025",
        caption: "Received an Honorable Mention at the 2025 Science Fair for the project on renewable energy sources.",
        imageUrl: "/images/achievements/science_fair_2025.jpg",
        badgeUrl: "/images/badges/silver_badge.png",
        year: "2025",
        modalContent: {
          title: "Honorable Mention - Science Fair 2025",
          fullDescription: "Dhairya Shah received an Honorable Mention at the 2025 Science Fair for the project on renewable energy sources, showcasing innovative thinking and dedication to environmental issues.",
          keyHighlights: [
            "In-depth research on renewable energy sources",
            "Innovative project design and implementation",
            "Effective communication of complex ideas"
          ],
          evidenceUrl: "/files/science_fair_certificate.pdf"
        }
      }
    ],
    // Deprecated fields, will be removed later
    courseHistory: [
      {
        title: "Grade 9",
        status: "(Completed)",
        courses: [
          { subject: "Geography", code: "CGC1D" },
          { subject: "Technologies", code: "TIJ1O" },
          { subject: "French", code: "FSF1D" },
          { subject: "English", code: "ENG1W" }
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
  },
  projectFiles: [
    {
      title: "Resume",
      description: "My current resume detailing academic achievements and technical skills",
      fileUrl: "/files/resume.pdf",
      fileType: "PDF",
    }
  ],
  testimonials: [
    {
      name: "John Doe",
      role: "Project Collaborator, ABC Company",
      text: "Working with Dhairya was a pleasure. His technical skills and ability to understand client requirements made our project a success.",
      avatarUrl: "/images/testimonials/avatar1.jpg"
    },
    {
      name: "Jane Smith",
      role: "Chess Student",
      text: "Dhairya is an excellent tutor. He explains complex concepts in a simple way that helped me improve my chess skills significantly.",
      avatarUrl: "/images/testimonials/avatar2.jpg"
    }
  ],
  services: [
    {
      title: "Custom Website Development",
      description: "I create modern, responsive websites for individuals and businesses that are fast, secure, and easy to maintain.",
      icon: "website",
      features: [
        "Mobile-responsive design",
        "SEO optimization",
        "Content management systems",
        "E-commerce integration",
        "Performance optimization"
      ]
    },
    {
      title: "STEM, Coding & Chess Tutoring",
      description: "Personalized tutoring sessions for students of all ages in STEM subjects, programming, and chess strategy.",
      icon: "tutoring",
      features: [
        "Customized learning plans",
        "Hands-on projects",
        "Beginner to advanced levels",
        "One-on-one or small group sessions",
        "Regular progress assessments"
      ]
    }
  ]
};

interface ContentContextType {
  content: WebsiteContent | null;
  isLoading: boolean;
  error: string | null;
  updateContent: (newContent: WebsiteContent) => Promise<boolean>;
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
  isAdmin: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ignore dependency it makes unlimited refresh

  // Use fallback content if fetch was attempted but content is still null
  useEffect(() => {
    if (fetchAttempted && !content) {
      setContent(fallbackContent);
    }
  }, [fetchAttempted, content]);

  // Determine admin status from Supabase user metadata
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (mounted) {
          const isAdminUser = (user?.user_metadata?.role === 'admin') || false;
          setIsAdmin(!!user && isAdminUser);
        }

        // keep in sync with auth changes
        const { data: sub } = supabase.auth.onAuthStateChange(async () => {
          const { data: { user: nextUser } } = await supabase.auth.getUser();
          const isAdminUserNext = (nextUser?.user_metadata?.role === 'admin') || false;
          if (mounted) setIsAdmin(!!nextUser && isAdminUserNext);
        });

        return () => {
          sub.subscription.unsubscribe();
        }
  } catch {
        // non-fatal
        setIsAdmin(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  // Function to update content - requires authentication
  const updateContent = async (newContent: WebsiteContent): Promise<boolean> => {
    // Clear any previous errors
    setError(null);
    
    // Check for admin
    if (!isAdmin) {
      setError("Admin access required to save changes");
      return false;
    }
    
    try {
      setIsLoading(true);
  const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
  isAdmin,
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