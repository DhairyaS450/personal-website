import Image from "next/image";
import { FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPython, SiMongodb, SiFirebase } from "react-icons/si";

export const metadata = {
  title: "About | Dhairya Shah",
  description: "Learn more about me, my skills, and my experience",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      {/* About Me Section */}
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About Me</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Hi! I'm Dhairya Shah, a high school student, developer, and problem-solver with a passion for building innovative digital solutions. Ever since I started coding, I've been fascinated by how technology can streamline everyday tasks and create meaningful change.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              I specialize in full-stack development, with a focus on creating scalable and efficient solutions. I'm also experienced in machine learning and AI, and I'm always looking for new ways to use technology to solve problems.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
            Beyond coding, I'm actively involved in math competitions, DECA, STEM and chess, always looking for ways to challenge myself and grow. I also enjoy working out, playing the guitar, and exploring new technologies.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
            I'm always open to collaborating on exciting projects or learning opportunities—feel free to reach out!
            </p>
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
        <div className="space-y-8">

          {/* TaskTide AI */}
          <div className="border-l-4 border-blue-600 pl-6 py-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <h3 className="text-xl font-bold">TaskTide AI</h3>
              <span className="text-gray-600 dark:text-gray-400">2025</span>
            </div>
            <h4 className="text-gray-700 dark:text-gray-300 mb-2">AI-Powered Study Scheduler</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Developed an AI-powered scheduling application for personalized, adaptive study plans</li>
              <li>Working on it with a few friends</li>
              <li>Integrated Google Calendar and other task management platforms for real-time updates</li>
              <li>Designed an AI chatbot for task automation and study assistance</li>
              <li>Currently in testing phase among students, with plans for wider release</li>
            </ul>
          </div>

          {/* Toyota Experience */}
          <div className="border-l-4 border-blue-600 pl-6 py-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <h3 className="text-xl font-bold">Toyota</h3>
              <span className="text-gray-600 dark:text-gray-400">2024</span>
            </div>
            <h4 className="text-gray-700 dark:text-gray-300 mb-2">Software Development (with father)</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Assisted in writing software code and developing solutions for internal projects (outsourced to me)</li>
              <li>Gained hands-on experience in a professional technology environment</li>
              <li>Learned about industry standards and professional development workflows</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Volunteering Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Volunteering</h2>
        <div className="space-y-8">
          {/* School Volunteering */}
          <div className="border-l-4 border-blue-600 pl-6 py-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <h3 className="text-xl font-bold">Cameron Heights Collegiate Institute</h3>
              <span className="text-gray-600 dark:text-gray-400">2025</span>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Helped run various school events and activities</li>
              <li>Eg: I assisted with Connect With Cameron in grade 9</li>
            </ul>
          </div>

          {/* Canada Day Event */}
          <div className="border-l-4 border-blue-600 pl-6 py-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <h3 className="text-xl font-bold">Canada Day Event</h3>
              <span className="text-gray-600 dark:text-gray-400">2024</span>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Checked one of the gates to ensure only authorized members entered</li>
              <li>Sold tickets for a lucky draw fundraiser</li>
              <li>Assisted with event organization and crowd management</li>
            </ul>
          </div>

          {/* Middle School */}
          <div className="border-l-4 border-blue-600 pl-6 py-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <h3 className="text-xl font-bold">Middle School STEM Support</h3>
              <span className="text-gray-600 dark:text-gray-400">2024</span>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Provided advice and mentorship to younger students (my family members and family friends)</li>
              <li>Helped the STEM club with Arduino programming and projects</li>
              <li>Provided assistance to teachers for technical activities</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Education</h2>
        <div className="border-l-4 border-blue-600 pl-6 py-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
            <h3 className="text-xl font-bold">High School</h3>
            <span className="text-gray-600 dark:text-gray-400">2023 - Present</span>
          </div>
          <h4 className="text-gray-700 dark:text-gray-300">Cameron Heights Collegiate Institute</h4>
        </div>
      </section>
    </div>
  );
} 