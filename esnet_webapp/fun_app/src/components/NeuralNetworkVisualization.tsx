import { useEffect, useRef } from 'react';

interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  neighbors: number[];
  pulses: { target: number; progress: number; active: boolean }[];
  color: string;
}

interface NeuralNetworkVisualizationProps {
  nodeCount?: number;
  connectionDistance?: number;
  nodeSpeed?: number;
  pulseSpeed?: number;
}

const NeuralNetworkVisualization = ({
  nodeCount = 80,
  connectionDistance = 150,
  nodeSpeed = 0.3,
  pulseSpeed = 2,
}: NeuralNetworkVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<NeuralNode[]>([]);
  
  // Neural network color palette
  const colors = {
    primary: '#36FFB5', // Bright green
    secondary: '#00BFFF', // Bright blue
    tertiary: '#FF6CFF', // Bright pink
    background: '#000000', // Black background
  };

  // Initialize canvas and neural network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNodes();
    };
    
    const initializeNodes = () => {
      if (!canvas) return;
      
      // Clear existing nodes
      nodesRef.current = [];
      
      // Create new nodes
      for (let i = 0; i < nodeCount; i++) {
        const colorChoice = Math.random();
        let color;
        
        if (colorChoice < 0.6) {
          color = colors.primary;
        } else if (colorChoice < 0.9) {
          color = colors.secondary;
        } else {
          color = colors.tertiary;
        }
        
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * nodeSpeed,
          vy: (Math.random() - 0.5) * nodeSpeed,
          size: Math.random() * 3 + 2,
          neighbors: [],
          pulses: [],
          color,
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [nodeCount, nodeSpeed, colors]);

  // Update connections and neighbor nodes
  useEffect(() => {
    const updateConnections = () => {
      const nodes = nodesRef.current;
      
      // Reset all connections
      nodes.forEach(node => {
        node.neighbors = [];
      });
      
      // Find new connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            nodes[i].neighbors.push(j);
            nodes[j].neighbors.push(i);
            
            // Randomly create pulses with small probability
            if (Math.random() < 0.001) {
              nodes[i].pulses.push({
                target: j,
                progress: 0,
                active: true,
              });
            }
          }
        }
      }
    };
    
    // Set up interval to update connections periodically
    const connectionInterval = setInterval(updateConnections, 1000);
    
    return () => {
      clearInterval(connectionInterval);
    };
  }, [connectionDistance]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const drawNetwork = () => {
      // Clear canvas
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const nodes = nodesRef.current;
      
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update node position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Keep node in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
        
        // Draw connections to neighbors
        ctx.lineWidth = 0.5;
        node.neighbors.forEach(j => {
          if (i < j) { // Only draw each edge once
            const target = nodes[j];
            const dx = target.x - node.x;
            const dy = target.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const opacity = 1 - dist / connectionDistance;
            
            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `rgba(54, 255, 181, ${opacity * 0.3})`;
            ctx.stroke();
          }
        });
      }
      
      // Draw pulses
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update and draw pulses
        for (let p = 0; p < node.pulses.length; p++) {
          const pulse = node.pulses[p];
          
          if (pulse.active) {
            const target = nodes[pulse.target];
            const dx = target.x - node.x;
            const dy = target.y - node.y;
            
            // Position along the line
            const progress = pulse.progress;
            const x = node.x + dx * progress;
            const y = node.y + dy * progress;
            
            // Draw pulse
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
            
            // Add glow effect
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(54, 255, 181, 0.4)';
            ctx.fill();
            
            // Update progress
            pulse.progress += 0.01 * pulseSpeed;
            
            // Once pulse reaches the target
            if (pulse.progress >= 1) {
              pulse.active = false;
              
              // Create new pulses from the target (branching)
              if (Math.random() < 0.3 && target.neighbors.length > 0) {
                const randomNeighbor = target.neighbors[Math.floor(Math.random() * target.neighbors.length)];
                target.pulses.push({
                  target: randomNeighbor,
                  progress: 0,
                  active: true,
                });
              }
            }
          }
        }
        
        // Clean up inactive pulses
        node.pulses = node.pulses.filter(pulse => pulse.active);
      }
      
      // Draw nodes on top
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Draw glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.size * 4
        );
        gradient.addColorStop(0, `${node.color}99`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }
      
      // Occasionally create new pulses
      if (Math.random() < 0.05) {
        const randomNodeIndex = Math.floor(Math.random() * nodes.length);
        const node = nodes[randomNodeIndex];
        
        if (node.neighbors.length > 0) {
          const randomNeighbor = node.neighbors[Math.floor(Math.random() * node.neighbors.length)];
          node.pulses.push({
            target: randomNeighbor,
            progress: 0,
            active: true,
          });
        }
      }
      
      animationRef.current = requestAnimationFrame(drawNetwork);
    };
    
    drawNetwork();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [connectionDistance, pulseSpeed, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
};

export default NeuralNetworkVisualization;
