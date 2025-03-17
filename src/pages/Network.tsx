
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NetworkVisualization from '@/components/NetworkVisualization';
import StatusPanel from '@/components/StatusPanel';
import { ArrowRight, CircuitBoard, Wifi, Cable, Router, Globe } from 'lucide-react';

const Network = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Animation sequence on load
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);
  
  return (
    <div className="min-h-screen bg-esnet-dark overflow-x-hidden">
      {/* Background visualization */}
      <NetworkVisualization />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow */}
          <div className={cn(
            "inline-block px-3 py-1 rounded-full bg-esnet-blue/10 text-esnet-blue text-sm font-medium mb-6 transform transition-all duration-700",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Network Infrastructure
          </div>
          
          {/* Headline */}
          <h1 className={cn(
            "text-5xl md:text-6xl font-medium leading-tight mb-6 transform transition-all duration-700 delay-100",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span className="text-white">Global High-Performance </span>
            <span className="text-gradient-blue">Network</span>
          </h1>
          
          {/* Subtitle */}
          <p className={cn(
            "text-xl md:text-2xl text-gray-400 max-w-3xl mb-10 transform transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Connecting research institutions with ultra-high-speed, low-latency network infrastructure optimized for scientific collaboration.
          </p>
        </div>
      </section>
      
      {/* Status Dashboard Section */}
      <section className="py-10 px-6 lg:px-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className={cn(
            "transform transition-all duration-700 delay-300",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <StatusPanel />
          </div>
        </div>
      </section>
      
      {/* Network Features Section */}
      <section className="py-20 px-6 lg:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-esnet-blue/10 text-esnet-blue text-sm font-medium mb-6">
                Network Capabilities
              </div>
              
              <h2 className="text-3xl md:text-4xl font-medium mb-6">
                Advanced <span className="text-gradient-blue">Network Architecture</span>
              </h2>
              
              <p className="text-gray-400 mb-8">
                Our network infrastructure is built on cutting-edge technology designed for the highest performance, reliability, and security. We provide dedicated paths for data-intensive science applications with minimal latency and maximum throughput.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <CircuitBoard className="w-5 h-5" />, title: "100+ Gbps Backbone", description: "High-speed backbone network spanning continents" },
                  { icon: <Wifi className="w-5 h-5" />, title: "Optimized Routing", description: "Dynamic routing algorithms for minimal latency" },
                  { icon: <Cable className="w-5 h-5" />, title: "Fiber Infrastructure", description: "Dedicated fiber optic cables for maximum throughput" },
                  { icon: <Router className="w-5 h-5" />, title: "Advanced Protocols", description: "Support for next-generation networking protocols" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 rounded-full bg-esnet-blue/10 text-esnet-blue mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-panel rounded-2xl overflow-hidden">
              <img 
                src="/lovable-uploads/540e9377-5dc9-4c50-9b48-c7bb0c9f7547.png" 
                alt="Network Infrastructure" 
                className="w-full object-cover" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Global Coverage Section */}
      <section className="py-20 px-6 lg:px-10 relative bg-gradient-to-b from-transparent to-esnet-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-violet/10 text-esnet-violet text-sm font-medium mb-3">
              Global Presence
            </div>
            
            <h2 className="text-4xl font-medium mb-4">
              <span className="text-gradient-violet">Worldwide</span> Network Coverage
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our network spans across continents, connecting research institutions around the globe.
            </p>
          </div>
          
          <div className="glass-panel rounded-xl p-8 mb-12 relative">
            <div className="flex items-center justify-center">
              <Globe className="w-64 h-64 text-esnet-blue opacity-10 absolute" />
              <img 
                src="/lovable-uploads/540e9377-5dc9-4c50-9b48-c7bb0c9f7547.png" 
                alt="Global Network Map" 
                className="w-full max-w-4xl relative z-10" 
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { region: "North America", connections: "45+ PoPs" },
                { region: "Europe", connections: "30+ PoPs" },
                { region: "Asia Pacific", connections: "25+ PoPs" },
                { region: "Global Partners", connections: "200+ Institutions" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-gradient-blue text-lg font-medium">{item.region}</div>
                  <div className="text-sm text-gray-400">{item.connections}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-6 lg:px-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel rounded-3xl overflow-hidden p-10 md:p-16 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-mint/10 text-esnet-mint text-sm font-medium mb-6">
              Connect Now
            </div>
            
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              Ready to leverage our <span className="text-gradient-mint">network infrastructure</span>?
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Join hundreds of research and educational institutions already using our high-performance network.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-esnet-mint hover:bg-esnet-mint/90 text-black font-medium rounded-full transition-all duration-300 flex items-center group">
                <span>Request Network Access</span>
                <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium transition-all duration-300">
                View Network Documentation
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Network;
