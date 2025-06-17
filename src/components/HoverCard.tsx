"use client";

import { ReactNode } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function HoverCard({ 
  children, 
  className = '', 
  glowColor = 'blue' 
}: HoverCardProps) {
  const glowClass = {
    blue: 'hover:shadow-blue-200 dark:hover:shadow-blue-900/20',
    green: 'hover:shadow-green-200 dark:hover:shadow-green-900/20',
    purple: 'hover:shadow-purple-200 dark:hover:shadow-purple-900/20',
    red: 'hover:shadow-red-200 dark:hover:shadow-red-900/20',
    yellow: 'hover:shadow-yellow-200 dark:hover:shadow-yellow-900/20',
    indigo: 'hover:shadow-indigo-200 dark:hover:shadow-indigo-900/20',
  }[glowColor] || 'hover:shadow-blue-200 dark:hover:shadow-blue-900/20';

  return (
    <div 
      className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${glowClass} ${className}`}
    >
      {children}
    </div>
  );
}
