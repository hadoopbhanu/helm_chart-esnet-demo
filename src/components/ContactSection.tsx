
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin,
  Send
} from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 animated-content">Get in Touch</h2>
          <p className="subheading mx-auto animated-content">
            Have questions about our network solutions? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass-card p-8 animated-content">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-medium">Email</h4>
                  <a href="mailto:info@esnet.example" className="text-muted-foreground hover:text-primary transition-colors">
                    info@esnet.example
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-medium">Phone</h4>
                  <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-medium">Address</h4>
                  <p className="text-muted-foreground">
                    1 Cyclotron Road<br />
                    Berkeley, CA 94720
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="text-base font-medium mb-2">Support Hours</h4>
              <p className="text-sm text-muted-foreground">
                Our support team is available 24/7 for critical network issues.
              </p>
            </div>
          </div>
          
          <div className="animated-content">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="w-full transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="organization" className="text-sm font-medium">
                  Organization
                </label>
                <Input 
                  id="organization" 
                  placeholder="Research Institution" 
                  className="w-full transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us how we can help..." 
                  className="w-full min-h-[120px] transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" 
                />
              </div>
              
              <Button type="submit" className="btn-primary w-full">
                Send Message <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
