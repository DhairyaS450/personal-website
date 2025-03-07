"use client";

import Image from "next/image";
import { FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPython, SiMongodb, SiFirebase } from "react-icons/si";
import { useState, useEffect } from "react";
import { useContent, AboutMeContent, Collaboration, VolunteerExperience, Education } from "@/contexts/ContentContext";
import EditableContent from "@/components/EditableContent";
import EditableList from "@/components/EditableList";

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

function AboutClient() {
  const { content, isLoading, error, updateContent, isEditMode } = useContent();
  
  // Local states for editing
  const [localAboutMe, setLocalAboutMe] = useState<AboutMeContent | null>(null);
  const [localCollaborations, setLocalCollaborations] = useState<Collaboration[]>([]);
  const [localVolunteering, setLocalVolunteering] = useState<VolunteerExperience[]>([]);
  const [localEducation, setLocalEducation] = useState<Education[]>([]);
  const [prevEditMode, setPrevEditMode] = useState(false);

  // Initialize local states from content
  useEffect(() => {
    if (content) {
      console.log('Initializing About page from content');
      setLocalAboutMe(content.aboutMe || { paragraphs: [] });
      setLocalCollaborations(content.collaborations || []);
      setLocalVolunteering(content.volunteering || []);
      setLocalEducation(content.education || []);
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
        volunteering: localVolunteering,
        education: localEducation
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
  }, [isEditMode, prevEditMode, content, localAboutMe, localCollaborations, localVolunteering, localEducation, updateContent]);

  // Helper to update a collaboration
  const updateCollaboration = (index: number, field: keyof Collaboration, value: any) => {
    const updatedCollaborations = [...localCollaborations];
    updatedCollaborations[index] = { ...updatedCollaborations[index], [field]: value };
    setLocalCollaborations(updatedCollaborations);
  };

  // Helper to add a new collaboration
  const addCollaboration = () => {
    const newCollaboration: Collaboration = {
      title: "New Project",
      period: "Current",
      organization: "Organization Name",
      description: ["Add project description"]
    };
    setLocalCollaborations([...localCollaborations, newCollaboration]);
  };

  // Helper to remove a collaboration
  const removeCollaboration = (index: number) => {
    const updatedCollaborations = [...localCollaborations];
    updatedCollaborations.splice(index, 1);
    setLocalCollaborations(updatedCollaborations);
  };

  // Helper to update a volunteer experience
  const updateVolunteering = (index: number, field: keyof VolunteerExperience, value: any) => {
    const updatedVolunteering = [...localVolunteering];
    updatedVolunteering[index] = { ...updatedVolunteering[index], [field]: value };
    setLocalVolunteering(updatedVolunteering);
  };

  // Helper to add a new volunteer experience
  const addVolunteering = () => {
    const newVolunteering: VolunteerExperience = {
      title: "New Volunteer Experience",
      period: "Current",
      description: ["Add description"]
    };
    setLocalVolunteering([...localVolunteering, newVolunteering]);
  };

  // Helper to remove a volunteer experience
  const removeVolunteering = (index: number) => {
    const updatedVolunteering = [...localVolunteering];
    updatedVolunteering.splice(index, 1);
    setLocalVolunteering(updatedVolunteering);
  };

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

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Skills & Technologies</h2>
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

      {/* Volunteering Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Volunteering</h2>
        
        {isEditMode && (
          <button
            onClick={addVolunteering}
            className="mb-6 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" /> Add Volunteer Experience
          </button>
        )}
        
        <div className="space-y-8">
          {localVolunteering.map((volunteer, index) => (
            <div key={index} className="border-l-4 border-blue-600 pl-6 py-2 relative">
              {isEditMode && (
                <button
                  onClick={() => removeVolunteering(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  aria-label="Delete Volunteer Experience"
                >
                  <FaTrash size={12} />
                </button>
              )}
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                {isEditMode ? (
                  <EditableContent
                    value={volunteer.title}
                    onChange={(value) => updateVolunteering(index, 'title', value)}
                    as="h3"
                    className="text-xl font-bold"
                  />
                ) : (
                  <h3 className="text-xl font-bold">{volunteer.title}</h3>
                )}
                
                {isEditMode ? (
                  <EditableContent
                    value={volunteer.period}
                    onChange={(value) => updateVolunteering(index, 'period', value)}
                    as="span"
                    className="text-gray-600 dark:text-gray-400"
                  />
                ) : (
                  <span className="text-gray-600 dark:text-gray-400">{volunteer.period}</span>
                )}
              </div>
              
              <EditableList
                items={volunteer.description}
                onChange={(newItems) => updateVolunteering(index, 'description', newItems)}
                itemClassName="text-gray-700 dark:text-gray-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Education</h2>
        
        {isEditMode && (
          <button
            onClick={addEducation}
            className="mb-6 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" /> Add Education
          </button>
        )}
        
        {localEducation.map((edu, index) => (
          <div key={index} className="border-l-4 border-blue-600 pl-6 py-2 relative">
            {isEditMode && (
              <button
                onClick={() => removeEducation(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                aria-label="Delete Education"
              >
                <FaTrash size={12} />
              </button>
            )}
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              {isEditMode ? (
                <EditableContent
                  value={edu.degree}
                  onChange={(value) => updateEducation(index, 'degree', value)}
                  as="h3"
                  className="text-xl font-bold"
                />
              ) : (
                <h3 className="text-xl font-bold">{edu.degree}</h3>
              )}
              
              {isEditMode ? (
                <EditableContent
                  value={edu.period}
                  onChange={(value) => updateEducation(index, 'period', value)}
                  as="span"
                  className="text-gray-600 dark:text-gray-400"
                />
              ) : (
                <span className="text-gray-600 dark:text-gray-400">{edu.period}</span>
              )}
            </div>
            
            {isEditMode ? (
              <EditableContent
                value={edu.institution}
                onChange={(value) => updateEducation(index, 'institution', value)}
                as="h4"
                className="text-gray-700 dark:text-gray-300"
              />
            ) : (
              <h4 className="text-gray-700 dark:text-gray-300">{edu.institution}</h4>
            )}
            
            {edu.description && (
              isEditMode ? (
                <EditableContent
                  value={edu.description}
                  onChange={(value) => updateEducation(index, 'description', value)}
                  as="p"
                  className="text-gray-600 dark:text-gray-400 mt-2"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400 mt-2">{edu.description}</p>
              )
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default function AboutPage() {
  return <AboutClient />;
} 