"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { PodiumAchievement, HonorableMention } from '@/contexts/ContentContext';
import { useState, useEffect } from 'react';

interface AccomplishmentModalProps {
  accomplishment: PodiumAchievement | HonorableMention | null;
  onClose: () => void;
  isEditMode?: boolean;
  onUpdate?: (accomplishment: PodiumAchievement | HonorableMention) => void;
}

const AccomplishmentModal = ({ accomplishment, onClose, isEditMode = false, onUpdate }: AccomplishmentModalProps) => {
  const [localAccomplishment, setLocalAccomplishment] = useState(accomplishment);

  useEffect(() => {
    setLocalAccomplishment(accomplishment);
  }, [accomplishment]);

  const handleFieldChange = (field: keyof typeof modalContent, value: string) => {
    if (!localAccomplishment) return;
    const newModalContent = { ...localAccomplishment.modalContent, [field]: value };
    const updatedAccomplishment = { ...localAccomplishment, modalContent: newModalContent };
    setLocalAccomplishment(updatedAccomplishment);
    if (onUpdate) {
      onUpdate(updatedAccomplishment);
    }
  };

  const handleHighlightChange = (index: number, value: string) => {
    if (!localAccomplishment) return;
    const newHighlights = [...localAccomplishment.modalContent.keyHighlights];
    newHighlights[index] = value;
    const newModalContent = { ...localAccomplishment.modalContent, keyHighlights: newHighlights };
    const updatedAccomplishment = { ...localAccomplishment, modalContent: newModalContent };
    setLocalAccomplishment(updatedAccomplishment);
    if (onUpdate) {
      onUpdate(updatedAccomplishment);
    }
  };

  if (!accomplishment || !localAccomplishment) return null;

  const { modalContent } = localAccomplishment;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-2xl max-w-2xl w-full mx-auto relative flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 md:p-8 overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors z-10"
            >
              <XMarkIcon className="w-7 h-7" />
            </button>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 pr-8">
              {isEditMode ? (
                <input
                  value={modalContent.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-800 rounded p-1"
                />
              ) : (
                modalContent.title
              )}
            </h2>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-6">
              {isEditMode ? (
                <textarea
                  value={modalContent.fullDescription}
                  onChange={(e) => handleFieldChange('fullDescription', e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-800 rounded p-1 h-24"
                />
              ) : (
                <p>{modalContent.fullDescription}</p>
              )}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Highlights</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6 pl-2">
              {modalContent.keyHighlights.map((item, index) => (
                <li key={index}>
                  {isEditMode ? (
                    <input
                      value={item}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                      className="w-full bg-gray-100 dark:bg-gray-800 rounded p-1"
                    />
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>

            {modalContent.evidenceUrl && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Evidence</h3>
                {isEditMode ? (
                  <input
                    value={modalContent.evidenceUrl}
                    onChange={(e) => handleFieldChange('evidenceUrl', e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-800 rounded p-1"
                  />
                ) : (
                  <a href={modalContent.evidenceUrl} target="_blank" rel="noopener noreferrer" className="block relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all group">
                    <Image 
                      src={modalContent.evidenceUrl}
                      alt={`${modalContent.title} evidence`}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain max-h-96 bg-gray-100 dark:bg-gray-800"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-bold text-lg">View Full Size</p>
                    </div>
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccomplishmentModal;
