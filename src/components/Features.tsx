
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Network, 
  ShieldCheck, 
  Gauge, 
  Share2,
  Globe,
  Server
} from 'lucide-react';

const features = [
  {
    icon: <Network className="h-12 w-12 text-primary" />,
    title: 'Network Infrastructure',
    description: 'High-performance networking infrastructure designed for research and education communities.',
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    title: 'Security Services',
    description: 'Advanced security services to protect critical research data and infrastructure.',
  },
  {
    icon: <Gauge className="h-12 w-12 text-primary" />,
    title: 'Performance Monitoring',
    description: 'Comprehensive monitoring tools for network performance and analytics.',
  },
  {
    icon: <Share2 className="h-12 w-12 text-primary" />,
    title: 'Collaboration Tools',
    description: 'Solutions that enable seamless collaboration between research institutions.',
  },
  {
    icon: <Globe className="h-12 w-12 text-primary" />,
    title: 'Global Connectivity',
    description: 'International partnerships providing worldwide research connectivity.',
  },
  {
    icon: <Server className="h-12 w-12 text-primary" />,
    title: 'Cloud Integration',
    description: 'Seamless integration with cloud services optimized for scientific computing.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-800 animated-content">
            Comprehensive Networking Solutions
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto animated-content">
            We provide a full suite of network services optimized for research and education communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 p-8 animated-content flex flex-col h-full"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="p-3 rounded-full bg-primary/10 w-fit mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 mb-6 flex-grow">{feature.description}</p>
              <Button 
                variant="ghost" 
                className="mt-auto text-primary hover:text-primary-dark hover:bg-primary/5 p-0 flex items-center font-medium"
              >
                Learn more <span className="ml-2">→</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
