
import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface Connection {
  from: number;
  to: number;
}

const NetworkAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const rafRef = useRef<number>(0);
  const isInitialized = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isInitialized.current) return;
    
    isInitialized.current = true;
    const nodeCount = window.innerWidth < 768 ? 15 : 25;
    
    // Initialize nodes with random positions and velocities
    const initializeNodes = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 2
      }));
    };
    
    // Create connections between nodes
    const createConnections = () => {
      connectionsRef.current = [];
      for (let i = 0; i < nodesRef.current.length; i++) {
        const connections = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < connections; j++) {
          const to = Math.floor(Math.random() * nodesRef.current.length);
          if (i !== to) {
            connectionsRef.current.push({ from: i, to });
          }
        }
      }
    };
    
    // Update node positions and handle collisions with walls
    const updateNodes = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      nodesRef.current.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off walls
        if (node.x <= 0 || node.x >= width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(width, node.x));
        }
        
        if (node.y <= 0 || node.y >= height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(height, node.y));
        }
      });
    };
    
    // Render the network
    const renderNetwork = () => {
      // Clear previous nodes and connections
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      // Create SVG for connections
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      container.appendChild(svg);
      
      // Draw connections
      connectionsRef.current.forEach(conn => {
        const fromNode = nodesRef.current[conn.from];
        const toNode = nodesRef.current[conn.to];
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromNode.x.toString());
        line.setAttribute('y1', fromNode.y.toString());
        line.setAttribute('x2', toNode.x.toString());
        line.setAttribute('y2', toNode.y.toString());
        line.classList.add('network-line');
        
        svg.appendChild(line);
      });
      
      // Draw nodes
      nodesRef.current.forEach(node => {
        const nodeEl = document.createElement('div');
        nodeEl.classList.add('network-node');
        nodeEl.style.left = `${node.x}px`;
        nodeEl.style.top = `${node.y}px`;
        nodeEl.style.width = `${node.size}px`;
        nodeEl.style.height = `${node.size}px`;
        container.appendChild(nodeEl);
      });
    };
    
    // Animation loop
    const animate = () => {
      updateNodes();
      renderNetwork();
      rafRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    const init = () => {
      initializeNodes();
      createConnections();
      animate();
    };
    
    // Handle window resize
    const handleResize = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      init();
    };
    
    window.addEventListener('resize', handleResize);
    init();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} className="network-animation-container" />;
};

export default NetworkAnimation;
