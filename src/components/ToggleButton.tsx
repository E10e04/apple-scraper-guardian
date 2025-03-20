
import React from 'react';
import { motion } from 'framer-motion';
import { Power } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToggleButtonProps {
  isActive: boolean;
  onToggle: () => void;
  className?: string;
}

const ToggleButton = ({ isActive, onToggle, className }: ToggleButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onToggle}
      className={cn(
        'relative flex items-center justify-center w-14 h-14 rounded-full',
        'shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2',
        'transition-all duration-300 ease-out',
        isActive ? 
          'bg-primary text-white ring-primary' : 
          'bg-secondary text-muted-foreground ring-secondary',
        className
      )}
      aria-pressed={isActive}
      aria-label={isActive ? 'Désactiver l\'analyse' : 'Activer l\'analyse'}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isActive ? 0 : 180,
          scale: isActive ? 1 : 0.8
        }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 500 }}
      >
        <Power 
          size={24} 
          className={cn(
            'stroke-current',
            isActive ? 'opacity-100' : 'opacity-70'
          )} 
        />
      </motion.div>
    </motion.button>
  );
};

export default ToggleButton;
