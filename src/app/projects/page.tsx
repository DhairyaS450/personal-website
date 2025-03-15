"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaDownload, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import EditableContent from "@/components/EditableContent";
import EditableList from "@/components/EditableList";
import { useContent, Project, AcademicAchievement, ExtracurricularActivity, File as FileType, Collaboration } from "@/contexts/ContentContext";

// export const metadata = {
//   title: "Projects & Achievements | Dhairya Shah",
//   description: "Showcase of my projects, academic achievements, and extracurricular activities",
// };

// Projects data
const projects = [
  {
    id: 1,
    title: "TaskTide AI",
    description: "An AI-powered study scheduler for students. It uses AI to help students manage their time and study schedule.",
    image: "/images/trackai.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "OpenAI API", "Gemini API", "Firebase"],
    githubUrl: "https://github.com/DhairyaS450/track-ai-web",
    liveUrl: "https://tasktide-ai.vercel.app/",
  },
  {
    id: 2,
    title: "Chess Game + Algorithm",
    description: "A chess game that allows player vs player and player vs computer. The computer uses the minimax algorithm along with alpha-beta pruning to find the best move.",
    image: "/images/project2.jpg",
    tags: ["Python", "Pygame", "Minimax Algorithm", "Alpha-Beta Pruning"],
    githubUrl: "https://github.com/DhairyaS450/chess_ai",
    liveUrl: "https://github.com/DhairyaS450/chess_ai",
  },
  {
    id: 3,
    title: "EcoReceipts",
    description: "A web app created during the SproutHacks 2025 hackathon that allows users to scan their receipts and get a report on the items they bought.",
    image: "/images/ecoreceipt.png",
    tags: ["HTML", "CSS", "Javascript", "MongoDB", "Express", "Gemini API"],
    githubUrl: "https://github.com/DhairyaS450/ecoreceipts",
    liveUrl: "https://ecoscan.photo",
  },
  {
    id: 4,
    title: "Face Recognition App",
    description: "A face recognition app that uses the face_recognition library to detect faces and identify them. Users can add their faces to the database and then the app will identify them when they are in the camera feed.",
    image: "/images/face.png",
    tags: ["Python", "Face Recognition", "OpenCV", "HTML", "CSS", "Javascript", "Flask"],
    githubUrl: "https://github.com/DhairyaS450/FaceRecognitionApp",
    liveUrl: "https://github.com/DhairyaS450/FaceRecognitionApp",
  },
  {
    id: 5,
    title: "Replica Of Tetris",
    description: "A replica of the classic game Tetris. It is a program in html css and javascript.",
    image: "/images/tetris.png",
    tags: ["HTML", "CSS", "Javascript"],
    githubUrl: "https://github.com/DhairyaS450/my-version-of-tetris",
    liveUrl: "https://dhairyas450.github.io/my-version-of-tetris/",
  },
  {
    id: 6,
    title: "Snake AI Agent",
    description: "A python program that uses reinforcement learning to train an AI agent to play the game snake.",
    image: "/images/snake.png",
    tags: ["Python", "Reinforcement Learning", "PyTorch", "Pygame"],
    githubUrl: "https://github.com/DhairyaS450/snake_ai_agent",
    liveUrl: "https://github.com/DhairyaS450/snake_ai_agent",
  },
];

// Academic achievements data
const academicAchievements = [
  {
    title: "Canadian Computing Competition (CCC)",
    description: "Scored 73/75 in the Junior Division, ranking among the top performers at school.",
    year: "2025",
  },
  {
    title: "Youth Tech Labs Demo Day",
    description: "Presented my project to a panel of judges and got second place, winning $300",
    year: "2024",
  },
  {
    title: "Pascal Math Competition",
    description: "Scored around 120, ranking among the top performers at school.",
    year: "2024",
  },
  {
    title: "DECA Provincials",
    description: "Competed in Entrepreneurship Team Decision Making (ETDM), focusing on business strategy and tech innovation.",
    year: "2025",
  },
  {
    title: "Hackathon Awards",
    description: "Won 'Best use of MongoDB' award at SproutHacks. Participated in multiple hackathons including HawkHacks.",
    year: "2025",
  },
  {
    title: "CIMC Math Competition",
    description: "Ranked among the top performers at school.",
    year: "2024",
  },
];

// Extracurricular activities data
const extracurricularActivities = [
  {
    title: "Youth Tech Labs",
    description: "Developed AI healthcare application and other tech solutions. Collaborated with peers and presented solutions.",
    period: "2024 - Present, Ongoing",
  },
  {
    title: "Coding Club at Cameron Heights",
    description: "Active member learning software development and data science. Participated in various competitions.",
    period: "2023 - Present, Ongoing",
  },
  {
    title: "DECA",
    description: "Participated in Entrepreneurship Team Decision Making (ETDM), focusing on business strategy and tech innovation.",
    period: "2025",
  },
  {
    title: "Chess & Tutoring",
    description: "Competitive chess player and tutor for mathematics, coding, and chess to younger students (my family members and family friends).",
    period: "2023 - Present, Ongoing",
  },
  {
    title: "Cross Country Running",
    description: "Participated in cross country running at school, and have been on the team for 2 years now.",
    period: "2023 - Present",
  }
];

// Files and evidence
const files = [
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
];

// Loading fallback component
function ProjectsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-96"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Counter component for statistics
function StatCounter({ end, duration = 2000, label, icon }: { end: number; duration?: number; label: string; icon?: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, isVisible]);

  return (
    <div ref={counterRef} className="flex flex-col items-center">
      <div className="text-blue-600 dark:text-blue-400 mb-2">{icon}</div>
      <div className="text-4xl font-bold mb-1">{count}+</div>
      <div className="text-gray-600 dark:text-gray-400 text-center">{label}</div>
    </div>
  );
}

// The main component
function ProjectsClient() {
  const searchParams = useSearchParams();
  const academicSectionRef = useRef<HTMLElement | null>(null);
  const { content, isLoading, error, updateContent, isEditMode } = useContent();
  
  // Local states for editing
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [localAchievements, setLocalAchievements] = useState<AcademicAchievement[]>([]);
  const [localActivities, setLocalActivities] = useState<ExtracurricularActivity[]>([]);
  const [localFiles, setLocalFiles] = useState<FileType[]>([]);
  const [localCollaborations, setLocalCollaborations] = useState<Collaboration[]>([]);
  const [prevEditMode, setPrevEditMode] = useState(false);

  // Initialize local states from content
  useEffect(() => {
    if (content) {
      console.log('Initializing local states from content');
      console.log('Files from content:', content.files);
      setLocalProjects(content.projects || []);
      setLocalAchievements(content.academicAchievements || []);
      setLocalActivities(content.extracurricularActivities || []);
      setLocalFiles(content.files || files); // Fallback to static files if none in content
      setLocalCollaborations(content.collaborations || []);
    }
  }, [content]);
  
  // Only track edit mode changes after initial content load
  useEffect(() => {
    if (!content) return; // Don't track edit mode changes until content is loaded
    setPrevEditMode(isEditMode);
  }, [isEditMode, content]);
  
  // Save changes only when exiting edit mode, not on initial load
  useEffect(() => {
    // Skip on first render and when there's no content
    if (!content) return;
    
    // Only update content if we're exiting edit mode (was previously true, now false)
    if (prevEditMode && !isEditMode) {
      console.log('Exiting edit mode, saving changes...');
      console.log('Files being saved:', localFiles);
      
      // Create content update object
      const updatedContent = {
        ...content,
        projects: localProjects,
        academicAchievements: localAchievements,
        extracurricularActivities: localActivities,
        files: localFiles,
        collaborations: localCollaborations
      };
      
      updateContent(updatedContent)
        .then(success => {
          if (success) {
            console.log('Changes saved successfully');
          } else {
            console.error('Failed to save changes');
          }
        })
        .catch(err => {
          console.error('Error saving changes:', err);
        });
    }
  }, [isEditMode, prevEditMode, localProjects, localAchievements, localActivities, localFiles, localCollaborations, content, updateContent]);

  // Scroll to academic section if needed
  useEffect(() => {
    if (searchParams.has('academic_achievements') && academicSectionRef.current) {
      // Add a small delay to ensure the page is fully loaded
      setTimeout(() => {
        academicSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  }, [searchParams]);

  // Project update handlers
  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...localProjects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setLocalProjects(updatedProjects);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now(), // Use timestamp as temporary ID
      title: "New Project",
      description: "Project description",
      image: "/images/placeholder.jpg",
      tags: ["Tag1", "Tag2"],
      githubUrl: "https://github.com/",
      liveUrl: "https://example.com/",
    };
    setLocalProjects([...localProjects, newProject]);
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...localProjects];
    updatedProjects.splice(index, 1);
    setLocalProjects(updatedProjects);
  };

  // Achievement update handlers
  const updateAchievement = (index: number, field: keyof AcademicAchievement, value: string) => {
    const updatedAchievements = [...localAchievements];
    updatedAchievements[index] = { ...updatedAchievements[index], [field]: value };
    setLocalAchievements(updatedAchievements);
  };

  const addAchievement = () => {
    const newAchievement: AcademicAchievement = {
      title: "New Achievement",
      description: "Achievement description",
      year: new Date().getFullYear().toString(),
    };
    setLocalAchievements([...localAchievements, newAchievement]);
  };

  const removeAchievement = (index: number) => {
    const updatedAchievements = [...localAchievements];
    updatedAchievements.splice(index, 1);
    setLocalAchievements(updatedAchievements);
  };

  // Activity update handlers
  const updateActivity = (index: number, field: keyof ExtracurricularActivity, value: string) => {
    const updatedActivities = [...localActivities];
    updatedActivities[index] = { ...updatedActivities[index], [field]: value };
    setLocalActivities(updatedActivities);
  };

  const addActivity = () => {
    const newActivity: ExtracurricularActivity = {
      title: "New Activity",
      description: "Activity description",
      period: "Ongoing",
    };
    setLocalActivities([...localActivities, newActivity]);
  };

  const removeActivity = (index: number) => {
    const updatedActivities = [...localActivities];
    updatedActivities.splice(index, 1);
    setLocalActivities(updatedActivities);
  };

  // File update handlers
  const updateFile = (index: number, field: keyof FileType, value: string) => {
    const updatedFiles = [...localFiles];
    updatedFiles[index] = { ...updatedFiles[index], [field]: value };
    setLocalFiles(updatedFiles);
  };

  const addFile = () => {
    const newFile: FileType = {
      title: "New File",
      description: "File description",
      fileUrl: "/files/example.pdf",
      fileType: "PDF",
    };
    setLocalFiles([...localFiles, newFile]);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...localFiles];
    updatedFiles.splice(index, 1);
    setLocalFiles(updatedFiles);
  };

  // Collaboration update handlers
  const updateCollaboration = (index: number, field: keyof Collaboration, value: any) => {
    const updatedCollaborations = [...localCollaborations];
    updatedCollaborations[index] = { ...updatedCollaborations[index], [field]: value };
    setLocalCollaborations(updatedCollaborations);
  };

  const addCollaboration = () => {
    const newCollaboration: Collaboration = {
      title: "New Project",
      period: "Current",
      organization: "Organization Name",
      description: ["Add project description"]
    };
    setLocalCollaborations([...localCollaborations, newCollaboration]);
  };

  const removeCollaboration = (index: number) => {
    const updatedCollaborations = [...localCollaborations];
    updatedCollaborations.splice(index, 1);
    setLocalCollaborations(updatedCollaborations);
  };

  // Make sure we always have data to display, even if localFiles is empty
  const projectsToDisplay = localProjects.length > 0 ? localProjects : projects;
  const achievementsToDisplay = localAchievements.length > 0 ? localAchievements : academicAchievements;
  const activitiesToDisplay = localActivities.length > 0 ? localActivities : extracurricularActivities;
  const filesToDisplay = localFiles.length > 0 ? localFiles : files;

  if (isLoading) return <ProjectsLoading />;
  if (error) return <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 text-red-500">Error loading content: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      {/* Projects Section */}
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Projects</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-12 max-w-3xl">
          A collection of my technical projects, showcasing my skills in web development, AI/ML, and software engineering.
        </p>

        {/* Statistics Counter Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-xl p-8 mb-12 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCounter 
              end={8} 
              label="Projects Completed" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>}
            />
            <StatCounter 
              end={3} 
              label="Hackathons" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
              </svg>}
            />
            <StatCounter 
              end={300} 
              label="GitHub Commits" 
              icon={<FaGithub className="w-7 h-7" />}
            />
            <StatCounter 
              end={12} 
              label="Technologies" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
              </svg>}
            />
          </div>
        </div>

        {isEditMode && (
          <button
            onClick={addProject}
            className="mb-6 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" /> Add New Project
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsToDisplay.map((project, index) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl relative"
            >
              {isEditMode && (
                <button
                  onClick={() => removeProject(index)}
                  className="absolute top-2 right-2 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  aria-label="Delete Project"
                >
                  <FaTrash size={12} />
                </button>
              )}
              
              <div className="relative h-60 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {isEditMode && (
                  <div className="absolute bottom-2 right-2">
                    <button
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                      aria-label="Edit Image URL"
                      onClick={() => {
                        const newUrl = prompt("Enter new image URL", project.image);
                        if (newUrl) updateProject(index, 'image', newUrl);
                      }}
                    >
                      <FaEdit size={12} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <EditableContent
                  value={project.title}
                  onChange={(value) => updateProject(index, 'title', value)}
                  as="h2"
                  className="text-xl font-bold mb-2"
                />
                
                <EditableContent
                  value={project.description}
                  onChange={(value) => updateProject(index, 'description', value)}
                  as="p"
                  className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3"
                  isTextArea
                />
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <EditableContent
                      key={tagIndex}
                      value={tag}
                      onChange={(value) => {
                        const newTags = [...project.tags];
                        newTags[tagIndex] = value;
                        updateProject(index, 'tags', newTags);
                      }}
                      as="span"
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs"
                      isPlainValue
                    />
                  ))}
                  
                  {isEditMode && (
                    <button
                      onClick={() => {
                        updateProject(index, 'tags', [...project.tags, 'New Tag']);
                      }}
                      className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-md text-xs flex items-center"
                    >
                      <FaPlus size={8} className="mr-1" /> Add Tag
                    </button>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex flex-col">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1"
                      aria-label="GitHub"
                    >
                      <FaGithub size={18} />
                      <span>Code</span>
                    </a>
                    {isEditMode && (
                      <EditableContent
                        value={project.githubUrl}
                        onChange={(value) => updateProject(index, 'githubUrl', value)}
                        as="span"
                        className="text-xs text-gray-500"
                        isPlainValue
                      />
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1"
                      aria-label="Live Demo"
                    >
                      <FaExternalLinkAlt size={16} />
                      <span>Demo</span>
                    </a>
                    {isEditMode && (
                      <EditableContent
                        value={project.liveUrl}
                        onChange={(value) => updateProject(index, 'liveUrl', value)}
                        as="span"
                        className="text-xs text-gray-500"
                        isPlainValue
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Collaborations */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Project Collaborations</h2>
        
        {isEditMode && (
          <button
            onClick={addCollaboration}
            className="mb-6 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" /> Add Collaboration
          </button>
        )}
        
        <div className="space-y-8">
          {localCollaborations.map((collab, index) => (
            <div key={index} className="border-l-4 border-blue-600 pl-6 py-2 relative">
              {isEditMode && (
                <button
                  onClick={() => removeCollaboration(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  aria-label="Delete Collaboration"
                >
                  <FaTrash size={12} />
                </button>
              )}
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                {isEditMode ? (
                  <EditableContent
                    value={collab.title}
                    onChange={(value) => updateCollaboration(index, 'title', value)}
                    as="h3"
                    className="text-xl font-bold"
                  />
                ) : (
                  <h3 className="text-xl font-bold">{collab.title}</h3>
                )}
                
                {isEditMode ? (
                  <EditableContent
                    value={collab.period}
                    onChange={(value) => updateCollaboration(index, 'period', value)}
                    as="span"
                    className="text-gray-600 dark:text-gray-400"
                  />
                ) : (
                  <span className="text-gray-600 dark:text-gray-400">{collab.period}</span>
                )}
              </div>
              
              {isEditMode ? (
                <EditableContent
                  value={collab.organization}
                  onChange={(value) => updateCollaboration(index, 'organization', value)}
                  as="h4"
                  className="text-gray-700 dark:text-gray-300 mb-2"
                />
              ) : (
                <h4 className="text-gray-700 dark:text-gray-300 mb-2">{collab.organization}</h4>
              )}
              
              <EditableList
                items={collab.description}
                onChange={(newItems) => updateCollaboration(index, 'description', newItems)}
                itemClassName="text-gray-700 dark:text-gray-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Academic Achievements Section */}
      {/* <section ref={academicSectionRef} id="academic-achievements" className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Academic Achievements</h2>
        
        {isEditMode && (
          <button
            onClick={addAchievement}
            className="mb-6 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" /> Add Achievement
          </button>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievementsToDisplay.map((achievement, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative"
            >
              {isEditMode && (
                <button
                  onClick={() => removeAchievement(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  aria-label="Delete Achievement"
                >
                  <FaTrash size={12} />
                </button>
              )}
              
              <EditableContent
                value={achievement.title}
                onChange={(value) => updateAchievement(index, 'title', value)}
                as="h3"
                className="text-xl font-bold mb-2"
              />
              
              <EditableContent
                value={achievement.description}
                onChange={(value) => updateAchievement(index, 'description', value)}
                as="p"
                className="text-gray-600 dark:text-gray-400 mb-2"
                isTextArea
              />
              
              <EditableContent
                value={achievement.year}
                onChange={(value) => updateAchievement(index, 'year', value)}
                as="span"
                className="text-blue-600 dark:text-blue-400"
                isPlainValue
              />
            </div>
          ))}
        </div>
      </section> */}

      {/* Extracurricular Activities Section */}
      {/* <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Extracurricular Activities</h2>
        
        {isEditMode && (
          <button
            onClick={addActivity}
            className="mb-6 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" /> Add Activity
          </button>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activitiesToDisplay.map((activity, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative"
            >
              {isEditMode && (
                <button
                  onClick={() => removeActivity(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  aria-label="Delete Activity"
                >
                  <FaTrash size={12} />
                </button>
              )}
              
              <EditableContent
                value={activity.title}
                onChange={(value) => updateActivity(index, 'title', value)}
                as="h3"
                className="text-xl font-bold mb-2"
              />
              
              <EditableContent
                value={activity.description}
                onChange={(value) => updateActivity(index, 'description', value)}
                as="p"
                className="text-gray-600 dark:text-gray-400 mb-2"
                isTextArea
              />
              
              <EditableContent
                value={activity.period}
                onChange={(value) => updateActivity(index, 'period', value)}
                as="span"
                className="text-blue-600 dark:text-blue-400"
                isPlainValue
              />
            </div>
          ))}
        </div>
      </section> */}

      {/* Files and Evidence Section */}
      {/* <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Files & Evidence</h2>
        
        {isEditMode && (
          <button
            onClick={addFile}
            className="mb-6 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" /> Add File
          </button>
        )}
        
        {filesToDisplay && filesToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filesToDisplay.map((file, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative"
              >
                {isEditMode && (
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    aria-label="Delete File"
                  >
                    <FaTrash size={12} />
                  </button>
                )}
                
                {isEditMode ? (
                  <EditableContent
                    value={file.title}
                    onChange={(value) => updateFile(index, 'title', value)}
                    as="h3"
                    className="text-xl font-bold mb-2"
                  />
                ) : (
                  <h3 className="text-xl font-bold mb-2">{file.title}</h3>
                )}
                
                {isEditMode ? (
                  <EditableContent
                    value={file.description}
                    onChange={(value) => updateFile(index, 'description', value)}
                    as="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                    isTextArea
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{file.description}</p>
                )}
                
                <div className="flex flex-col">
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <FaDownload className="mr-2" />
                    Download {file.fileType}
                  </a>
                  
                  {isEditMode && (
                    <div className="mt-2 flex flex-col space-y-2">
                      <EditableContent
                        value={file.fileUrl}
                        onChange={(value) => updateFile(index, 'fileUrl', value)}
                        as="span"
                        className="text-xs text-gray-500"
                        isPlainValue
                      />
                      <EditableContent
                        value={file.fileType}
                        onChange={(value) => updateFile(index, 'fileType', value)}
                        as="span"
                        className="text-xs text-gray-500"
                        isPlainValue
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No files available.</p>
        )}
      </section> */}

    </div>
  );
}

// The main page component that uses the client component with Suspense
export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsClient />
    </Suspense>
  );
} 