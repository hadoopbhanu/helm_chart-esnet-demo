
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import NetworkAnimation from '@/components/NetworkAnimation';
import Features from '@/components/Features';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  useEffect(() => {
    // Initialize intersection observer for animation elements
    const animatedElements = document.querySelectorAll('.animated-content');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach((el) => observer.observe(el));
    
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* Network Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <NetworkAnimation />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="overflow-hidden">
          <Hero />
          <Features />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
