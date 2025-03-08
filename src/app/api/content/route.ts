import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const contentFilePath = path.join(process.cwd(), 'content', 'data.json');

// Get the admin token from environment or use a fallback
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN || 'fallback-admin-token-12345';

// Simple token validation
function validateToken(token: string): boolean {
  // Simple direct comparison
  console.log('TOKEN DEBUG:');
  console.log(`- Expected token: "${ADMIN_TOKEN}"`);
  console.log(`- Received token: "${token}"`);
  console.log(`- Lengths: expected=${ADMIN_TOKEN.length}, received=${token.length}`);
  console.log(`- Are identical: ${ADMIN_TOKEN === token}`);
  
  const isValid = token === ADMIN_TOKEN;
  console.log(`Token validation result: ${isValid ? 'valid' : 'invalid'}`);
  return isValid;
}

// Ensure the content directory exists
async function ensureContentDirectory() {
  const contentDir = path.join(process.cwd(), 'content');
  try {
    await fs.access(contentDir);
  } catch (error) {
    await fs.mkdir(contentDir, { recursive: true });
  }
}

// Check if the content file exists, if not create it with default data
async function ensureContentFile() {
  try {
    await fs.access(contentFilePath);
  } catch (error) {
    // Default content structure
    const defaultContent = {
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
        // More projects would be here...
      ],
      academicAchievements: [
        {
          title: "Canadian Computing Competition (CCC)",
          description: "Scored 73/75 in the Junior Division, ranking among the top performers at school.",
          year: "2025",
        },
        // More achievements would be here...
      ],
      extracurricularActivities: [
        {
          title: "Youth Tech Labs",
          description: "Developed AI healthcare application and other tech solutions. Collaborated with peers and presented solutions.",
          period: "February 2025 - Present",
        },
        // More activities would be here...
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
        // More files would be here...
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
      }
    };
    
    await fs.writeFile(contentFilePath, JSON.stringify(defaultContent, null, 2));
  }
}

// GET: Fetch all content
export async function GET() {
  try {
    await ensureContentDirectory();
    await ensureContentFile();
    
    const content = await fs.readFile(contentFilePath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error('Error reading content file:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// PUT: Update content
export async function PUT(request: NextRequest) {
  try {
    await ensureContentDirectory();
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid Authorization header');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    console.log('Received token for validation');
    
    // Use the simpler validation function
    if (!validateToken(token)) {
      console.log('Token validation failed');
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    console.log('Token validated successfully, processing content update');
    const updatedContent = await request.json();
    
    // Validate the content structure
    if (!updatedContent || typeof updatedContent !== 'object') {
      return NextResponse.json(
        { error: 'Invalid content format' },
        { status: 400 }
      );
    }
    
    await fs.writeFile(contentFilePath, JSON.stringify(updatedContent, null, 2));
    console.log('Content updated successfully');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content file:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
} 