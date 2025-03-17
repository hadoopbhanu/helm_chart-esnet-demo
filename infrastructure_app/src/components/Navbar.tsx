
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CircuitBoard, Layers, Network, Lock, Server, Settings, User, Info } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 lg:px-10',
      scrolled ? 'py-3 glass-panel' : 'py-5 bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Network className="w-8 h-8 text-esnet-blue" />
          <span className="text-xl font-medium tracking-tight">
            <span className="text-white">ES.</span>
            <span className="text-gradient-blue">Net</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {[
            { name: 'Network', icon: <CircuitBoard className="w-4 h-4" />, path: '/network' },
            { name: 'Services', icon: <Layers className="w-4 h-4" />, path: '/services' },
            { name: 'Infrastructure', icon: <Server className="w-4 h-4" />, path: '/infrastructure' },
            { name: 'Security', icon: <Lock className="w-4 h-4" />, path: '/security' },
            { name: 'About', icon: <Info className="w-4 h-4" />, path: '/about' },
          ].map((item, i) => (
            <Link
              key={item.name}
              to={item.path}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-1.5"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center space-x-1">
          <button className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
            <User className="w-5 h-5" />
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="p-2 md:hidden text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1.5">
              <span className={cn(
                "block h-0.5 bg-current transition-transform duration-300",
                mobileMenuOpen ? "translate-y-2 rotate-45" : ""
              )}></span>
              <span className={cn(
                "block h-0.5 bg-current transition-opacity duration-300",
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              )}></span>
              <span className={cn(
                "block h-0.5 bg-current transition-transform duration-300",
                mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              )}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-0 top-16 bg-esnet-darker/95 backdrop-blur-lg transition-all duration-300 ease-in-out z-40 overflow-hidden",
        mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className="p-6 space-y-4">
          {[
            { name: 'Network', icon: <CircuitBoard className="w-5 h-5" />, path: '/network' },
            { name: 'Services', icon: <Layers className="w-5 h-5" />, path: '/services' },
            { name: 'Infrastructure', icon: <Server className="w-5 h-5" />, path: '/infrastructure' },
            { name: 'Security', icon: <Lock className="w-5 h-5" />, path: '/security' },
            { name: 'About', icon: <Info className="w-5 h-5" />, path: '/about' },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex-shrink-0 p-2 rounded-full bg-esnet-blue/10 text-esnet-blue">
                {item.icon}
              </div>
              <span className="text-lg font-medium text-white">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
