
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  isVisible: boolean;
  message?: string;
  className?: string;
}

const ProgressBar = ({ 
  progress, 
  isVisible, 
  message = "Analyse en cours...",
  className 
}: ProgressBarProps) => {
  const [showBar, setShowBar] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShowBar(true);
    } else {
      // Delay hiding to allow animation to complete
      const timer = setTimeout(() => setShowBar(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  
  if (!showBar) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={cn(
            'fixed top-0 left-0 right-0 z-50 px-4 py-2',
            'glass-panel backdrop-blur-md border-b',
            'flex flex-col items-center justify-center',
            className
          )}
        >
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">{message}</span>
              <span className="text-xs font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ 
                  type: "spring",
                  stiffness: 70,
                  damping: 20
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProgressBar;
