"use client";

import Image from "next/image";
import { FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaPlus, FaTrash } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPython, SiMongodb, SiFirebase } from "react-icons/si";
import { useState, useEffect, Suspense } from "react";
import { useContent, AboutMeContent, Collaboration, Education } from "@/contexts/ContentContext";
import EditableContent from "@/components/EditableContent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiAchievement, GiSkills } from "react-icons/gi";
import { MdSchool, MdWork, MdStar, MdOutlineFlag } from "react-icons/md";
import { FaRocket, FaCertificate, FaBrain, FaUsers, FaLightbulb, FaClock, FaTools, FaChartLine } from "react-icons/fa";

// export const metadata = {
//   title: "About | Dhairya Shah",
//   description: "Learn more about me, my skills, and my experience",
// }; gives error since cannot have use client and metadata together

function AboutPageLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Import useSearchParams inside the client component
function AboutClient() {
  const { content, isLoading, error, updateContent, isEditMode } = useContent();
  
  // Get hash from window location instead of using useSearchParams
  const [hash, setHash] = useState<string>('');
  
  useEffect(() => {
    // This will run only in the client, so window is available
    setHash(window.location.hash);
    
    // Listen for hash changes
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // Local states for editing
  const [localAboutMe, setLocalAboutMe] = useState<AboutMeContent | null>(null);
  const [localCollaborations, setLocalCollaborations] = useState<Collaboration[]>([]);
  const [localEducation, setLocalEducation] = useState<Education[]>([]);
  const [localSoftSkills, setLocalSoftSkills] = useState<string[]>([]);
  const [localFutureGoals, setLocalFutureGoals] = useState<string[]>([]);
  const [prevEditMode, setPrevEditMode] = useState(false);

  // Initialize local states from content
  useEffect(() => {
    if (content) {
      console.log('Initializing About page from content');
      setLocalAboutMe(content.aboutMe || { paragraphs: [] });
      setLocalCollaborations(content.collaborations || []);
      setLocalEducation(content.education || []);
      setLocalSoftSkills(content.softSkills || [
        "Strong communication and presentation skills",
        "Team leadership and collaboration",
        "Problem-solving and critical thinking",
        "Time management and organization",
        "Adaptability and quick learning"
      ]);
      setLocalFutureGoals(content.futureGoals || [
        "Pursue a degree in Computer Engineering or ML",
        "Develop expertise in artificial intelligence and machine learning",
        "Contribute to open-source projects and build a strong portfolio",
        "Gain internship experience at tech companies",
        "Create innovative solutions that have positive social impact"
      ]);
    }
  }, [content]);
  
  // Track edit mode changes
  useEffect(() => {
    if (!content) return;
    setPrevEditMode(isEditMode);
  }, [isEditMode, content]);
  
  // Save changes when exiting edit mode
  useEffect(() => {
    if (!content || !localAboutMe) return;
    
    if (prevEditMode && !isEditMode) {
      console.log('Saving About page changes...');
      
      // Create updated content object with non-null aboutMe
      const updatedContent = {
        ...content,
        aboutMe: localAboutMe,
        collaborations: localCollaborations,
        education: localEducation,
        softSkills: localSoftSkills,
        futureGoals: localFutureGoals
      };
      
      updateContent(updatedContent)
        .then(success => {
          if (success) {
            console.log('About page changes saved successfully');
          } else {
            console.error('Failed to save About page changes');
          }
        })
        .catch(err => {
          console.error('Error saving About page changes:', err);
        });
    }
  }, [isEditMode, prevEditMode, content, localAboutMe, localCollaborations, localEducation, localSoftSkills, localFutureGoals, updateContent]);

  // Helper to update education
  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...localEducation];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setLocalEducation(updatedEducation);
  };

  // Helper to add education
  const addEducation = () => {
    const newEducation: Education = {
      institution: "New Institution",
      degree: "Degree/Program",
      period: "Years",
      description: "Program details"
    };
    setLocalEducation([...localEducation, newEducation]);
  };

  // Helper to remove education
  const removeEducation = (index: number) => {
    const updatedEducation = [...localEducation];
    updatedEducation.splice(index, 1);
    setLocalEducation(updatedEducation);
  };

  // Helper to update about me paragraphs
  const updateAboutMeParagraph = (index: number, value: string) => {
    if (!localAboutMe) return;
    
    const updatedParagraphs = [...localAboutMe.paragraphs];
    updatedParagraphs[index] = value;
    setLocalAboutMe({ ...localAboutMe, paragraphs: updatedParagraphs });
  };

  // Helper to add a new paragraph
  const addAboutMeParagraph = () => {
    if (!localAboutMe) return;
    
    const updatedParagraphs = [...localAboutMe.paragraphs, "New paragraph"];
    setLocalAboutMe({ ...localAboutMe, paragraphs: updatedParagraphs });
  };

  // Helper to remove a paragraph
  const removeAboutMeParagraph = (index: number) => {
    if (!localAboutMe) return;
    
    const updatedParagraphs = [...localAboutMe.paragraphs];
    updatedParagraphs.splice(index, 1);
    setLocalAboutMe({ ...localAboutMe, paragraphs: updatedParagraphs });
  };

  // Helper functions for soft skills
  const updateSoftSkill = (index: number, value: string) => {
    const updatedSkills = [...localSoftSkills];
    updatedSkills[index] = value;
    setLocalSoftSkills(updatedSkills);
  };

  const addSoftSkill = () => {
    setLocalSoftSkills([...localSoftSkills, "New skill"]);
  };

  const removeSoftSkill = (index: number) => {
    const updatedSkills = [...localSoftSkills];
    updatedSkills.splice(index, 1);
    setLocalSoftSkills(updatedSkills);
  };

  // Helper functions for future goals
  const updateFutureGoal = (index: number, value: string) => {
    const updatedGoals = [...localFutureGoals];
    updatedGoals[index] = value;
    setLocalFutureGoals(updatedGoals);
  };

  const addFutureGoal = () => {
    setLocalFutureGoals([...localFutureGoals, "New goal"]);
  };

  const removeFutureGoal = (index: number) => {
    const updatedGoals = [...localFutureGoals];
    updatedGoals.splice(index, 1);
    setLocalFutureGoals(updatedGoals);
  };

  if (isLoading) return <AboutPageLoading />;
  if (error) return <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 text-red-500">Error loading content: {error}</div>;
  if (!content || !localAboutMe) return <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">Loading content...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      {/* About Me Section */}
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About Me</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {localAboutMe.paragraphs.map((paragraph, index) => (
              <div key={index} className="relative group mb-4">
                {isEditMode ? (
                  <EditableContent
                    value={paragraph}
                    onChange={(value) => updateAboutMeParagraph(index, value)}
                    as="p"
                    className="text-gray-700 dark:text-gray-300"
                    isTextArea
                  />
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">{paragraph}</p>
                )}
                
                {isEditMode && (
                  <button
                    onClick={() => removeAboutMeParagraph(index)}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove paragraph"
                  >
                    <FaTrash size={10} />
                  </button>
                )}
              </div>
            ))}
            
            {isEditMode && (
              <button
                onClick={addAboutMeParagraph}
                className="mt-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center text-sm"
              >
                <FaPlus className="mr-1" size={10} /> Add Paragraph
              </button>
            )}
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/profile.jpg"
              alt="Dhairya Shah"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Technical Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {/* Frontend */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaReact className="text-blue-500 text-4xl mx-auto mb-2" />
            <h3 className="font-medium">React</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <SiNextdotjs className="text-black dark:text-white text-4xl mx-auto mb-2" />
            <h3 className="font-medium">Next.js</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <SiTypescript className="text-blue-600 text-4xl mx-auto mb-2" />
            <h3 className="font-medium">TypeScript</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaJs className="text-yellow-500 text-4xl mx-auto mb-2" />
            <h3 className="font-medium">JavaScript</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <SiTailwindcss className="text-teal-500 text-4xl mx-auto mb-2" />
            <h3 className="font-medium">Tailwind</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaHtml5 className="text-orange-500 text-4xl mx-auto mb-2" />
            <h3 className="font-medium">HTML5</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaCss3Alt className="text-blue-400 text-4xl mx-auto mb-2" />
            <h3 className="font-medium">CSS3</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaNodeJs className="text-green-500 text-4xl mx-auto mb-2" />
            <h3 className="font-medium">Node.js</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <SiPython className="text-blue-700 text-4xl mx-auto mb-2" />
            <h3 className="font-medium">Python</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <SiMongodb className="text-green-600 text-4xl mx-auto mb-2" />
            <h3 className="font-medium">MongoDB</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <SiFirebase className="text-red-800 text-4xl mx-auto mb-2" />
            <h3 className="font-medium">Firebase</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <FaGitAlt className="text-orange-600 text-4xl mx-auto mb-2" />
            <h3 className="font-medium">Git</h3>
          </div>
        </div>
      </section>

      {/* Education section */}
      <section id="education" className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
          <MdSchool className="mr-3 text-blue-600 dark:text-blue-400 text-3xl" />
          Education
        </h2>
        
        {/* Timeline implementation */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-800/50"></div>
          
          <div className="space-y-10">
            {localEducation.map((edu, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-400 z-10 mt-5"></div>
                
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}></div>
                <div className={`pl-8 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 text-right' : 'md:pl-8'} bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:shadow-blue-200 dark:hover:shadow-blue-900/20`}>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold">
                      {isEditMode ? (
                        <EditableContent
                          value={edu.institution}
                          onChange={(value) => updateEducation(index, 'institution', value)}
                          className="inline-block"
                        />
                      ) : (
                        edu.institution
                      )}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {isEditMode ? (
                        <EditableContent
                          value={edu.degree}
                          onChange={(value) => updateEducation(index, 'degree', value)}
                          className="inline-block"
                        />
                      ) : (
                        edu.degree
                      )}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 mb-2">
                      {isEditMode ? (
                        <EditableContent
                          value={edu.period}
                          onChange={(value) => updateEducation(index, 'period', value)}
                          className="inline-block"
                        />
                      ) : (
                        edu.period
                      )}
                    </p>
                    {isEditMode && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700 mt-2 self-start"
                      >
                        <FaTrash /> Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {isEditMode && (
            <button
              onClick={addEducation}
              className="mt-4 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              <FaPlus className="mr-2" /> Add Education
            </button>
          )}
        </div>
      </section>
      
      {/* Soft Skills Section */}
      <section id="soft-skills" className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
          <GiSkills className="mr-3 text-blue-600 dark:text-blue-400 text-3xl" />
          Soft Skills
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localSoftSkills.map((skill, index) => {
            // Get icon based on skill type
            let Icon = FaUsers; // Default
            
            if (skill.toLowerCase().includes("communication")) {
              Icon = FaUsers;
            } else if (skill.toLowerCase().includes("leadership") || skill.toLowerCase().includes("team")) {
              Icon = FaUsers;
            } else if (skill.toLowerCase().includes("problem") || skill.toLowerCase().includes("critical")) {
              Icon = FaBrain;
            } else if (skill.toLowerCase().includes("time") || skill.toLowerCase().includes("organization")) {
              Icon = FaClock;
            } else if (skill.toLowerCase().includes("adapt") || skill.toLowerCase().includes("learning")) {
              Icon = FaLightbulb;
            }
            
            return (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-start hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 group">
                <div className="mr-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  {isEditMode ? (
                    <div className="flex items-center justify-between">
                      <EditableContent
                        value={skill}
                        onChange={(value) => updateSoftSkill(index, value)}
                        className="inline-block flex-1"
                      />
                      <button
                        onClick={() => removeSoftSkill(index)}
                        className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{skill}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {isEditMode && (
          <button
            onClick={addSoftSkill}
            className="mt-4 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" /> Add Soft Skill
          </button>
        )}
      </section>
      
      {/* Future Goals Section */}
      <section id="future-goals" className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
          <FaRocket className="mr-3 text-blue-600 dark:text-blue-400 text-3xl" />
          Future Goals
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl relative overflow-hidden">
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-indigo-400/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {localFutureGoals.map((goal, index) => {
              // Assign icons based on the content of the goal
              let Icon = MdOutlineFlag;
              
              if (goal.toLowerCase().includes("degree") || goal.toLowerCase().includes("education")) {
                Icon = MdSchool;
              } else if (goal.toLowerCase().includes("expertise") || goal.toLowerCase().includes("ai") || goal.toLowerCase().includes("machine")) {
                Icon = FaBrain;
              } else if (goal.toLowerCase().includes("open") || goal.toLowerCase().includes("source") || goal.toLowerCase().includes("portfolio")) {
                Icon = FaGitAlt;
              } else if (goal.toLowerCase().includes("intern") || goal.toLowerCase().includes("experience") || goal.toLowerCase().includes("companies")) {
                Icon = MdWork;
              } else if (goal.toLowerCase().includes("innovative") || goal.toLowerCase().includes("solutions") || goal.toLowerCase().includes("impact")) {
                Icon = FaLightbulb;
              }
              
              return (
                <div key={index} className="flex items-start bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <div className="mr-4 text-blue-600 dark:text-blue-400 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    {isEditMode ? (
                      <div className="flex items-center justify-between">
                        <EditableContent
                          value={goal}
                          onChange={(value) => updateFutureGoal(index, value)}
                          className="inline-block flex-1"
                        />
                        <button
                          onClick={() => removeFutureGoal(index)}
                          className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200">{goal}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {isEditMode && (
            <button
              onClick={addFutureGoal}
              className="mt-6 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              <FaPlus className="mr-2" /> Add Future Goal
            </button>
          )}
        </div>
      </section>

      {/* View more at Academics page*/}
      <p className="text-gray-600 dark:text-gray-400 mt-4">
        <Link href="/academics">View more at Academics page</Link>
      </p>

      {/* Link to Activities page */}
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        <Link href="/activities" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          See my activities, volunteering work, and services on the Activities page →
        </Link>
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<AboutPageLoading />}>
      <AboutClient />
    </Suspense>
  );
} 