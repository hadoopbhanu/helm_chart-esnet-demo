
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
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
import { 
  Globe, 
  Network, 
  Server, 
  Users,
  Building,
  ArrowRight,
  RefreshCw,
  Award,
  BookOpen
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const About = () => {
  const [loaded, setLoaded] = useState(false);
  const networkMapRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const [historyInView, setHistoryInView] = useState(false);
  
  useEffect(() => {
    // Animation sequence on load
    setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    // Setup intersection observer for history section
    if (!historyRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setHistoryInView(true);
      }
    }, { threshold: 0.1 });
    
    observer.observe(historyRef.current);
    
    return () => {
      if (historyRef.current) {
        observer.unobserve(historyRef.current);
      }
    };
  }, [historyRef]);
  
  // Sample data for charts
  const timelineData = [
    { year: '1986', events: 1, papers: 10, funding: 2 },
    { year: '1990', events: 2, papers: 15, funding: 3 },
    { year: '1995', events: 3, papers: 20, funding: 6 },
    { year: '2000', events: 5, papers: 32, funding: 9 },
    { year: '2005', events: 7, papers: 45, funding: 12 },
    { year: '2010', events: 10, papers: 60, funding: 16 },
    { year: '2015', events: 12, papers: 75, funding: 21 },
    { year: '2020', events: 15, papers: 95, funding: 28 },
    { year: '2023', events: 18, papers: 110, funding: 35 },
  ];
  
  const networkData = [
    { name: 'Data Centers', value: 42 },
    { name: 'Research Partners', value: 180 },
    { name: 'Global Connections', value: 350 },
    { name: 'Active Projects', value: 95 },
  ];
  
  const COLORS = ['#00A3FF', '#9D6EFF', '#36FFB5', '#FFB336'];
  
  const trafficData = [
    { month: 'Jan', traffic: 200 },
    { month: 'Feb', traffic: 250 },
    { month: 'Mar', traffic: 180 },
    { month: 'Apr', traffic: 290 },
    { month: 'May', traffic: 350 },
    { month: 'Jun', traffic: 400 },
    { month: 'Jul', traffic: 380 },
    { month: 'Aug', traffic: 450 },
    { month: 'Sep', traffic: 500 },
    { month: 'Oct', traffic: 530 },
    { month: 'Nov', traffic: 580 },
    { month: 'Dec', traffic: 620 },
  ];
  
  // Mission statement and facts
  const missionPoints = [
    {
      title: "Advanced Network Infrastructure",
      description: "Managing a high-performance network that connects laboratories, universities, and research institutions across the globe.",
      icon: <Network className="w-10 h-10" />
    },
    {
      title: "Scientific Collaboration",
      description: "Enabling global research collaboration through secure, reliable data transfer and shared resources.",
      icon: <Users className="w-10 h-10" />
    },
    {
      title: "Technical Innovation",
      description: "Pioneering advancements in network technologies, protocols, and methodologies for scientific applications.",
      icon: <Server className="w-10 h-10" />
    },
    {
      title: "Global Partnerships",
      description: "Fostering strategic partnerships with international research networks and technology providers.",
      icon: <Globe className="w-10 h-10" />
    }
  ];
  
  const esnetFacts = [
    { number: "40+", text: "Years of Scientific Networking" },
    { number: "200+", text: "Petabytes Transferred Annually" },
    { number: "20", text: "Global Research Partnerships" },
    { number: "99.9%", text: "Network Reliability" }
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
            About ESnet
          </div>
          
          {/* Headline */}
          <h1 className={cn(
            "text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 transform transition-all duration-700 delay-100",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span className="text-white">Empowering Scientific </span>
            <span className="text-gradient-violet">Discovery</span>
            <span className="text-white"> Through Advanced Networking</span>
          </h1>
          
          {/* Subtitle */}
          <p className={cn(
            "text-xl md:text-2xl text-gray-400 max-w-3xl mb-10 transform transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            ESnet is the Department of Energy's dedicated science network, helping researchers meet their goals from experiment to discovery.
          </p>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 px-6 lg:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left column - Text */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-esnet-blue/10 text-esnet-blue text-sm font-medium mb-6">
                Our Mission
              </div>
              
              <h2 className="text-3xl md:text-4xl font-medium mb-6">
                Accelerating Scientific Breakthroughs Through <span className="text-gradient-blue">Advanced Networking</span>
              </h2>
              
              <p className="text-gray-400 mb-8">
                ESnet provides the high-bandwidth, reliable connections that link scientists at national laboratories, universities and other research institutions, enabling them to collaborate on some of the world's most important scientific challenges.
              </p>
              
              <div className="space-y-6">
                {missionPoints.map((point, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 p-2 rounded-full bg-white/5 text-esnet-blue">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">{point.title}</h3>
                      <p className="text-gray-400">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right column - Network Map */}
            <div ref={networkMapRef} className="glass-panel rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-medium">ESnet Logical Map</h3>
                <div className="text-sm text-gray-400">Displaying network topology</div>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/540e9377-5dc9-4c50-9b48-c7bb0c9f7547.png" 
                  alt="ESnet Logical Map" 
                  className="w-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-esnet-dark to-transparent opacity-40"></div>
              </div>
              
              <div className="p-4 flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Active Connections</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-1 text-esnet-blue animate-spin" />
                  <span>Real-time data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Facts & Figures */}
      <section className="py-16 px-6 lg:px-10 relative bg-gradient-to-b from-transparent to-esnet-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-mint/10 text-esnet-mint text-sm font-medium mb-3">
              Facts & Figures
            </div>
            
            <h2 className="text-4xl md:text-5xl font-medium mb-4">
              ESnet <span className="text-gradient-mint">By The Numbers</span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Delivering exceptional performance for the global research and education community.
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {esnetFacts.map((fact, i) => (
              <div key={i} className="glass-panel rounded-xl p-6 text-center hover-translate">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient-blue">{fact.number}</div>
                <div className="text-gray-400">{fact.text}</div>
              </div>
            ))}
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Traffic Chart */}
            <div className="glass-panel rounded-xl overflow-hidden col-span-2">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-xl font-medium">Network Traffic Growth</h3>
              </div>
              <div className="p-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00A3FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="glass-panel p-2 text-sm">
                              <p>{`${payload[0].payload.month}: ${payload[0].value} Tbps`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="traffic" 
                      stroke="#00A3FF" 
                      fillOpacity={1} 
                      fill="url(#trafficGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Pie Chart */}
            <div className="glass-panel rounded-xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-xl font-medium">Network Composition</h3>
              </div>
              <div className="p-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={networkData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {networkData.map((entry, index) => (
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
      
      {/* History Timeline */}
      <section 
        ref={historyRef}
        className="py-20 px-6 lg:px-10 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={cn(
              "inline-block px-3 py-1 rounded-full bg-esnet-blue/10 text-esnet-blue text-sm font-medium mb-3 transform transition-all duration-500",
              historyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Our History
            </div>
            
            <h2 className={cn(
              "text-4xl md:text-5xl font-medium mb-4 transform transition-all duration-500 delay-100",
              historyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <span className="text-gradient-blue">Evolution</span> of ESnet
            </h2>
            
            <p className={cn(
              "text-xl text-gray-400 max-w-2xl mx-auto transform transition-all duration-500 delay-200",
              historyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              From early beginnings to becoming a global leader in research networking.
            </p>
          </div>
          
          {/* Timeline Chart */}
          <div className={cn(
            "glass-panel rounded-xl overflow-hidden transform transition-all duration-700 delay-300",
            historyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="p-6 h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timelineData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="year" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass-panel p-3 text-sm">
                            <p className="font-bold mb-2">{label}</p>
                            <p className="text-esnet-blue">Events: {payload[0].value}</p>
                            <p className="text-esnet-violet">Papers: {payload[1].value}</p>
                            <p className="text-esnet-mint">Funding ($M): {payload[2].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="events" 
                    stroke="#00A3FF" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="papers" 
                    stroke="#9D6EFF" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="funding" 
                    stroke="#36FFB5" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="p-4 border-t border-white/10 flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-esnet-blue rounded-full mr-2"></div>
                <span className="text-sm text-gray-400">Major Events</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-esnet-violet rounded-full mr-2"></div>
                <span className="text-sm text-gray-400">Published Papers</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-esnet-mint rounded-full mr-2"></div>
                <span className="text-sm text-gray-400">Funding ($ Millions)</span>
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          <div className={cn(
            "flex justify-center mt-12 transform transition-all duration-700 delay-400",
            historyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <a href="#" className="flex items-center px-6 py-3 bg-esnet-blue/10 hover:bg-esnet-blue/20 text-esnet-blue rounded-full transition-all duration-300 group">
              <BookOpen className="w-5 h-5 mr-2" />
              <span>Learn more about our history</span>
              <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Leadership Section */}
      <section className="py-16 px-6 lg:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-violet/10 text-esnet-violet text-sm font-medium mb-3">
              Our Team
            </div>
            
            <h2 className="text-4xl font-medium mb-4">
              Meet Our <span className="text-gradient-violet">Leadership</span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Dedicated professionals driving ESnet's mission and vision.
            </p>
          </div>
          
          {/* Leadership Grid */}
          <div className="glass-panel rounded-xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center bg-white/5 rounded-xl p-4 hover-translate">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-esnet-blue to-esnet-violet flex items-center justify-center text-white text-xl font-bold mr-4">
                    {i === 1 ? 'EP' : i === 2 ? 'JM' : 'KL'}
                  </div>
                  <div>
                    <div className="font-medium">{i === 1 ? 'Erin Peterson' : i === 2 ? 'James Mitchell' : 'Kate Liu'}</div>
                    <div className="text-sm text-gray-400">{i === 1 ? 'Executive Director' : i === 2 ? 'Technical Director' : 'Operations Director'}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <button className="flex items-center px-6 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full transition-all duration-300 group">
                <span>View Full Organization</span>
                <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Awards Section */}
      <section className="py-16 px-6 lg:px-10 relative bg-gradient-to-b from-esnet-darker to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-mint/10 text-esnet-mint text-sm font-medium mb-3">
              Recognition
            </div>
            
            <h2 className="text-4xl font-medium mb-4">
              Awards & <span className="text-gradient-mint">Achievements</span>
            </h2>
          </div>
          
          {/* Awards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Excellence in Network Technology Innovation",
              "R&D 100 Award for Network Performance Monitoring",
              "Global Research Network Collaboration Award"
            ].map((award, i) => (
              <div key={i} className="glass-panel rounded-xl p-6 hover-translate">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-esnet-mint/20 to-esnet-blue/20 flex items-center justify-center">
                    <Award className="w-8 h-8 text-esnet-mint" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-lg mb-2">{award}</div>
                  <div className="text-sm text-gray-400">
                    Recognized for outstanding contributions to the field of scientific networking.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
