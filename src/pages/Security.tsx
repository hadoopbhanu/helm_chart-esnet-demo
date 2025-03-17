
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowRight, 
  Shield, 
  Lock, 
  FileCheck, 
  Key,
  AlertCircle,
  Eye,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Security = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Animation sequence on load
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);
  
  return (
    <div className="min-h-screen bg-esnet-dark overflow-x-hidden">
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
            Security Framework
          </div>
          
          {/* Headline */}
          <h1 className={cn(
            "text-5xl md:text-6xl font-medium leading-tight mb-6 transform transition-all duration-700 delay-100",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span className="text-white">Advanced Network </span>
            <span className="text-gradient-blue">Security</span>
          </h1>
          
          {/* Subtitle */}
          <p className={cn(
            "text-xl md:text-2xl text-gray-400 max-w-3xl mb-10 transform transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Protecting research data and infrastructure with comprehensive security solutions that don't compromise performance.
          </p>
        </div>
      </section>
      
      {/* Security Approach Section */}
      <section className="py-16 px-6 lg:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-esnet-blue/10 text-esnet-blue text-sm font-medium mb-6">
                Our Approach
              </div>
              
              <h2 className="text-3xl md:text-4xl font-medium mb-6">
                Research-Focused <span className="text-gradient-blue">Security Model</span>
              </h2>
              
              <p className="text-gray-400 mb-8">
                Our security framework is designed specifically for research environments, providing robust protection without impeding the high-performance workflows that scientific discovery requires.
              </p>
              
              <div className="space-y-4">
                {[
                  { 
                    icon: <Shield className="w-5 h-5" />, 
                    title: "Defense in Depth", 
                    description: "Multiple layers of security controls throughout the infrastructure" 
                  },
                  { 
                    icon: <Lock className="w-5 h-5" />, 
                    title: "Zero Trust Architecture", 
                    description: "Verification required regardless of location or network" 
                  },
                  { 
                    icon: <FileCheck className="w-5 h-5" />, 
                    title: "Compliance Framework", 
                    description: "Adherence to international security standards and regulations" 
                  },
                  { 
                    icon: <Key className="w-5 h-5" />, 
                    title: "Identity Management", 
                    description: "Federated identity and access control systems" 
                  },
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
            
            <div className="glass-panel rounded-2xl overflow-hidden p-8">
              <h3 className="text-xl font-medium mb-6">Security Operations Center</h3>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-green-400 mr-2" />
                      <span className="font-medium">Network Status</span>
                    </div>
                    <div className="text-green-400 text-sm">Secure</div>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Eye className="w-5 h-5 text-esnet-blue mr-2" />
                      <span className="font-medium">Threats Detected</span>
                    </div>
                    <div className="text-2xl font-medium">24h: 47</div>
                    <div className="text-sm text-gray-400">All mitigated</div>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-esnet-violet mr-2" />
                      <span className="font-medium">Response Time</span>
                    </div>
                    <div className="text-2xl font-medium">3.2 min</div>
                    <div className="text-sm text-gray-400">Average</div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 text-esnet-mint mr-2" />
                    <span className="font-medium">Security Audits</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Vulnerability Scan", status: "Completed", date: "2 days ago" },
                      { name: "Penetration Test", status: "Completed", date: "14 days ago" },
                      { name: "Security Review", status: "Scheduled", date: "in 7 days" },
                    ].map((audit, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span>{audit.name}</span>
                        <div className="flex items-center">
                          <span className={audit.status === "Completed" ? "text-green-400" : "text-yellow-400"}>
                            {audit.status}
                          </span>
                          <span className="text-gray-400 ml-2">{audit.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Features Section */}
      <section className="py-16 px-6 lg:px-10 relative bg-gradient-to-b from-transparent to-esnet-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-violet/10 text-esnet-violet text-sm font-medium mb-3">
              Security Features
            </div>
            
            <h2 className="text-4xl font-medium mb-4">
              Comprehensive <span className="text-gradient-violet">Security Suite</span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our advanced security capabilities designed for research and education networks.
            </p>
          </div>
          
          <div className="glass-panel rounded-xl p-8">
            <Tabs defaultValue="network" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="network">Network Security</TabsTrigger>
                <TabsTrigger value="data">Data Protection</TabsTrigger>
                <TabsTrigger value="access">Access Controls</TabsTrigger>
              </TabsList>
              
              <TabsContent value="network" className="space-y-6">
                <h3 className="text-2xl font-medium mb-4">Network Security Controls</h3>
                <p className="text-gray-400 mb-6">
                  Our comprehensive network security architecture protects the infrastructure from threats while maintaining high performance for scientific applications.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "DDoS Protection",
                      description: "Advanced mitigation systems to protect against distributed denial-of-service attacks."
                    },
                    {
                      title: "Traffic Inspection",
                      description: "Deep packet inspection capabilities that don't compromise network performance."
                    },
                    {
                      title: "Secure Routing",
                      description: "RPKI and other secure routing protocols to prevent route hijacking."
                    },
                    {
                      title: "Network Segmentation",
                      description: "Logical separation of network segments with controlled access points."
                    },
                  ].map((item, i) => (
                    <div key={i} className="glass-panel rounded-lg p-4">
                      <h4 className="font-medium mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="space-y-6">
                <h3 className="text-2xl font-medium mb-4">Data Protection</h3>
                <p className="text-gray-400 mb-6">
                  Ensure the integrity and confidentiality of research data throughout its lifecycle, from creation to transmission to storage.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "End-to-End Encryption",
                      description: "Secure data in transit with strong encryption protocols across the network."
                    },
                    {
                      title: "Secure Data Transfer",
                      description: "Specialized tools for secure transfer of large scientific datasets."
                    },
                    {
                      title: "Data Loss Prevention",
                      description: "Controls to prevent unauthorized data exfiltration."
                    },
                    {
                      title: "Secure Storage",
                      description: "Encrypted storage options for sensitive research data."
                    },
                  ].map((item, i) => (
                    <div key={i} className="glass-panel rounded-lg p-4">
                      <h4 className="font-medium mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="access" className="space-y-6">
                <h3 className="text-2xl font-medium mb-4">Access Controls</h3>
                <p className="text-gray-400 mb-6">
                  Sophisticated identity and access management systems tailored for research community needs.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Federated Identity",
                      description: "Integration with institutional identity systems for seamless access."
                    },
                    {
                      title: "Multi-Factor Authentication",
                      description: "Additional security layer for accessing sensitive resources."
                    },
                    {
                      title: "Role-Based Access",
                      description: "Granular permissions based on user roles and requirements."
                    },
                    {
                      title: "Just-in-Time Access",
                      description: "Temporary elevated privileges with approval workflows."
                    },
                  ].map((item, i) => (
                    <div key={i} className="glass-panel rounded-lg p-4">
                      <h4 className="font-medium mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-6 lg:px-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel rounded-3xl overflow-hidden p-10 md:p-16 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-esnet-blue/10 text-esnet-blue text-sm font-medium mb-6">
              Security Resources
            </div>
            
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              Need more information about our <span className="text-gradient-blue">security framework</span>?
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Access detailed documentation about our security approach, compliance certifications, and best practices.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-esnet-blue hover:bg-esnet-blue/90 text-white font-medium rounded-full transition-all duration-300 flex items-center group">
                <span>Security Documentation</span>
                <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium transition-all duration-300">
                Request Security Assessment
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

export default Security;
