
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observerRef.current?.unobserve(entry.target);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    elementsRef.current = Array.from(document.querySelectorAll('.animated-content'));
    elementsRef.current.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        elementsRef.current.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 mb-6 animate-fade-in">
            <span className="text-sm font-medium text-primary">Advanced Network Services</span>
          </div>
          
          <h1 className="heading-xl mb-6 animated-content">
            <span className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>
              High-Performance Networking
            </span>
            <span className="block animate-slide-up" style={{ animationDelay: '0.3s' }}>
              For Advanced <span className="text-primary">Research</span>
            </span>
          </h1>
          
          <p className="subheading mx-auto mb-10 animated-content" style={{ animationDelay: '0.5s' }}>
            Connecting research institutions with ultra-high-speed networks, advanced services, and innovative solutions to accelerate scientific discovery.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animated-content" style={{ animationDelay: '0.7s' }}>
            <Button className="btn-primary">
              Explore Solutions <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="btn-secondary">
              Learn More
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animated-content" style={{ animationDelay: '0.9s' }}>
          <div className="glass-card p-6 text-center h-full transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
            <div className="text-4xl font-bold text-primary mb-2">100G+</div>
            <p className="text-sm text-muted-foreground">Network Speed</p>
          </div>
          <div className="glass-card p-6 text-center h-full transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </div>
          <div className="glass-card p-6 text-center h-full transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <p className="text-sm text-muted-foreground">Research Sites</p>
          </div>
          <div className="glass-card p-6 text-center h-full transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <p className="text-sm text-muted-foreground">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
