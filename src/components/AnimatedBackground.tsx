"use client";

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const getTheme = () => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    };

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      const theme = getTheme();
      const isDark = theme === 'dark';
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Grid settings
      const gridSize = 50;
      const { x: mouseX, y: mouseY } = mousePos.current;
        // Colors based on theme
      const baseColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
      const glowColor = isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)';
      
      // Draw grid lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          // Calculate distance from mouse
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
            // Create glow effect based on distance
          const maxDistance = 120;
          const intensity = Math.max(0, 1 - distance / maxDistance);
          
          if (intensity > 0.1) {
            // Draw glowing dot
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
            gradient.addColorStop(0, glowColor.replace('0.4', (intensity * 0.3).toString()).replace('0.3', (intensity * 0.25).toString()));
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Draw base grid dot
          ctx.fillStyle = baseColor;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw connecting lines with glow effect
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;
        // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const dx = x - mouseX;
        const distance = Math.abs(dx);
        const intensity = Math.max(0, 1 - distance / 120);
        
        if (intensity > 0.2) {
          ctx.strokeStyle = glowColor.replace('0.4', (intensity * 0.15).toString()).replace('0.3', (intensity * 0.12).toString());
          ctx.lineWidth = 1 + intensity * 1;
        } else {
          ctx.strokeStyle = baseColor;
          ctx.lineWidth = 1;
        }
        
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const dy = y - mouseY;
        const distance = Math.abs(dy);
        const intensity = Math.max(0, 1 - distance / 120);
        
        if (intensity > 0.2) {
          ctx.strokeStyle = glowColor.replace('0.4', (intensity * 0.15).toString()).replace('0.3', (intensity * 0.12).toString());
          ctx.lineWidth = 1 + intensity * 1;
        } else {
          ctx.strokeStyle = baseColor;
          ctx.lineWidth = 1;
        }
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      drawGrid();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'var(--background)',
      }}
    />
  );
}
