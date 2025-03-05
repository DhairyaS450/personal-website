import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export const metadata = {
  title: "Projects | Dhairya Shah",
  description: "Showcase of my web development and design projects",
};

// In a real implementation, this data would likely come from a CMS or API
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
    image: "/images/face.png", // Using project1 image as placeholder
    tags: ["Python", "Face Recognition", "OpenCV", "HTML", "CSS", "Javascript", "Flask"],
    githubUrl: "https://github.com/DhairyaS450/FaceRecognitionApp",
    liveUrl: "https://github.com/DhairyaS450/FaceRecognitionApp",
  },
  {
    id: 5,
    title: "Replica Of Tetris",
    description: "A replica of the classic game Tetris. It is a program in html css and javascript.",
    image: "/images/tetris.png", // Using project2 image as placeholder
    tags: ["HTML", "CSS", "Javascript"],
    githubUrl: "https://github.com/DhairyaS450/my-version-of-tetris",
    liveUrl: "https://dhairyas450.github.io/my-version-of-tetris/",
  },
  {
    id: 6,
    title: "Snake AI Agent",
    description: "A python program that uses reinforcement learning to train an AI agent to play the game snake.",
    image: "/images/snake.png", // Using project3 image as placeholder
    tags: ["Python", "Reinforcement Learning", "PyTorch", "Pygame"],
    githubUrl: "https://github.com/DhairyaS450/snake_ai_agent",
    liveUrl: "https://github.com/DhairyaS450/snake_ai_agent",
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Projects</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-12 max-w-3xl">
        Here's a collection of my recent projects. Each project represents a unique challenge and opportunity for growth. Click on them to learn more.
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
    </div>
  );
} 