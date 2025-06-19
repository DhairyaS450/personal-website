"use client";

import { useState, Suspense, useEffect } from "react";
import { useContent } from "@/contexts/ContentContext";
import AccomplishmentCard from "@/components/AccomplishmentCard";
import AccomplishmentModal from "@/components/AccomplishmentModal";
import { PodiumAchievement, HonorableMention } from "@/contexts/ContentContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function AcademicsPage() {
  return (
    <Suspense fallback={<AcademicsLoading />}>
      <AcademicsClient />
    </Suspense>
  );
}

function AcademicsLoading() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-12"></div>

      {/* Podium Skeleton */}
      <div className="flex justify-center items-end flex-wrap gap-8 mb-16">
        <div className="order-2 md:order-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-64 h-80"></div>
        <div className="order-1 md:order-2 bg-gray-100 dark:bg-gray-800 rounded-lg w-72 h-96"></div>
        <div className="order-3 bg-gray-100 dark:bg-gray-800 rounded-lg w-64 h-80"></div>
      </div>

      {/* Honorable Mentions Skeleton */}
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

function AcademicsClient() {
  const { content, isLoading, error, updateContent, isEditMode } = useContent();
  const [selectedAccomplishment, setSelectedAccomplishment] = useState<{
    accomplishment: PodiumAchievement | HonorableMention;
    index?: number;
  } | null>(null);

  const [localPodiumAchievements, setLocalPodiumAchievements] = useState<PodiumAchievement[]>([]);
  const [localHonorableMentions, setLocalHonorableMentions] = useState<HonorableMention[]>([]);
  const [prevEditMode, setPrevEditMode] = useState(false);

  useEffect(() => {
    if (content?.academics) {
      setLocalPodiumAchievements(content.academics.podiumAchievements || []);
      setLocalHonorableMentions(content.academics.honorableMentions || []);
    }
  }, [content]);

  useEffect(() => {
    setPrevEditMode(isEditMode);
  }, [isEditMode]);

  useEffect(() => {
    if (!content || !content.academics) return;
    if (prevEditMode && !isEditMode) {
      const updatedContent = {
        ...content,
        academics: {
          ...content.academics,
          podiumAchievements: localPodiumAchievements,
          honorableMentions: localHonorableMentions,
        },
      };
      updateContent(updatedContent);
    }
  }, [isEditMode, prevEditMode, content, localPodiumAchievements, localHonorableMentions, updateContent]);


  if (isLoading) {
    return <AcademicsLoading />;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-12 text-red-500">Error: {error}</div>;
  }

  if (!content) {
    return <div className="container mx-auto px-4 py-12">Loading...</div>;
  }

  const handleUpdateAccomplishment = (updatedAccomplishment: PodiumAchievement | HonorableMention) => {
    if ("rank" in updatedAccomplishment) {
      setLocalPodiumAchievements(prev => prev.map(p => p.rank === (updatedAccomplishment as PodiumAchievement).rank ? updatedAccomplishment : p));
    } else {
      if (selectedAccomplishment?.index !== undefined) {
        const newMentions = [...localHonorableMentions];
        newMentions[selectedAccomplishment.index] = updatedAccomplishment as HonorableMention;
        setLocalHonorableMentions(newMentions);
      }
    }
    setSelectedAccomplishment(prev => prev ? { ...prev, accomplishment: updatedAccomplishment } : null);
  };

  const addHonorableMention = () => {
    const newMention: HonorableMention = {
      title: "New Honorable Mention",
      caption: "A brief description of the achievement.",
      imageUrl: "/images/project2.jpg",
      badgeUrl: "/images/badges/silver_badge.png",
      year: "2025",
      modalContent: {
        title: "New Honorable Mention",
        fullDescription: "A more detailed explanation of what this accomplishment is about, what was done, and what the outcome was.",
        keyHighlights: ["Key highlight 1", "Key highlight 2"],
        evidenceUrl: "/files/resume.pdf"
      }
    };
    setLocalHonorableMentions(prev => [...prev, newMention]);
  };

  const removeHonorableMention = (index: number) => {
    setLocalHonorableMentions(prev => prev.filter((_, i) => i !== index));
  };

  const { podiumAchievements = [], honorableMentions = [] } = {
    podiumAchievements: localPodiumAchievements,
    honorableMentions: localHonorableMentions
  };

  const firstPlace = podiumAchievements.find(p => p.rank === 1);
  const secondPlace = podiumAchievements.find(p => p.rank === 2);
  const thirdPlace = podiumAchievements.find(p => p.rank === 3);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Achievements</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
        A showcase of my proudest academic and extracurricular accomplishments. Click on any card to see more details.
      </p>

      {/* Podium Section */}
      <div className="flex justify-center items-center md:items-end flex-col md:flex-row gap-4 md:gap-0 mb-16">
        {/* 2nd Place */}
        <div className="order-2 md:order-1 md:mr-[-0.5rem] z-10">
          {secondPlace && (
            <AccomplishmentCard
              accomplishment={secondPlace}
              onClick={() => setSelectedAccomplishment({ accomplishment: secondPlace })}
              className="w-64 h-80 sm:w-72 sm:h-96"
            />
          )}
        </div>
        {/* 1st Place */}
        <div className="order-1 md:order-2 z-20">
          {firstPlace && (
            <AccomplishmentCard
              accomplishment={firstPlace}
              onClick={() => setSelectedAccomplishment({ accomplishment: firstPlace })}
              className="w-72 h-96 sm:w-80 sm:h-[28rem]"
              isFirstPlace
            />
          )}
        </div>
        {/* 3rd Place */}
        <div className="order-3 md:order-3 md:ml-[-0.5rem] z-10">
          {thirdPlace && (
            <AccomplishmentCard
              accomplishment={thirdPlace}
              onClick={() => setSelectedAccomplishment({ accomplishment: thirdPlace })}
              className="w-64 h-80 sm:w-72 sm:h-96"
            />
          )}
        </div>
      </div>


      {/* Honorable Mentions Section */}
      {(honorableMentions.length > 0 || isEditMode) && (
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Honorable Mentions</h2>
          {isEditMode && (
            <div className="text-center mb-8">
              <button onClick={addHonorableMention} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Add Honorable Mention
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {honorableMentions.map((mention, index) => (
              <div key={index} className="relative group">
                <AccomplishmentCard
                  accomplishment={mention}
                  onClick={() => setSelectedAccomplishment({ accomplishment: mention, index })}
                />
                {isEditMode && (
                  <button
                    onClick={() => removeHonorableMention(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove mention"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
        <AccomplishmentModal
          accomplishment={selectedAccomplishment?.accomplishment ?? null}
          onClose={() => setSelectedAccomplishment(null)}
          isEditMode={isEditMode}
          onUpdate={handleUpdateAccomplishment}
        />

      { /* Whitespace */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}