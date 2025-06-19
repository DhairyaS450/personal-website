"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PodiumAchievement, HonorableMention } from '@/contexts/ContentContext';

interface AccomplishmentCardProps {
  accomplishment: PodiumAchievement | HonorableMention;
  onClick: () => void;
  className?: string;
  isFirstPlace?: boolean;
}

const AccomplishmentCard = ({ accomplishment, onClick, className = '', isFirstPlace = false }: AccomplishmentCardProps) => {
  const { title, caption, imageUrl, badgeUrl } = accomplishment;

  return (
    <motion.div
      className={`relative group cursor-pointer rounded-lg overflow-hidden shadow-2xl bg-gray-900/60 backdrop-blur-md transition-all duration-300 hover:shadow-blue-500/50 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: isFirstPlace ? -10 : -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={400}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-md">{title}</h3>
        <p className="text-sm md:text-base text-gray-200 drop-shadow-md">{caption}</p>
      </div>
      {badgeUrl && (
        <Image
          src={badgeUrl}
          alt={`${title} badge`}
          width={isFirstPlace ? 64 : 56}
          height={isFirstPlace ? 64 : 56}
          className={`absolute top-3 right-3 w-14 h-14 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${isFirstPlace ? 'w-16 h-16 md:w-20 md:h-20' : ''}`}
        />
      )}
    </motion.div>
  );
};

export default AccomplishmentCard;
