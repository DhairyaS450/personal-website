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

  getAcademicsAndAchievements: tool({
    description: "Fetch Dhairya's academic information including goals, course history, achievements, and awards. Can filter by specific categories or achievement types.",
    parameters: z.object({
      category: z.enum([
        "goals", 
        "courses", 
        "achievements", 
        "podium", 
        "honorable", 
        "all"
      ]).optional().describe("Category to fetch: goals (academic goals), courses (course history), achievements (all achievements), podium (1st-3rd place), honorable (honorable mentions), all (everything)"),
      grade: z.enum(["9", "10", "11", "12"]).optional().describe("Filter courses by specific grade level"),
      achievementType: z.enum(["competition", "hackathon", "contest", "tournament"]).optional().describe("Filter achievements by type")
    }),
    execute: async ({ category = "all", grade, achievementType }) => {
      try {
        const content = await getWebsiteContent() as unknown as Record<string, unknown>;
        
        // Check if academics data exists in the content
        if (!content?.academics) {
          return { error: "Academic information not available" };
        }

        const academics = content.academics as Record<string, unknown>;
        const result: Record<string, unknown> = {};

        // Handle different categories
        if (category === "goals" || category === "all") {
          result.academicGoals = academics.academicGoals || [];
        }

        if (category === "courses" || category === "all") {
          let courseHistory = (academics.courseHistory as Record<string, unknown>[]) || [];
          
          // Filter by grade if specified
          if (grade) {
            courseHistory = courseHistory.filter((gradeInfo: Record<string, unknown>) => 
              String(gradeInfo.title).toLowerCase().includes(`grade ${grade}`)
            );
          }
          
          result.courseHistory = courseHistory;
        }

        if (category === "achievements" || category === "podium" || category === "all") {
          let podiumAchievements = (academics.podiumAchievements as Record<string, unknown>[]) || [];
          
          // Filter by achievement type if specified
          if (achievementType) {
            podiumAchievements = podiumAchievements.filter((achievement: Record<string, unknown>) => {
              const title = String(achievement.title || "").toLowerCase();
              const caption = String(achievement.caption || "").toLowerCase();
              const description = String((achievement.modalContent as Record<string, unknown>)?.fullDescription || "").toLowerCase();
              return title.includes(achievementType) || caption.includes(achievementType) || description.includes(achievementType);
            });
          }
          
          result.podiumAchievements = podiumAchievements;
        }

        if (category === "achievements" || category === "honorable" || category === "all") {
          let honorableMentions = (academics.honorableMentions as Record<string, unknown>[]) || [];
          
          // Filter by achievement type if specified
          if (achievementType) {
            honorableMentions = honorableMentions.filter((achievement: Record<string, unknown>) => {
              const title = String(achievement.title || "").toLowerCase();
              const caption = String(achievement.caption || "").toLowerCase();
              const description = String((achievement.modalContent as Record<string, unknown>)?.fullDescription || "").toLowerCase();
              return title.includes(achievementType) || caption.includes(achievementType) || description.includes(achievementType);
            });
          }
          
          result.honorableMentions = honorableMentions;
        }

        // Add metadata
        result.summary = {
          totalPodiumAchievements: Array.isArray(result.podiumAchievements) ? result.podiumAchievements.length : 0,
          totalHonorableMentions: Array.isArray(result.honorableMentions) ? result.honorableMentions.length : 0,
          currentGrade: "10",
          nextGrade: "11 (IB Program)"
        };

        return result;
      } catch (error) {
        console.error('getAcademicsAndAchievements error:', error);
        return { error: "Failed to fetch academic information" };
      }
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

// Unified system prompt following 2025 prompt engineering best practices
export const getSystemPrompt = () => {
  const core = getCorePersonality();
return `# IDENTITY & CONTEXT
You are ${core.name}, a ${core.role} at ${core.school}. 
- Location: ${core.location}
- Current Status: ${core.currentStatus}  
- Personality: ${core.personality}
- Interests: ${core.interests.join(", ")}
- Website: https://dhairyashah.work
- Time: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}

# PRIMARY MISSION
Act exactly like Dhairya. Your goal is to help visitors understand his background, projects, achievements, and capabilities while maintaining his voice and personality.

# CORE BEHAVIORAL GUIDELINES

## Communication Style
- Mirror the user's communication style (if they use Gen Z language like "wsg bro", respond similarly: "Not much wbu? Got any questions for me?")
- Be enthusiastic when discussing projects and achievements
- Keep responses conversational, friendly, and authentic to Dhairya's personality
- Use "I" when referring to Dhairya's experiences (you ARE Dhairya's digital twin)

## Information Accuracy
- CRITICAL: Never fabricate information about projects, achievements, or personal details
- Always use the available tools to fetch accurate, up-to-date information
- If you don't have specific information available through tools, acknowledge this limitation
- When mentioning URLs, always include the full https:// prefix

## Tool Usage Protocol
1. Use tools proactively when users ask about specific topics (projects, achievements, experience, education, files, blog posts)
2. For real-time information needs (weather, current events, latest tech trends), use the googleSearch tool
3. Call getExperience for more information about work, volunteering or any of my extracurriculars (like chess, guitar, deca, stem, coding club, cross country, etc)
3. After calling any tool, ALWAYS provide a complete, comprehensive response using the fetched data
4. Never stop after just calling a tool - the user expects a full answer

## Response Structure
1. Acknowledge the request briefly ("Let me grab my latest projects for you...")
2. Execute the appropriate tool(s)
3. Provide a complete, well-formatted response using the retrieved data
4. Maintain Dhairya's enthusiastic and helpful tone throughout

# COLLABORATION & OPPORTUNITIES
When users present partnership opportunities, collaboration requests, or ask for services:
- Show genuine interest and enthusiasm
- Provide contact information or direct them to the contact page
- Encourage them to reach out through the website's contact form
`;
};
