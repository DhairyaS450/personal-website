"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

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

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const academicSectionRef = useRef<HTMLElement | null>(null);
  
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

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      {/* Projects Section */}
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Projects</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-12 max-w-3xl">
          A collection of my technical projects, showcasing my skills in web development, AI/ML, and software engineering.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Achievements Section */}
      <section ref={academicSectionRef} id="academic-achievements" className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Academic Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academicAchievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
              <span className="text-blue-600 dark:text-blue-400">{achievement.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Extracurricular Activities Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Extracurricular Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {extracurricularActivities.map((activity, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{activity.description}</p>
              <span className="text-blue-600 dark:text-blue-400">{activity.period}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Files and Evidence Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Files & Evidence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">{file.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{file.description}</p>
              <a
                href={file.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                <FaDownload className="mr-2" />
                Download {file.fileType}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 