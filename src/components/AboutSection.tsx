
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="heading-lg mb-6 animated-content">
              Empowering Scientific Research Through Connectivity
            </h2>
            <p className="text-lg mb-6 text-muted-foreground animated-content">
              ES.Network is dedicated to providing researchers with the advanced networking tools they need to push the boundaries of science and discovery.
            </p>
            
            <div className="space-y-4 animated-content">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <p>Supporting data-intensive research with high-performance networking infrastructure</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <p>Connecting laboratories, universities, and research facilities across the globe</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <p>Developing innovative networking solutions for tomorrow's scientific challenges</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative animated-content">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl relative bg-gradient-to-br from-primary/5 to-primary/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-20 h-20">
                  <div className="w-full h-full rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg animate-pulse-light">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                <h3 className="text-lg font-semibold">Watch Our Network in Action</h3>
                <p className="text-sm text-white/80">See how our technology powers scientific discovery</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full z-[-1] animate-float"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full z-[-1] animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
