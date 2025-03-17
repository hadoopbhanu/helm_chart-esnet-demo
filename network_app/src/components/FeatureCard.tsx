
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  accentColor: 'blue' | 'violet' | 'mint';
  delay?: number;
}

const FeatureCard = ({ title, description, icon, accentColor, delay = 0 }: FeatureCardProps) => {
  const colorMap = {
    blue: {
      bgGradient: 'bg-gradient-blue',
      iconBg: 'bg-esnet-blue/10',
      iconColor: 'text-esnet-blue',
      shadow: 'shadow-neon-blue',
    },
    violet: {
      bgGradient: 'bg-gradient-violet',
      iconBg: 'bg-esnet-violet/10',
      iconColor: 'text-esnet-violet',
      shadow: 'shadow-neon-violet',
    },
    mint: {
      bgGradient: 'bg-gradient-mint',
      iconBg: 'bg-esnet-mint/10',
      iconColor: 'text-esnet-mint',
      shadow: 'shadow-neon-mint',
    },
  };
  
  const colors = colorMap[accentColor];
  
  return (
    <div 
      className={cn(
        "relative group overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 bg-black/30 backdrop-blur-sm transition-all duration-500 hover-scale",
        colors.bgGradient
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Content */}
      <div className="p-6">
        {/* Icon */}
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110",
          colors.iconBg, colors.iconColor
        )}>
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-6">{description}</p>
        
        {/* Action */}
        <div className="flex items-center text-sm font-medium">
          <span className="mr-2">Learn more</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
      
      {/* Glow effect */}
      <div className={cn(
        "absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur",
        colors.shadow
      )} />
    </div>
  );
};

export default FeatureCard;
