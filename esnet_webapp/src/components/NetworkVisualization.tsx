import { useEffect, useRef, useState } from 'react';
import { useParallax } from '@/utils/animations';

const NetworkVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>(0);
  const parallax = useParallax();
  
  // Particles state
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    connections: number[];
  }>>([]);

  const colors = ['#00A3FF', '#9D6EFF', '#36FFB5'];
  
  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      if (canvas.parentElement) {
        const { width, height } = canvas.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
        
        // Reset particles when canvas is resized
        initParticles();
      }
    };
    
    const initParticles = () => {
      const particleCount = Math.min(Math.max(Math.floor((canvas.width * canvas.height) / 15000), 30), 100);
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          connections: []
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [colors]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const connectDistance = Math.min(canvas.width, canvas.height) * 0.2;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply parallax effect
      const offsetX = parallax.x * 0.5;
      const offsetY = parallax.y * 0.5;
      
      // Update particle positions and draw
      particlesRef.current.forEach((particle, i) => {
        // Update position with parallax offset
        particle.x += particle.speedX + offsetX * 0.01;
        particle.y += particle.speedY + offsetY * 0.01;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Find and draw connections
        particle.connections = [];
        
        particlesRef.current.forEach((otherParticle, j) => {
          if (i === j) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectDistance) {
            particle.connections.push(j);
            
            // Only draw connection once (when i < j)
            if (i < j) {
              const opacity = 1 - (distance / connectDistance);
              
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = particle.color.replace('rgb', 'rgba').replace(')', `,${opacity * 0.5})`);
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [parallax]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
        style={{ opacity: 0.7 }}
      />
    </div>
  );
};

export default NetworkVisualization;
