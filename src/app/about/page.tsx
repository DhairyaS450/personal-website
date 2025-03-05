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
              Hello! I'm Dhairya Shah, a passionate full-stack developer based in Your Location. I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between. My goal is to always build products that provide pixel-perfect, performant experiences.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              I graduated from University Name with a degree in Computer Science and have been working in the web development industry for X years. Throughout my career, I've had the privilege of working at various companies ranging from startups to large corporations.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When I'm not at the computer, I'm usually hiking, reading, or exploring new places. I'm always looking to learn new things and am currently focusing on [current learning goal].
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

      {/* Experience Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Experience</h2>
        <div className="space-y-8">
          {/* Job 1 */}
          <div className="border-l-4 border-blue-600 pl-6 py-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <h3 className="text-xl font-bold">Senior Developer</h3>
              <span className="text-gray-600 dark:text-gray-400">Jan 2020 - Present</span>
            </div>
            <h4 className="text-gray-700 dark:text-gray-300 mb-2">Company Name</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Led the front-end development of the company's flagship product</li>
              <li>Improved site performance by 40% through code optimization</li>
              <li>Mentored junior developers and conducted code reviews</li>
              <li>Implemented CI/CD pipelines for automated testing and deployment</li>
            </ul>
          </div>

          {/* Job 2 */}
          <div className="border-l-4 border-blue-600 pl-6 py-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <h3 className="text-xl font-bold">Web Developer</h3>
              <span className="text-gray-600 dark:text-gray-400">Mar 2018 - Dec 2019</span>
            </div>
            <h4 className="text-gray-700 dark:text-gray-300 mb-2">Previous Company</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Developed and maintained multiple client websites</li>
              <li>Collaborated with designers to implement responsive designs</li>
              <li>Integrated RESTful APIs for various web applications</li>
              <li>Participated in daily stand-ups and sprint planning</li>
            </ul>
          </div>

          {/* Job 3 */}
          <div className="border-l-4 border-blue-600 pl-6 py-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <h3 className="text-xl font-bold">Junior Developer</h3>
              <span className="text-gray-600 dark:text-gray-400">Jun 2016 - Feb 2018</span>
            </div>
            <h4 className="text-gray-700 dark:text-gray-300 mb-2">First Company</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Assisted senior developers in building web applications</li>
              <li>Fixed bugs and implemented minor features</li>
              <li>Developed and maintained documentation</li>
              <li>Participated in code reviews and learning sessions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Education</h2>
        <div className="border-l-4 border-blue-600 pl-6 py-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
            <h3 className="text-xl font-bold">Bachelor of Science in Computer Science</h3>
            <span className="text-gray-600 dark:text-gray-400">2012 - 2016</span>
          </div>
          <h4 className="text-gray-700 dark:text-gray-300">University Name</h4>
        </div>
      </section>
    </div>
  );
} 