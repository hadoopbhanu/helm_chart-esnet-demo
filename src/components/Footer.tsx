
import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Github,
  ChevronRight 
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">ES.<span className="text-primary">Network</span></h3>
            <p className="text-gray-300 mb-6">
              Providing high-performance networking solutions for research and education communities worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Network Infrastructure
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Security Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Performance Monitoring
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Cloud Integration
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Collaboration Tools
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Research Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Network Status
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Support Portal
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full py-2 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ES.Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
