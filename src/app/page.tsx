import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Dhairya Shah
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
              Full Stack Developer & UI/UX Enthusiast
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-lg">
              I build exceptional digital experiences that are fast,
              accessible, and visually appealing. Currently focused on building
              responsive web applications with modern technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              >
                Get in Touch
              </Link>
              <Link
                href="/projects"
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              >
                View My Work
              </Link>
            </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/profile.jpg"
              alt="Dhairya Shah"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 md:py-24 border-t border-gray-100 dark:border-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work. These projects showcase my skills and
            experience in web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
            <div className="relative h-48 w-full">
              <Image
                src="/images/project1.jpg"
                alt="Project 1"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Project Name</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A brief description of the project, what it does, and what
                technologies were used.
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/DhairyaS450/project1"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://project1.example.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  aria-label="Live Demo"
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
            <div className="relative h-48 w-full">
              <Image
                src="/images/project2.jpg"
                alt="Project 2"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Project Name</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A brief description of the project, what it does, and what
                technologies were used.
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/DhairyaS450/project2"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://project2.example.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  aria-label="Live Demo"
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Project Card 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
            <div className="relative h-48 w-full">
              <Image
                src="/images/project3.jpg"
                alt="Project 3"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Project Name</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A brief description of the project, what it does, and what
                technologies were used.
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/DhairyaS450/project3"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://project3.example.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  aria-label="Live Demo"
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            View All Projects
          </Link>
        </div>
      </section>
    </div>
  );
}
