"use client";

import { useEffect, useRef, ReactNode } from 'react';

interface GlowTextProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export default function GlowText({ 
  children, 
  className = '', 
  glowColor = 'rgb(59, 130, 246)', 
  intensity = 0.5 
}: GlowTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if mouse is over the element
      const isHovering = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      
      if (isHovering) {
        // Calculate glow intensity based on distance from center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
        const glowIntensity = Math.max(0, 1 - distance / maxDistance) * intensity;
          element.style.textShadow = `
          0 0 ${5 * glowIntensity}px ${glowColor}40,
          0 0 ${10 * glowIntensity}px ${glowColor}30,
          0 0 ${15 * glowIntensity}px ${glowColor}20,
          0 0 ${20 * glowIntensity}px ${glowColor}10,
        `;
        element.style.color = `color-mix(in srgb, currentColor 85%, ${glowColor} ${glowIntensity * 15}%)`;
      } else {
        element.style.textShadow = '';
        element.style.color = '';
      }
    };

    const handleMouseLeave = () => {
      element.style.textShadow = '';
      element.style.color = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [glowColor, intensity]);

  return (
    <div 
      ref={textRef} 
      className={`transition-all duration-200 ${className}`}
      style={{ willChange: 'text-shadow, color' }}
    >
      {children}
    </div>
  );
}
