"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaDownload, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import EditableContent from "@/components/EditableContent";
import { useContent, Project, AcademicAchievement, ExtracurricularActivity, File as FileType } from "@/contexts/ContentContext";

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
        files: localFiles
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
  }, [isEditMode, prevEditMode, content, localProjects, localAchievements, localActivities, localFiles, updateContent]);

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
      <section className="mb-16">
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
      </section>

      {/* Files and Evidence Section */}
      <section>
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
          <p className="text-gray-600 dark:text-gray-400">No files or evidence available.</p>
        )}
      </section>
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