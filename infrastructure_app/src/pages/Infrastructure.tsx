
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowRight,
  Server,
  HardDrive,
  Router,
  Cpu,
  Workflow,
  Database,
  Network
} from 'lucide-react';
import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Infrastructure = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Animation sequence on load
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);
  
  // Sample data for charts
  const resourceData = [
    { name: 'Data Centers', value: 42 },
    { name: 'Edge Locations', value: 65 },
    { name: 'Core Routers', value: 120 },
    { name: 'Storage (PB)', value: 500 },
  ];
  
  const COLORS = ['#00A3FF', '#9D6EFF', '#36FFB5', '#FFB336'];
  
  const capacityData = [
    { name: 'Q1', capacity: 200 },
    { name: 'Q2', capacity: 280 },
    { name: 'Q3', capacity: 350 },
    { name: 'Q4', capacity: 450 },
    { name: 'Q1 Next', capacity: 550, projected: true },
    { name: 'Q2 Next', capacity: 650, projected: true },
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
            "inline-block px-3 py-1 rounded-full bg-esnet-mint/10 text-esnet-mint text-sm font-medium mb-6 transform transition-all duration-700",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Infrastructure
          </div>
          
          {/* Headline */}
          <h1 className={cn(
            "text-5xl md:text-6xl font-medium leading-tight mb-6 transform transition-all duration-700 delay-100",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span className="text-white">Cutting-Edge </span>
            <span className="text-gradient-mint">Infrastructure</span>
          </h1>
          
          {/* Subtitle */}
          <p className={cn(
            "text-xl md:text-2xl text-gray-400 max-w-3xl mb-10 transform transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Explore the advanced hardware and systems powering our global research network platform.
          </p>
        </div>
      </section>
      
      {/* Infrastructure Overview */}
      <section className="py-16 px-6 lg:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left column - Text */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-esnet-mint/10 text-esnet-mint text-sm font-medium mb-6">
                Technology Stack
              </div>
              
              <h2 className="text-3xl md:text-4xl font-medium mb-6">
                State-of-the-Art <span className="text-gradient-mint">Hardware</span>
              </h2>
              
              <p className="text-gray-400 mb-8">
                Our infrastructure is built using the latest technologies and hardware from industry-leading vendors, designed to provide unmatched performance, reliability, and scalability for research and education networks.
              </p>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <Router className="w-10 h-10" />, 
                    title: "Advanced Routing Equipment", 
                    description: "High-performance routers capable of handling terabits of data with minimal latency." 
                  },
                  { 
                    icon: <Server className="w-10 h-10" />, 
                    title: "Distributed Data Centers", 
                    description: "Strategically located facilities optimized for scientific computing and data transfer." 
                  },
                  { 
                    icon: <HardDrive className="w-10 h-10" />, 
                    title: "Storage Infrastructure", 
                    description: "Petabyte-scale storage solutions for temporary and long-term research data." 
                  },
                  { 
                    icon: <Cpu className="w-10 h-10" />, 
                    title: "Computing Resources", 
                    description: "Edge computing capabilities to support data processing near the source." 
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 p-2 rounded-full bg-white/5 text-esnet-mint">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right column - Chart */}
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-xl font-medium">Infrastructure Resources</h3>
              </div>
              <div className="p-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {resourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="glass-panel p-2 text-sm">
                              <p>{`${payload[0].name}: ${payload[0].value}`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Capacity Planning */}
      <section className="py-16 px-6 lg:px-10 relative bg-gradient-to-b from-transparent to-esnet-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-blue/10 text-esnet-blue text-sm font-medium mb-3">
              Capacity Planning
            </div>
            
            <h2 className="text-4xl font-medium mb-4">
              <span className="text-gradient-blue">Scaling</span> For The Future
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our infrastructure is designed to scale with the growing demands of scientific research.
            </p>
          </div>
          
          <div className="glass-panel rounded-xl p-6 mb-16">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={capacityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const isProjected = payload[0].payload.projected;
                        return (
                          <div className="glass-panel p-2 text-sm">
                            <p>{`${label}: ${payload[0].value} TB`}</p>
                            {isProjected && <p className="text-esnet-mint">(Projected)</p>}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="capacity" 
                    fill="#00A3FF" 
                    radius={[4, 4, 0, 0]}
                    shape={({ x, y, width, height, payload }) => {
                      const fill = payload.projected ? '#36FFB5' : '#00A3FF';
                      return (
                        <rect 
                          x={x} 
                          y={y} 
                          width={width} 
                          height={height} 
                          fill={fill} 
                          rx={4}
                          ry={4}
                        />
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 pt-4 border-t border-white/10 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-esnet-blue rounded-full mr-2"></div>
                <span className="text-sm text-gray-400">Current Capacity</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-esnet-mint rounded-full mr-2"></div>
                <span className="text-sm text-gray-400">Projected Capacity</span>
              </div>
            </div>
          </div>
          
          {/* Infrastructure Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Database className="w-6 h-6" />, stat: "500+ PB", label: "Storage Capacity" },
              { icon: <Network className="w-6 h-6" />, stat: "100+ Tbps", label: "Total Bandwidth" },
              { icon: <Server className="w-6 h-6" />, stat: "42", label: "Data Centers" },
              { icon: <Workflow className="w-6 h-6" />, stat: "99.999%", label: "Uptime" },
            ].map((item, i) => (
              <div key={i} className="glass-panel rounded-xl p-6 text-center hover-translate">
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-full bg-esnet-blue/10 text-esnet-blue">
                    {item.icon}
                  </div>
                </div>
                <div className="text-2xl font-medium mb-1">{item.stat}</div>
                <div className="text-sm text-gray-400">{item.label}</div>
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
              Technical Resources
            </div>
            
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              Want to learn more about our <span className="text-gradient-mint">infrastructure</span>?
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Access technical documentation and infrastructure specifications for planning your research network integration.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-esnet-mint hover:bg-esnet-mint/90 text-black font-medium rounded-full transition-all duration-300 flex items-center group">
                <span>View Technical Documentation</span>
                <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium transition-all duration-300">
                Request Infrastructure Consultation
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

export default Infrastructure;
