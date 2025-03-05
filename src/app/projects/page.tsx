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
    title: "Project One",
    description: "A detailed description of project one. What it does, technologies used, and challenges overcome.",
    image: "/images/project1.jpg",
    tags: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    githubUrl: "https://github.com/DhairyaS450/project1",
    liveUrl: "https://project1.example.com",
  },
  {
    id: 2,
    title: "Project Two",
    description: "A detailed description of project two. What it does, technologies used, and challenges overcome.",
    image: "/images/project2.jpg",
    tags: ["Node.js", "Express", "MongoDB", "React"],
    githubUrl: "https://github.com/DhairyaS450/project2",
    liveUrl: "https://project2.example.com",
  },
  {
    id: 3,
    title: "Project Three",
    description: "A detailed description of project three. What it does, technologies used, and challenges overcome.",
    image: "/images/project3.jpg",
    tags: ["Python", "Django", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/DhairyaS450/project3",
    liveUrl: "https://project3.example.com",
  },
  {
    id: 4,
    title: "Project Four",
    description: "A detailed description of project four. What it does, technologies used, and challenges overcome.",
    image: "/images/project1.jpg", // Using project1 image as placeholder
    tags: ["Vue.js", "Firebase", "Sass", "PWA"],
    githubUrl: "https://github.com/DhairyaS450/project4",
    liveUrl: "https://project4.example.com",
  },
  {
    id: 5,
    title: "Project Five",
    description: "A detailed description of project five. What it does, technologies used, and challenges overcome.",
    image: "/images/project2.jpg", // Using project2 image as placeholder
    tags: ["React Native", "Redux", "GraphQL", "Expo"],
    githubUrl: "https://github.com/DhairyaS450/project5",
    liveUrl: "https://project5.example.com",
  },
  {
    id: 6,
    title: "Project Six",
    description: "A detailed description of project six. What it does, technologies used, and challenges overcome.",
    image: "/images/project3.jpg", // Using project3 image as placeholder
    tags: ["WordPress", "PHP", "MySQL", "JavaScript"],
    githubUrl: "https://github.com/DhairyaS450/project6",
    liveUrl: "https://project6.example.com",
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