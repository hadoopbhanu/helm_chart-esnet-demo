
import { useState } from 'react';
import NeuralNetworkVisualization from '@/components/NeuralNetworkVisualization';
import NeuralControls from '@/components/NeuralControls';

const NeuralNetwork = () => {
  const [settings, setSettings] = useState({
    nodeCount: 80,
    connectionDistance: 150,
    nodeSpeed: 0.3,
    pulseSpeed: 2,
  });

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <NeuralNetworkVisualization 
          nodeCount={settings.nodeCount}
          connectionDistance={settings.connectionDistance}
          nodeSpeed={settings.nodeSpeed}
          pulseSpeed={settings.pulseSpeed}
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neural-green to-neural-blue animate-pulse">
              Neural Network Visualization
            </h1>
            <p className="text-lg md:text-xl text-neural-blue max-w-2xl mx-auto">
              Explore this interactive neural network simulation. Adjust the parameters to see how neural connections form and evolve in real-time.
            </p>
          </div>

          <div className="glass-panel max-w-lg mx-auto rounded-lg p-6">
            <NeuralControls settings={settings} updateSettings={updateSettings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetwork;
