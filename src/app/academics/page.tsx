"use client";

import { useState, useEffect, useRef } from "react";
import { useContent } from "@/contexts/ContentContext";
import EditableContent from "@/components/EditableContent";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { usePathname } from "next/navigation";

// export const metadata = {
//   title: "Academic Journey | Ishaan Dhiman",
//   description: "My educational path, achievements, course history and academic goals",
// };

// Types for academic data
interface CourseEntry {
  subject: string;
  code: string;
}

interface GradeSection {
  title: string;
  status: string;
  courses: CourseEntry[];
}

interface ExamScore {
  name: string;
  score: string;
  maxScore: string;
  year: string;
  description: string;
  highlights: string[];
}

interface AcademicAchievement {
  title: string;
  year: string;
  description: string;
}

interface AcademicsContent {
  title: string;
  subtitle: string;
  courseHistory: GradeSection[];
  examScores: ExamScore[];
  academicAchievements: AcademicAchievement[];
  academicGoals: string[];
}

export default function AcademicsPage() {
  return (
    <Suspense fallback={<AcademicsLoading />}>
      <AcademicsClient />
    </Suspense>
  );
}

// Loading state component
function AcademicsLoading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-pulse">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-10"></div>
      
      <div className="space-y-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-16 bg-gray-100 dark:bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main component
function AcademicsClient() {
  const { content, isLoading, error, updateContent, isEditMode } = useContent();
  const pathname = usePathname();
  
  // Local state for academics content
  const [localAcademics, setLocalAcademics] = useState<AcademicsContent>({
    title: "Academic Journey",
    subtitle: "I currently attend Cameron Heights Collegiate Institute and am in the IB program.\nMy educational path, achievements, and course history",
    courseHistory: [
      {
        title: "Grade 9",
        status: "(Completed)",
        courses: [
          { subject: "English", code: "ENG1W" },
          { subject: "Mathematics", code: "MTH1W" },
          { subject: "Science", code: "SNC1W" },
          { subject: "Geography", code: "CGC1D" },
          { subject: "French", code: "FSF1D" },
          { subject: "Drama", code: "ADA1O" },
          { subject: "Business", code: "BBI1O" },
          { subject: "Hindi", code: "LKHBD" }
        ]
      },
      {
        title: "Grade 10",
        status: "(Current Year)",
        courses: [
          { subject: "English", code: "ENG2D" },
          { subject: "Math", code: "MPM2D" },
          { subject: "Science", code: "SNC2D" },
          { subject: "History", code: "CHC2D" },
          { subject: "Civics", code: "CHV2O" },
          { subject: "Careers", code: "GLC2O" },
          { subject: "Computer Science", code: "ICS3U" },
          { subject: "Physics", code: "SPH3U" }
        ]
      },
      {
        title: "Grade 11",
        status: "(Next Year)",
        courses: [
          { subject: "English", code: "NBE3U" },
          { subject: "IB Math", code: "MCR3U" },
          { subject: "IB Physics (Part 1)", code: "SPH4U" },
          { subject: "Chemistry", code: "SCH3U" },
          { subject: "Computer Science", code: "ICS4U" },
          { subject: "IB Physics (Part 2)", code: "SPH4U" },
          { subject: "Yearbook", code: "AWS3M" },
          { subject: "Personal Fitness", code: "PAF3O" }
        ]
      },
      {
        title: "Grade 12",
        status: "(Plan Ahead)",
        courses: [
          { subject: "English", code: "TBD" },
          { subject: "Course 2", code: "TBD" },
          { subject: "Course 3", code: "TBD" },
          { subject: "Course 4", code: "TBD" },
          { subject: "Course 5", code: "TBD" },
          { subject: "Course 6", code: "TBD" },
          { subject: "Course 7", code: "TBD" },
          { subject: "Course 8", code: "TBD" }
        ]
      }
    ],
    examScores: [
      {
        name: "2025 CCC Exam",
        score: "58",
        maxScore: "75",
        year: "2025",
        description: "The Canadian Computing Competition (CCC) is a programming competition that tests problem-solving and algorithmic thinking skills. With each of the questions becoming exponentially harder, I was able to solve 4 questions correctly.",
        highlights: [
          "Above average performance in algorithmic challenges",
          "Strong problem-solving demonstration",
          "Efficient code implementation"
        ]
      },
      {
        name: "Pascal Contest",
        score: "104",
        maxScore: "150",
        year: "2024",
        description: "The Pascal Contest is a mathematics competition that challenges students with complex problem-solving and mathematical reasoning.",
        highlights: [
          "Excellence in mathematical reasoning",
          "Creative problem-solving approach",
          "Strong analytical skills"
        ]
      },
      {
        name: "2024 CCC Exam",
        score: "45",
        maxScore: "75",
        year: "2024",
        description: "The Canadian Computing Competition (CCC) is a programming competition that tests problem-solving and algorithmic thinking skills. With each of the questions becoming exponentially harder, I was able to solve 3 questions correctly.",
        highlights: [
          "Above average performance in algorithmic challenges",
          "Strong problem-solving demonstration",
          "Efficient code implementation"
        ]
      },
      {
        name: "Grade 10 Math final Exam",
        score: "97",
        maxScore: "100",
        year: "2024",
        description: "I was able to score full marks in the final exam of Grade 10 Math. This was a great achievement for me as I was able to understand the concepts and apply them to solve problems effectively.",
        highlights: [
          "Full marks in the final exam",
          "Strong understanding of the concepts",
          "Efficient problem-solving"
        ]
      }
    ],
    academicAchievements: [
      {
        title: "Academic Honor Roll",
        year: "2023",
        description: "Maintained high academic standing throughout the academic year."
      },
      {
        title: "Mathematics Club Member",
        year: "2023",
        description: "Led weekly problem-solving sessions and organized math competitions."
      }
    ],
    academicGoals: [
      "Participating in advanced programming competitions",
      "Expanding knowledge in artificial intelligence and machine learning",
      "Maintaining strong academic performance while pursuing practical projects"
    ]
  });
  
  const [prevEditMode, setPrevEditMode] = useState(false);
  
  // Initialize local state from content if available
  useEffect(() => {
    if (content && content.academics) {
      setLocalAcademics(content.academics);
    }
  }, [content]);
  
  // Track edit mode changes
  useEffect(() => {
    if (!content) return;
    setPrevEditMode(isEditMode);
  }, [isEditMode, content]);
  
  // Save changes when exiting edit mode
  useEffect(() => {
    if (!content || !prevEditMode || isEditMode) return;
    
    const updatedContent = {
      ...content,
      academics: localAcademics
    };
    
    updateContent(updatedContent)
      .then(success => {
        if (success) {
          console.log('Academic content saved successfully');
        } else {
          console.error('Failed to save academic content');
        }
      });
  }, [isEditMode, prevEditMode, localAcademics, content, updateContent]);

  // Scroll to the achievements section
  useEffect(() => {
    if (window.location.href.includes("achievements")) {
        console.log("Scrolling to achievements section");
        const achievementsSection = document.getElementById("achievements");
        if (achievementsSection) {
            achievementsSection.scrollIntoView({ behavior: "smooth" });
        }
    }
  }, [pathname]);
  
  // Update functions for different sections
  const updateTitle = (value: string) => {
    setLocalAcademics(prev => ({ ...prev, title: value }));
  };
  
  const updateSubtitle = (value: string) => {
    setLocalAcademics(prev => ({ ...prev, subtitle: value }));
  };
  
  const updateGradeTitle = (index: number, value: string) => {
    setLocalAcademics(prev => {
      const newHistory = [...prev.courseHistory];
      newHistory[index] = { ...newHistory[index], title: value };
      return { ...prev, courseHistory: newHistory };
    });
  };
  
  const updateGradeStatus = (index: number, value: string) => {
    setLocalAcademics(prev => {
      const newHistory = [...prev.courseHistory];
      newHistory[index] = { ...newHistory[index], status: value };
      return { ...prev, courseHistory: newHistory };
    });
  };
  
  const updateCourse = (gradeIndex: number, courseIndex: number, field: keyof CourseEntry, value: string) => {
    setLocalAcademics(prev => {
      const newHistory = [...prev.courseHistory];
      const newCourses = [...newHistory[gradeIndex].courses];
      newCourses[courseIndex] = { ...newCourses[courseIndex], [field]: value };
      newHistory[gradeIndex] = { ...newHistory[gradeIndex], courses: newCourses };
      return { ...prev, courseHistory: newHistory };
    });
  };
  
  const addCourse = (gradeIndex: number) => {
    setLocalAcademics(prev => {
      const newHistory = [...prev.courseHistory];
      const newCourses = [...newHistory[gradeIndex].courses, { subject: "New Subject", code: "CODE" }];
      newHistory[gradeIndex] = { ...newHistory[gradeIndex], courses: newCourses };
      return { ...prev, courseHistory: newHistory };
    });
  };
  
  const removeCourse = (gradeIndex: number, courseIndex: number) => {
    setLocalAcademics(prev => {
      const newHistory = [...prev.courseHistory];
      const newCourses = [...newHistory[gradeIndex].courses];
      newCourses.splice(courseIndex, 1);
      newHistory[gradeIndex] = { ...newHistory[gradeIndex], courses: newCourses };
      return { ...prev, courseHistory: newHistory };
    });
  };
  
  const updateExamScore = (index: number, field: keyof ExamScore, value: string | string[]) => {
    setLocalAcademics(prev => {
      const newScores = [...prev.examScores];
      newScores[index] = { ...newScores[index], [field]: value };
      return { ...prev, examScores: newScores };
    });
  };
  
  const addExamScore = () => {
    setLocalAcademics(prev => ({
      ...prev,
      examScores: [
        ...prev.examScores,
        {
          name: "New Exam",
          score: "0",
          maxScore: "100",
          year: new Date().getFullYear().toString(),
          description: "Description of the exam",
          highlights: ["Achievement 1", "Achievement 2", "Achievement 3"]
        }
      ]
    }));
  };
  
  const removeExamScore = (index: number) => {
    setLocalAcademics(prev => {
      const newScores = [...prev.examScores];
      newScores.splice(index, 1);
      return { ...prev, examScores: newScores };
    });
  };
  
  const updateHighlight = (examIndex: number, highlightIndex: number, value: string) => {
    setLocalAcademics(prev => {
      const newScores = [...prev.examScores];
      const newHighlights = [...newScores[examIndex].highlights];
      newHighlights[highlightIndex] = value;
      newScores[examIndex] = { ...newScores[examIndex], highlights: newHighlights };
      return { ...prev, examScores: newScores };
    });
  };
  
  const addHighlight = (examIndex: number) => {
    setLocalAcademics(prev => {
      const newScores = [...prev.examScores];
      newScores[examIndex] = { 
        ...newScores[examIndex], 
        highlights: [...newScores[examIndex].highlights, "New highlight"] 
      };
      return { ...prev, examScores: newScores };
    });
  };
  
  const removeHighlight = (examIndex: number, highlightIndex: number) => {
    setLocalAcademics(prev => {
      const newScores = [...prev.examScores];
      const newHighlights = [...newScores[examIndex].highlights];
      newHighlights.splice(highlightIndex, 1);
      newScores[examIndex] = { ...newScores[examIndex], highlights: newHighlights };
      return { ...prev, examScores: newScores };
    });
  };
  
  const updateAchievement = (index: number, field: keyof AcademicAchievement, value: string) => {
    setLocalAcademics(prev => {
      const newAchievements = [...prev.academicAchievements];
      newAchievements[index] = { ...newAchievements[index], [field]: value };
      return { ...prev, academicAchievements: newAchievements };
    });
  };
  
  const addAchievement = () => {
    setLocalAcademics(prev => ({
      ...prev,
      academicAchievements: [
        ...prev.academicAchievements,
        {
          title: "New Achievement",
          year: new Date().getFullYear().toString(),
          description: "Description of the achievement"
        }
      ]
    }));
  };
  
  const removeAchievement = (index: number) => {
    setLocalAcademics(prev => {
      const newAchievements = [...prev.academicAchievements];
      newAchievements.splice(index, 1);
      return { ...prev, academicAchievements: newAchievements };
    });
  };
  
  const updateGoal = (index: number, value: string) => {
    setLocalAcademics(prev => {
      const newGoals = [...prev.academicGoals];
      newGoals[index] = value;
      return { ...prev, academicGoals: newGoals };
    });
  };
  
  const addGoal = () => {
    setLocalAcademics(prev => ({
      ...prev,
      academicGoals: [...prev.academicGoals, "New academic goal"]
    }));
  };
  
  const removeGoal = (index: number) => {
    setLocalAcademics(prev => {
      const newGoals = [...prev.academicGoals];
      newGoals.splice(index, 1);
      return { ...prev, academicGoals: newGoals };
    });
  };

  if (isLoading) {
    return <AcademicsLoading />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title and subtitle */}
      <div className="text-center mb-12">
        <EditableContent
          value={localAcademics.title}
          onChange={updateTitle}
          as="h1"
          className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2"
        />
        <EditableContent
          value={localAcademics.subtitle}
          onChange={updateSubtitle}
          as="p"
          className="text-lg text-gray-600 dark:text-gray-400"
        />
      </div>

      {/* Course History */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">Course History</h2>
        <div className="space-y-8">
          {localAcademics.courseHistory.map((grade, gradeIndex) => (
            <div key={gradeIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 overflow-hidden">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <EditableContent
                  value={grade.title}
                  onChange={(value) => updateGradeTitle(gradeIndex, value)}
                  as="h3"
                  className="text-xl font-semibold"
                />
                <EditableContent
                  value={grade.status}
                  onChange={(value) => updateGradeStatus(gradeIndex, value)}
                  as="span"
                  className="text-indigo-500 dark:text-indigo-400"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grade.courses.map((course, courseIndex) => (
                  <div key={courseIndex} className="flex justify-between items-center group">
                    <div className="flex-1">
                      <EditableContent
                        value={course.subject}
                        onChange={(value) => updateCourse(gradeIndex, courseIndex, 'subject', value)}
                        as="span"
                        className="font-medium"
                      />
                      {": "}
                      <EditableContent
                        value={course.code}
                        onChange={(value) => updateCourse(gradeIndex, courseIndex, 'code', value)}
                        as="span"
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </div>
                    {isEditMode && (
                      <button
                        onClick={() => removeCourse(gradeIndex, courseIndex)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 p-1"
                      >
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {isEditMode && (
                <button
                  onClick={() => addCourse(gradeIndex)}
                  className="mt-4 px-3 py-1 flex items-center text-sm bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800"
                >
                  <FaPlus size={10} className="mr-1" /> Add Course
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Exam Scores */}
      <section className="mb-16" id="achievements">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">Competition & Exam Scores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localAcademics.examScores.map((exam, examIndex) => (
            <div key={examIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative group">
              {isEditMode && (
                <button
                  onClick={() => removeExamScore(examIndex)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-red-500 p-1"
                >
                  <FaTrash size={14} />
                </button>
              )}
              
              <div className="flex justify-between items-baseline mb-3">
                <EditableContent
                  value={exam.name}
                  onChange={(value) => updateExamScore(examIndex, 'name', value)}
                  as="h3"
                  className="text-lg font-semibold"
                />
                <div className="text-right">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    <EditableContent
                      value={exam.score}
                      onChange={(value) => updateExamScore(examIndex, 'score', value)}
                      as="span"
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                    /
                    <EditableContent
                      value={exam.maxScore}
                      onChange={(value) => updateExamScore(examIndex, 'maxScore', value)}
                      as="span"
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                  </span>
                </div>
              </div>
              
              <EditableContent
                value={exam.description}
                onChange={(value) => updateExamScore(examIndex, 'description', value)}
                as="p"
                className="text-gray-600 dark:text-gray-400 mb-4 text-sm"
                isTextArea={true}
              />
              
              <div>
                <h4 className="font-medium mb-2">Key Highlights:</h4>
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {exam.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="group">
                      <div className="flex items-start">
                        <EditableContent
                          value={highlight}
                          onChange={(value) => updateHighlight(examIndex, hIndex, value)}
                          as="span"
                          className="text-gray-700 dark:text-gray-300"
                        />
                        
                        {isEditMode && (
                          <button
                            onClick={() => removeHighlight(examIndex, hIndex)}
                            className="opacity-0 group-hover:opacity-100 ml-2 text-red-500"
                          >
                            <FaTrash size={10} />
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                
                {isEditMode && (
                  <button
                    onClick={() => addHighlight(examIndex)}
                    className="mt-2 px-2 py-1 flex items-center text-xs bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800"
                  >
                    <FaPlus size={8} className="mr-1" /> Add Highlight
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {isEditMode && (
          <button
            onClick={addExamScore}
            className="mt-6 px-4 py-2 flex items-center text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <FaPlus size={12} className="mr-2" /> Add Exam Score
          </button>
        )}
      </section>

      {/* Other Achievements */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">Other Achievements</h2>
        <div className="space-y-4">
          {localAcademics.academicAchievements.map((achievement, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex justify-between group">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <EditableContent
                    value={achievement.title}
                    onChange={(value) => updateAchievement(index, 'title', value)}
                    as="h3"
                    className="text-lg font-semibold"
                  />
                  <EditableContent
                    value={achievement.year}
                    onChange={(value) => updateAchievement(index, 'year', value)}
                    as="span"
                    className="text-gray-500 dark:text-gray-400 text-sm"
                  />
                </div>
                
                <EditableContent
                  value={achievement.description}
                  onChange={(value) => updateAchievement(index, 'description', value)}
                  as="p"
                  className="text-gray-600 dark:text-gray-400 text-sm"
                />
              </div>
              
              {isEditMode && (
                <button
                  onClick={() => removeAchievement(index)}
                  className="opacity-0 group-hover:opacity-100 self-start ml-2 text-red-500 p-1"
                >
                  <FaTrash size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        
        {isEditMode && (
          <button
            onClick={addAchievement}
            className="mt-6 px-4 py-2 flex items-center text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <FaPlus size={12} className="mr-2" /> Add Achievement
          </button>
        )}
      </section>

      {/* Academic Goals */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">Academic Goals</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <p className="mb-4">I am committed to continuous learning and academic excellence. My current goals include:</p>
          
          <ul className="list-disc ml-5 space-y-2">
            {localAcademics.academicGoals.map((goal, index) => (
              <li key={index} className="group">
                <div className="flex items-start">
                  <EditableContent
                    value={goal}
                    onChange={(value) => updateGoal(index, value)}
                    as="span"
                    className="text-gray-700 dark:text-gray-300"
                  />
                  
                  {isEditMode && (
                    <button
                      onClick={() => removeGoal(index)}
                      className="opacity-0 group-hover:opacity-100 ml-2 text-red-500"
                    >
                      <FaTrash size={14} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          
          {isEditMode && (
            <button
              onClick={addGoal}
              className="mt-4 px-3 py-1 flex items-center text-sm bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800"
            >
              <FaPlus size={10} className="mr-1" /> Add Goal
            </button>
          )}
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="mt-16 bg-indigo-100 dark:bg-indigo-900 rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">Want to Know More?</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Interested in learning more about my academic journey?</p>
        <a href="/contact" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
          Get in Touch
        </a>
      </section>
    </div>
  );
}

import { Suspense } from "react"; 