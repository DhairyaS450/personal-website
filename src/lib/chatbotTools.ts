import { getWebsiteContent } from './supabaseUtils';
import { tool } from 'ai';
import { z } from 'zod';

// Core personality and basic info that should always be available
export const getCorePersonality = () => {
  return {
    name: "Dhairya Shah",
    role: "High School Student & Developer",
    school: "Cameron Heights Collegiate Institute ('27)",
    personality: "enthusiastic, professional, and helpful",
    interests: ["AI", "full-stack development", "entrepreneurship", "chess", "guitar"],
    currentStatus: "Grade 10 student, exploring AI-driven solutions",
    location: "Waterloo Region, Ontario, Canada"
  };
};

// Tool functions that the AI can call
export const chatbotTools = {
  getProjects: tool({
    description: "Fetch information about Dhairya's projects. Can filter by technology, type, or get featured projects.",
    parameters: z.object({
      featured: z.boolean().optional().describe("Get only featured projects"),
      technology: z.string().optional().describe("Filter by technology (e.g., React, Python, AI)"),
      limit: z.number().optional().describe("Maximum number of projects to return")
    }),
    execute: async ({ featured, technology, limit }) => {
      const content = await getWebsiteContent();
      if (!content?.projects) return { projects: [] };

      let projects = content.projects;
      
      // Filter by featured projects
      if (featured && content.home?.featuredProjects?.projectIds) {
        projects = projects.filter(p => 
          content.home.featuredProjects.projectIds.includes(p.id)
        );
      }
      
      // Filter by technology
      if (technology) {
        projects = projects.filter(p => 
          p.tags.some(tag => 
            tag.toLowerCase().includes(technology.toLowerCase())
          )
        );
      }
      
      // Limit results
      if (limit) {
        projects = projects.slice(0, limit);
      }
      
      return { 
        projects: projects.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          technologies: p.tags,
          liveUrl: p.liveUrl,
          githubUrl: p.githubUrl
        }))
      };
    }
  }),

  getAchievements: tool({
    description: "Fetch Dhairya's academic achievements, awards, and competition results",
    parameters: z.object({
      type: z.enum(["podium", "honorable", "all"]).optional().describe("Type of achievements to fetch")
    }),
    execute: async ({ type = "all" }) => {
      const content = await getWebsiteContent();
      if (!content?.academicAchievements) return { achievements: [] };

      // Since the current data structure has academicAchievements as a simple array,
      // we'll return all of them for now. In the future, this could be enhanced
      // to differentiate between podium and honorable mentions if the data structure changes.
      // The 'type' parameter is kept for future use when the data structure supports different types.
      console.log(`Fetching achievements of type: ${type}`);
      
      return { 
        achievements: content.academicAchievements.map(achievement => ({
          title: achievement.title,
          description: achievement.description,
          year: achievement.year
        }))
      };
    }
  }),

  getExperience: tool({
    description: "Fetch information about Dhairya's experience, activities, and involvement",
    parameters: z.object({
      category: z.enum(["extracurricular", "volunteering", "collaborations", "all"]).optional().describe("Category of experience to fetch")
    }),
    execute: async ({ category = "all" }) => {
      const content = await getWebsiteContent();
      if (!content) return { experience: [] };

      const experience: Record<string, unknown> = {};
      
      if (category === "extracurricular" || category === "all") {
        experience.extracurricular = content.extracurricularActivities || [];
      }
      
      if (category === "volunteering" || category === "all") {
        experience.volunteering = content.volunteering || [];
      }
      
      if (category === "collaborations" || category === "all") {
        experience.collaborations = content.collaborations || [];
      }
      
      return { experience };
    }
  }),

  getEducationInfo: tool({
    description: "Fetch Dhairya's educational background and course information",
    parameters: z.object({}),
    execute: async () => {
      const content = await getWebsiteContent();
      if (!content?.education) return { education: null };

      return {
        education: {
          currentGrade: "Grade 10",
          school: "Cameron Heights Collegiate Institute",
          graduationYear: "2027",
          educationList: content.education
        }
      };
    }
  }),

  getFiles: tool({
    description: "Fetch available files like resume, certificates, photos",
    parameters: z.object({
      fileType: z.string().optional().describe("Filter by file type (PDF, PNG, JPEG)")
    }),
    execute: async ({ fileType }) => {
      const content = await getWebsiteContent();
      if (!content?.files) return { files: [] };

      let files = content.files;
      
      if (fileType) {
        files = files.filter(f => 
          f.fileType.toLowerCase() === fileType.toLowerCase()
        );
      }
      
      return { files };
    }
  }),

  getBlogPosts: tool({
    description: "Fetch Dhairya's blog posts",
    parameters: z.object({
      published: z.boolean().optional().describe("Get only published posts"),
      limit: z.number().optional().describe("Maximum number of posts to return")
    }),
    execute: async ({ published = true, limit }) => {
      const content = await getWebsiteContent();
      if (!content?.blogPosts) return { blogPosts: [] };

      let posts = content.blogPosts;
      
      if (published) {
        posts = posts.filter(p => p.published);
      }
      
      if (limit) {
        posts = posts.slice(0, limit);
      }
      
      return { 
        blogPosts: posts.map(p => ({
          title: p.title,
          excerpt: p.excerpt,
          tags: p.tags,
          publishedAt: p.publishedAt,
          slug: p.slug
        }))
      };
    }
  }),

  getContactInfo: tool({
    description: "Get contact information and ways to reach Dhairya",
    parameters: z.object({}),
    execute: async () => {
      return {
        contact: {
          email: "Available through contact form on website",
          portfolio: "https://dhairyashah.work",
          github: "https://github.com/DhairyaS450",
          linkedin: "https://www.linkedin.com/in/dhairya-bhaumik-shah/",
          availability: "Open to collaborations, internships, and project discussions"
        }
      };
    }
  }),

  googleSearch: tool({
    description: 'Search the web for real-time information using Google Search. Use this for current events, weather, latest tech news, or any information that changes frequently.',
    parameters: z.object({ 
        query: z.string().describe('The search query to find real-time information')
    }),
    execute: async ({ query }) => {
      try {
        console.log('googleSearch tool: Executing search for:', query);
        
        // Import Google SDK dynamically to avoid initialization issues
        const { google } = await import('@ai-sdk/google');
        const { generateText } = await import('ai');
        
        // Use a separate Gemini call with search grounding enabled
        const result = await generateText({
          model: google('gemini-2.5-flash-lite-preview-06-17', {
            useSearchGrounding: true,
            dynamicRetrievalConfig: {
              mode: 'MODE_DYNAMIC',
              dynamicThreshold: 0.7
            }
          }),
          prompt: `Search for: ${query}
          
Please provide a comprehensive answer based on the most current web information available. Be specific and include relevant details.`,
          maxTokens: 1000,
          temperature: 0.3,
        });
        
        console.log('googleSearch tool: Search completed successfully');
        
        return {
          query,
          result: result.text,
          source: 'Google Search (Real-time)',
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        console.error('googleSearch tool error:', error);
        return {
          query,
          result: `Error searching for: "${query}".`,
          source: 'Error',
          timestamp: new Date().toISOString()
        };
      }
    }
  })
};

// Helper to get minimal core context (always included)
export const getCoreContext = () => {
  const core = getCorePersonality();
  return `You are ${core.name}, a ${core.role} at ${core.school}. You are ${core.personality} and passionate about ${core.interests.join(", ")}. You are currently a ${core.currentStatus} in the ${core.location}.

Current time: ${new Date().toLocaleString()}

For urls always include the https.
You have access to tools to fetch specific information about your projects, achievements, experience, education, files, and blog posts. Use these tools when users ask about specific topics rather than providing general information.`;
};
