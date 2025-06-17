"use client";

import { FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPython, SiMongodb, SiFirebase, SiTensorflow, SiPytorch, SiGooglegemini } from "react-icons/si";

const skills = [
	{ name: "React", icon: FaReact, color: "text-blue-500" },
    { name: "Gemini API", icon: SiGooglegemini, color: "text-blue-800"},
	{ name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
	{ name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
	{ name: "JavaScript", icon: FaJs, color: "text-yellow-500" },
	{ name: "Tailwind", icon: SiTailwindcss, color: "text-teal-500" },
	{ name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
	{ name: "CSS3", icon: FaCss3Alt, color: "text-blue-400" },
	{ name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
	{ name: "Python", icon: SiPython, color: "text-blue-700" },
	{ name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
	{ name: "Firebase", icon: SiFirebase, color: "text-red-800" },
	{ name: "Git", icon: FaGitAlt, color: "text-orange-600" },
    { name: "Tensorflow", icon: SiTensorflow, color: "text-orange-500"},
    { name: "PyTorch", icon: SiPytorch, color: "text-orange-400"}
];

const SkillCard = ({ skill }: { skill: typeof skills[0] }) => {
	const Icon = skill.icon;
	return (
		<div className="flex-shrink-0 w-36 mx-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
			<Icon className={`${skill.color} text-4xl mx-auto mb-2`} />
			<h3 className="font-medium">{skill.name}</h3>
		</div>
	);
};

export default function TechnicalSkillsSlider() {
	const midIndex = Math.ceil(skills.length / 2);
	const firstRowSkills = skills.slice(0, midIndex);
	const secondRowSkills = skills.slice(midIndex);

	const duplicatedFirstRow = [...firstRowSkills, ...firstRowSkills];
	const duplicatedSecondRow = [...secondRowSkills, ...secondRowSkills];

	return (
		<div className="relative w-full overflow-hidden group space-y-4">
			<div className="flex animate-scroll group-hover:pause">
				{duplicatedFirstRow.map((skill, index) => (
					<SkillCard key={`${skill.name}-${index}`} skill={skill} />
				))}
			</div>
			<div className="flex animate-reverse-scroll group-hover:pause">
				{duplicatedSecondRow.map((skill, index) => (
					<SkillCard key={`${skill.name}-${index}`} skill={skill} />
				))}
			</div>
		</div>
	);
}
