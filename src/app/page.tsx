"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useContent, HomeContent, Project } from "@/contexts/ContentContext";
import EditableContent from "@/components/EditableContent";
import GlowText from "@/components/GlowText";
import { 
  PencilIcon, 
  XMarkIcon, 
  ArrowTopRightOnSquareIcon 
} from "@heroicons/react/24/solid";

function HomePageLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="animate-pulse">
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-8"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
            </div>
            <div className="h-80 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeClient() {
  const { content, isLoading, error, updateContent, isEditMode } = useContent();
  
  // Local states for editing
  const [localHomeContent, setLocalHomeContent] = useState<HomeContent | null>(null);
  const [prevEditMode, setPrevEditMode] = useState(false);
  const [projectSelectionOpen, setProjectSelectionOpen] = useState<number | null>(null);

  // Initialize local state from content
  useEffect(() => {
    console.log('Content changed:', content);
    if (content) {
      if (content.home) {
        console.log('Home content found:', content.home);
        setLocalHomeContent(content.home);
      } else {
        console.log('No home content found, creating default');
        // Create default home content if not present
        const defaultHome: HomeContent = {
          hero: {
            title: "Dhairya Shah",
            subtitle: "HS Student & Developer",
            description: "I'm passionate about building innovative digital experiences that are fast, intuitive, and accessible. With a strong foundation in software development, I specialize in creating web and mobile applications that solve real-world problems. Currently, I'm exploring AI-driven solutions, full-stack development, and efficient system design."
          },
          featuredProjects: {
            heading: "Featured Projects",
            subheading: "A selection of my recent work. These projects showcase my skills and experience",
            projectIds: content.projects && content.projects.length >= 3 
              ? content.projects.slice(0, 3).map(p => p.id)
              : [1, 2, 3]
          }
        };
        setLocalHomeContent(defaultHome);
        
        // Also save it to the backend if we're not in loading state
        if (!isLoading && content.projects) {
          const updatedContent = {
            ...content,
            home: defaultHome
          };
          updateContent(updatedContent).catch(console.error);
        }
      }
    }
  }, [content, isLoading, updateContent]);
  
  // Track edit mode changes
  useEffect(() => {
    if (!content) return;
    setPrevEditMode(isEditMode);
  }, [isEditMode, content]);
  
  // Save changes when exiting edit mode
  useEffect(() => {
    if (!content || !localHomeContent) return;
    
    if (prevEditMode && !isEditMode) {
      console.log('Saving Home page changes...');
      
      // Create updated content object
      const updatedContent = {
        ...content,
        home: localHomeContent
      };
      
      updateContent(updatedContent)
        .then(success => {
          if (success) {
            console.log('Home page changes saved successfully');
          } else {
            console.error('Failed to save Home page changes');
          }
        })
        .catch(err => {
          console.error('Error saving Home page changes:', err);
        });
    }
  }, [isEditMode, prevEditMode, content, localHomeContent, updateContent]);

  // Update hero content
  const updateHeroContent = (field: 'title' | 'subtitle' | 'description', value: string) => {
    if (!localHomeContent) return;
    setLocalHomeContent({
      ...localHomeContent,
      hero: {
        ...localHomeContent.hero,
        [field]: value
      }
    });
  };

  // Update featured projects section
  const updateFeaturedProjects = (field: 'heading' | 'subheading' | 'projectIds', value: string | number[]) => {
    if (!localHomeContent) return;
    setLocalHomeContent({
      ...localHomeContent,
      featuredProjects: {
        ...localHomeContent.featuredProjects,
        [field]: value
      }
    });
  };

  // Replace a featured project with another one
  const replaceFeaturedProject = (index: number, newProjectId: number) => {
    if (!localHomeContent) return;
    
    const newProjectIds = [...localHomeContent.featuredProjects.projectIds];
    newProjectIds[index] = newProjectId;
    
    updateFeaturedProjects('projectIds', newProjectIds);
    setProjectSelectionOpen(null);
  };

  // Toggle project selection dropdown
  const toggleProjectSelection = (index: number) => {
    setProjectSelectionOpen(projectSelectionOpen === index ? null : index);
  };

  if (isLoading) return <HomePageLoading />;
  if (error) return <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 text-red-500">Error loading content: {error}</div>;
  
  // Show loading state only if we don't have content or localHomeContent
  if (!content) return <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">Loading content data...</div>;
  if (!localHomeContent) return <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">Preparing home page...</div>;
  
  // Only now check for featured projects
  const projectsList = content.projects || [];
  
  // Get featured projects with fallback for missing projects
  const featuredProjects = localHomeContent.featuredProjects.projectIds
    .map(id => projectsList.find(p => p.id === id))
    .filter(p => p !== undefined) as Project[];
  
  // If no featured projects found, show a message in edit mode
  if (featuredProjects.length === 0 && isEditMode) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 p-4 rounded mb-6">
          No featured projects found. Please add some projects on the Projects page first.
        </div>
      </div>
    );
  }
  
  // If no featured projects in normal mode, just skip that section
  const showFeaturedProjects = featuredProjects.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <GlowText className="inline">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  {isEditMode ? (
                    <EditableContent
                      value={localHomeContent.hero.title}
                      onChange={(value) => updateHeroContent('title', value)}
                      as="span"
                      className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
                    />
                  ) : (
                    localHomeContent.hero.title
                  )}
                </span>
              </GlowText>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
              <GlowText intensity={0.2}>
                {isEditMode ? (
                  <EditableContent
                    value={localHomeContent.hero.subtitle}
                    onChange={(value) => updateHeroContent('subtitle', value)}
                    as="span"
                  />
                ) : (
                  localHomeContent.hero.subtitle
                )}
              </GlowText>
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <GlowText intensity={0.15}>
                {isEditMode ? (
                  <EditableContent
                    value={localHomeContent.hero.description}
                    onChange={(value) => updateHeroContent('description', value)}
                    as="p"
                  />
                ) : (
                  <p>{localHomeContent.hero.description}</p>
                )}
              </GlowText>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                <GlowText intensity={0.2} glowColor="rgb(255, 255, 255)">
                  More About Me
                </GlowText>
              </Link>
              <Link href="/contact" className="inline-block bg-white dark:bg-gray-800 border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium py-3 px-6 rounded-lg transition duration-300">
                <GlowText intensity={0.2}>
                  Contact Me
                </GlowText>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-full p-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 rounded-xl animate-gradient opacity-70"></div>
              <div className="relative z-10">
                <Image
                  src="/images/profile.jpg"
                  alt="Hero image"
                  width={600}
                  height={600}
                  className="rounded-xl shadow-lg object-cover w-full h-full transition-transform duration-500 hover:scale-[1.02]"
                  priority
                />
                <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-blue-600/20 rounded-full blur-xl animate-pulse-slow"></div>
                <div className="absolute -top-3 -left-3 w-32 h-32 bg-violet-600/20 rounded-full blur-xl animate-pulse-slow animation-delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {showFeaturedProjects && (
        <section className="py-16 md:py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GlowText intensity={0.25}>
                {isEditMode ? (
                  <EditableContent
                    value={localHomeContent.featuredProjects.heading}
                    onChange={(value) => updateFeaturedProjects('heading', value)}
                    className="inline-block"
                  />
                ) : (
                  localHomeContent.featuredProjects.heading
                )}
              </GlowText>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              <GlowText intensity={0.15}>
                {isEditMode ? (
                  <EditableContent
                    value={localHomeContent.featuredProjects.subheading}
                    onChange={(value) => updateFeaturedProjects('subheading', value)}
                    className="inline-block"
                  />
                ) : (
                  localHomeContent.featuredProjects.subheading
                )}
              </GlowText>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 group relative ${
                index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-1' : ''
              }`}>
                {isEditMode && (
                  <button
                    onClick={() => toggleProjectSelection(index)}
                    className="absolute top-2 right-2 z-10 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
                    aria-label="Change featured project"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                )}
                
                {projectSelectionOpen === index && (
                  <div className="absolute inset-0 bg-white dark:bg-gray-800 z-20 p-4 overflow-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Select a project</h4>
                      <button
                        onClick={() => setProjectSelectionOpen(null)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {projectsList.map(p => (
                        <button
                          key={p.id}
                          onClick={() => replaceFeaturedProject(index, p.id)}
                          className={`block w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            p.id === project.id ? 'bg-blue-100 dark:bg-blue-900' : ''
                          }`}
                        >
                          <div className="font-medium">{p.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {p.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={project.image || '/images/project-placeholder.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    <GlowText intensity={0.2}>
                      {project.title}
                    </GlowText>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded transition-colors duration-300 group-hover:bg-blue-100 group-hover:text-blue-800 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-transform duration-300 hover:scale-110"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center group-hover:underline"
                      >
                        <span className="mr-1 transition-transform duration-300 group-hover:translate-x-[-2px]">View Project</span>
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[-2px]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
              View All Projects
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default function Home() {
  return <HomeClient />;
}
