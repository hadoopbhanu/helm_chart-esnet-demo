
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import { 
  ArrowRight, 
  Layers, 
  FileText, 
  Database, 
  Cloud,
  Figma,
  PackageCheck,
  Monitor
} from 'lucide-react';

const Services = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Animation sequence on load
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);
  
  // Services data
  const services = [
    {
      title: 'Data Transfer Service',
      description: 'High-performance data movement solution for transferring large scientific datasets across global distances.',
      icon: <Database className="w-6 h-6" />,
      accentColor: 'blue' as const,
    },
    {
      title: 'Science DMZ',
      description: 'Network architecture designed for data-intensive science applications with security measures that enable, rather than impede, high-performance workflows.',
      icon: <PackageCheck className="w-6 h-6" />,
      accentColor: 'violet' as const,
    },
    {
      title: 'Cloud Connect',
      description: 'Direct, high-bandwidth connections to major cloud providers for efficient and cost-effective cloud utilization.',
      icon: <Cloud className="w-6 h-6" />,
      accentColor: 'mint' as const,
    },
    {
      title: 'Collaboration Platform',
      description: 'Advanced tools for real-time collaboration between research teams, including video conferencing and shared workspaces.',
      icon: <Figma className="w-6 h-6" />,
      accentColor: 'blue' as const,
    },
    {
      title: 'Network Monitoring',
      description: 'Real-time performance monitoring and analytics tools to visualize and optimize network utilization.',
      icon: <Monitor className="w-6 h-6" />,
      accentColor: 'violet' as const,
    },
    {
      title: 'Documentation Service',
      description: 'Comprehensive documentation and resources for leveraging our network infrastructure effectively.',
      icon: <FileText className="w-6 h-6" />,
      accentColor: 'mint' as const,
    },
  ];
  
  return (
    <div className="min-h-screen bg-esnet-dark overflow-x-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow */}
          <div className={cn(
            "inline-block px-3 py-1 rounded-full bg-esnet-violet/10 text-esnet-violet text-sm font-medium mb-6 transform transition-all duration-700",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Network Services
          </div>
          
          {/* Headline */}
          <h1 className={cn(
            "text-5xl md:text-6xl font-medium leading-tight mb-6 transform transition-all duration-700 delay-100",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span className="text-white">Advanced Network </span>
            <span className="text-gradient-violet">Services</span>
          </h1>
          
          {/* Subtitle */}
          <p className={cn(
            "text-xl md:text-2xl text-gray-400 max-w-3xl mb-10 transform transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Empowering scientific collaboration with specialized network services designed for researchers and educational institutions.
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 px-6 lg:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-mint/10 text-esnet-mint text-sm font-medium mb-3">
              Our Offerings
            </div>
            
            <h2 className="text-4xl font-medium mb-4">
              Comprehensive <span className="text-gradient-mint">Service Suite</span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Specialized services designed to enhance research capabilities and scientific collaboration.
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={service.title}>
                <FeatureCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  accentColor={service.accentColor}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Service Tiers Section */}
      <section className="py-20 px-6 lg:px-10 relative bg-gradient-to-b from-transparent to-esnet-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-blue/10 text-esnet-blue text-sm font-medium mb-3">
              Service Levels
            </div>
            
            <h2 className="text-4xl font-medium mb-4">
              <span className="text-gradient-blue">Flexible</span> Service Tiers
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the appropriate service level for your specific research or educational needs.
            </p>
          </div>
          
          {/* Service Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: "Basic",
                description: "Essential networking capabilities for smaller research groups",
                price: "Contact for pricing",
                features: [
                  "10 Gbps connectivity",
                  "Basic monitoring tools",
                  "Standard security measures",
                  "Email support",
                ],
                accentColor: "from-blue-500/20 to-blue-600/20",
                buttonColor: "bg-white/10 hover:bg-white/15",
                popular: false,
              },
              {
                tier: "Professional",
                description: "Enhanced capabilities for mid-sized institutions",
                price: "Contact for pricing",
                features: [
                  "40 Gbps connectivity",
                  "Advanced monitoring suite",
                  "Enhanced security features",
                  "Priority support 8/5",
                  "Data transfer service",
                ],
                accentColor: "from-violet-500/30 to-blue-600/30",
                buttonColor: "bg-esnet-violet hover:bg-esnet-violet/90",
                popular: true,
              },
              {
                tier: "Enterprise",
                description: "Comprehensive solution for major research institutions",
                price: "Contact for pricing",
                features: [
                  "100+ Gbps connectivity",
                  "Full monitoring ecosystem",
                  "Advanced security framework",
                  "24/7 dedicated support",
                  "All premium services",
                  "Custom integrations",
                ],
                accentColor: "from-mint-500/20 to-mint-600/20",
                buttonColor: "bg-white/10 hover:bg-white/15",
                popular: false,
              },
            ].map((tier, i) => (
              <div 
                key={i} 
                className={cn(
                  "glass-panel rounded-2xl p-8 relative",
                  tier.popular && "border-2 border-esnet-violet"
                )}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 bg-esnet-violet px-4 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className={cn(
                  "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white mb-4",
                  tier.accentColor
                )}>
                  <Layers className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-medium mb-2">{tier.tier}</h3>
                <p className="text-sm text-gray-400 mb-4">{tier.description}</p>
                
                <div className="text-2xl font-medium mb-6">{tier.price}</div>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <div className="text-esnet-blue mr-2">✓</div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={cn(
                  "w-full py-2 rounded-lg font-medium transition-all duration-300",
                  tier.buttonColor
                )}>
                  Request Information
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-6 lg:px-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel rounded-3xl overflow-hidden p-10 md:p-16 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-blue/10 text-esnet-blue text-sm font-medium mb-6">
              Get Started
            </div>
            
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              Ready to enable <span className="text-gradient-blue">advanced capabilities</span> for your institution?
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Contact our team to discuss how our services can enhance your research and educational efforts.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-esnet-blue hover:bg-esnet-blue/90 text-white font-medium rounded-full transition-all duration-300 flex items-center group">
                <span>Request Service Consultation</span>
                <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium transition-all duration-300">
                View Service Documentation
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

export default Services;
