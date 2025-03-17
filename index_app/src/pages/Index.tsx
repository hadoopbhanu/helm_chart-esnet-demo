
import { useEffect, useRef, useState } from 'react';
import { staggeredAnimations } from '@/utils/animations';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import NetworkVisualization from '@/components/NetworkVisualization';
import StatusPanel from '@/components/StatusPanel';
import FeatureCard from '@/components/FeatureCard';
import Footer from '@/components/Footer';
import { 
  CircuitBoard, 
  Server, 
  Globe, 
  Shield, 
  Layers,
  Database,
  Network,
  Lock,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [featuresInView, setFeaturesInView] = useState(false);
  
  useEffect(() => {
    // Animation sequence on load
    setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    // Scroll indicator
    const handleScroll = () => {
      if (window.scrollY > 100 && heroRef.current) {
        heroRef.current.classList.add('opacity-0', 'pointer-events-none');
      } else if (heroRef.current) {
        heroRef.current.classList.remove('opacity-0', 'pointer-events-none');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Setup intersection observer for features section
  useEffect(() => {
    if (!featuresRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setFeaturesInView(true);
      }
    }, { threshold: 0.1 });
    
    observer.observe(featuresRef.current);
    
    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, [featuresRef]);
  
  // Feature cards data
  const features = [
    {
      title: 'High-Performance Networking',
      description: 'Experience ultra-low latency and massive throughput across global research networks.',
      icon: <CircuitBoard className="w-6 h-6" />,
      accentColor: 'blue' as const,
    },
    {
      title: 'Advanced Infrastructure',
      description: 'Leverage cutting-edge hardware and software for unmatched reliability and performance.',
      icon: <Server className="w-6 h-6" />,
      accentColor: 'violet' as const,
    },
    {
      title: 'Global Connectivity',
      description: 'Connect with partners and resources worldwide through our extensive peering network.',
      icon: <Globe className="w-6 h-6" />,
      accentColor: 'mint' as const,
    },
    {
      title: 'Secure Communications',
      description: 'Protect sensitive data with state-of-the-art encryption and security protocols.',
      icon: <Shield className="w-6 h-6" />,
      accentColor: 'blue' as const,
    },
    {
      title: 'Scalable Architecture',
      description: 'Expand your capabilities on demand with flexible and resilient network design.',
      icon: <Layers className="w-6 h-6" />,
      accentColor: 'violet' as const,
    },
    {
      title: 'Cloud Integration',
      description: 'Seamlessly connect to major cloud providers with optimized routing and performance.',
      icon: <Database className="w-6 h-6" />,
      accentColor: 'mint' as const,
    },
  ];
  
  return (
    <div className="min-h-screen bg-esnet-dark overflow-x-hidden">
      {/* Background visualization */}
      <NetworkVisualization />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 px-6 lg:px-10 flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Eyebrow */}
          <div className={cn(
            "inline-block px-3 py-1 rounded-full bg-esnet-blue/10 text-esnet-blue text-sm font-medium mb-6 transform transition-all duration-700",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Next-Generation Network Infrastructure
          </div>
          
          {/* Headline */}
          <h1 className={cn(
            "text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 transform transition-all duration-700 delay-100",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span className="text-white">Advanced Network </span>
            <span className="text-gradient-blue">Infrastructure</span>
            <span className="text-white"> for the Future</span>
          </h1>
          
          {/* Subtitle */}
          <p className={cn(
            "text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 transform transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Empowering research and education communities with ultra-high-performance networking solutions.
          </p>
          
          {/* CTA Buttons */}
          <div className={cn(
            "flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16 transform transition-all duration-700 delay-300",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <button className="px-8 py-3 bg-esnet-blue hover:bg-esnet-blue/90 text-white rounded-full font-medium transition-all duration-300 flex items-center group">
              <span>Explore Network</span>
              <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            
            <button className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium transition-all duration-300">
              View Documentation
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div
          ref={heroRef}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-gray-400 transition-opacity duration-500"
        >
          <div className="text-xs font-medium">Scroll to explore</div>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>
      
      {/* Status Dashboard Section - Moved to center and enlarged */}
      <section className="py-10 px-6 lg:px-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className={cn(
            "transform transition-all duration-700 delay-500",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <StatusPanel />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        id="features" 
        className="py-20 px-6 lg:px-10 relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className={cn(
              "inline-block px-3 py-1 rounded-full bg-esnet-violet/10 text-esnet-violet text-sm font-medium mb-3 transform transition-all duration-500",
              featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Advanced Capabilities
            </div>
            
            <h2 className={cn(
              "text-4xl md:text-5xl font-medium mb-4 transform transition-all duration-500 delay-100",
              featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Next-Generation <span className="text-gradient-violet">Network Features</span>
            </h2>
            
            <p className={cn(
              "text-xl text-gray-400 max-w-2xl mx-auto transform transition-all duration-500 delay-200",
              featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Discover the advanced technologies powering our global network infrastructure.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={cn(
                  "transform transition-all duration-700",
                  featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  accentColor={feature.accentColor}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-6 lg:px-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel rounded-3xl overflow-hidden p-10 md:p-16 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-mint/10 text-esnet-mint text-sm font-medium mb-6">
              Get Started Today
            </div>
            
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              Ready to transform your <span className="text-gradient-mint">network infrastructure</span>?
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Join the global community of research and education institutions leveraging our advanced networking solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-esnet-mint hover:bg-esnet-mint/90 text-black font-medium rounded-full transition-all duration-300 flex items-center group">
                <span>Request Access</span>
                <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium transition-all duration-300">
                Schedule Demo
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

export default Index;
