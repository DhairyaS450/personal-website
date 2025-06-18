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
  intensity = 2
}: GlowTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Function to wrap text nodes in spans, preserving existing elements
    const wrapTextNodes = (node: Node): void => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const text = node.textContent;
        const words = text.split(/(\s+)/);
        const fragment = document.createDocumentFragment();
        
        words.forEach((word) => {
          if (word.trim()) {
            const span = document.createElement('span');
            span.textContent = word;
            span.className = 'glow-word-target';
            span.style.display = 'inline';
            span.style.transition = 'none'; // Remove any default transitions
            fragment.appendChild(span);
          } else {
            fragment.appendChild(document.createTextNode(word));
          }
        });
        
        node.parentNode?.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // For existing elements, just add the target class
        const element = node as HTMLElement;
        if (!element.classList.contains('glow-word-target') && element.textContent?.trim()) {
          element.classList.add('glow-word-target');
        }
        
        // Process children
        Array.from(node.childNodes).forEach(child => wrapTextNodes(child));
      }
    };

    // Process the element if not already processed
    if (!element.querySelector('.glow-word-target')) {
      wrapTextNodes(element);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const targets = element.querySelectorAll('.glow-word-target');
      
      targets.forEach((target) => {
        const targetElement = target as HTMLElement;
        const rect = targetElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const isHovering = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
        
        if (isHovering) {
          // Get current computed styles
          const computedStyle = window.getComputedStyle(targetElement);
          const currentColor = computedStyle.color;
          
          // Calculate glow intensity
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
          const glowIntensity = Math.max(0.3, 1 - distance / maxDistance) * intensity;
          
          // Apply enhanced effects
          targetElement.style.textShadow = `
            0 0 ${5 * glowIntensity}px currentColor,
            0 0 ${15 * glowIntensity}px ${glowColor},
            0 0 ${25 * glowIntensity}px ${glowColor}
          `;
          
          // Enhance existing colors or add blue tint
          if (currentColor.includes('rgb')) {
            targetElement.style.filter = `brightness(${100 + 50 * glowIntensity}%) saturate(${100 + 30 * glowIntensity}%)`;
          } else {
            targetElement.style.color = `color-mix(in srgb, ${currentColor} 60%, ${glowColor} ${40 * glowIntensity}%)`;
          }
        } else {
          // Reset styles smoothly
          targetElement.style.textShadow = '';
          targetElement.style.filter = '';
          targetElement.style.color = '';
        }
      });
    };

    const handleMouseLeave = () => {
      const targets = element.querySelectorAll('.glow-word-target');
      targets.forEach((target) => {
        const targetElement = target as HTMLElement;
        targetElement.style.textShadow = '';
        targetElement.style.filter = '';
        targetElement.style.color = '';
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [glowColor, intensity]);

  return (
    <div 
      ref={textRef} 
      className={`glow-text ${className}`}
    >
      {children}
    </div>
  );
}
