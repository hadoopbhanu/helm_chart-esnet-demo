
import { Network, Mail, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-esnet-darker px-6 lg:px-10 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Network className="w-7 h-7 text-esnet-blue" />
              <span className="text-xl font-medium tracking-tight">
                <span className="text-white">ES.</span>
                <span className="text-gradient-blue">Net</span>
              </span>
            </div>
            
            <p className="text-gray-400 text-sm">
              Advanced networking infrastructure for research and education communities, 
              enabling global collaboration and discovery.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors duration-300">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors duration-300">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Navigation Columns */}
          {[
            {
              title: 'Company',
              links: ['About', 'Team', 'Careers', 'Press', 'Contact']
            },
            {
              title: 'Resources',
              links: ['Documentation', 'Support', 'API', 'Status', 'Blog']
            },
            {
              title: 'Legal',
              links: ['Terms', 'Privacy', 'Security', 'Compliance', 'Accessibility']
            }
          ].map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2023 ESnet. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Status
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Sitemap
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Changelog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
