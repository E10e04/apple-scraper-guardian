
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Apple } from '@/utils/gameAnalyzer';

interface AnalysisOverlayProps {
  apples: Apple[];
  isVisible: boolean;
  className?: string;
}

const AnalysisOverlay = ({ apples, isVisible, className }: AnalysisOverlayProps) => {
  if (!isVisible) return null;
  
  return (
    <div 
      className={cn(
        'absolute inset-0 pointer-events-none z-40',
        className
      )}
    >
      <AnimatePresence>
        {isVisible && (
          <>
            {apples.map((apple) => (
              <motion.div
                key={apple.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 500, 
                  damping: 30,
                  delay: Math.random() * 0.3 // Stagger effect
                }}
                style={{
                  left: `${apple.position.x}%`,
                  top: `${apple.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={cn(
                  'absolute rounded-full flex items-center justify-center',
                  'w-8 h-8 shadow-lg border-2',
                  apple.type === 'good' 
                    ? 'bg-apple-good/20 border-apple-good text-apple-good' 
                    : 'bg-apple-bad/20 border-apple-bad text-apple-bad'
                )}
              >
                <span className="text-xs font-semibold">
                  {apple.type === 'good' ? '+' + (apple.value || '') : '×'}
                </span>
                
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse' 
                  }}
                  className={cn(
                    'absolute inset-0 rounded-full',
                    apple.type === 'good' 
                      ? 'bg-apple-good/20' 
                      : 'bg-apple-bad/20'
                  )}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalysisOverlay;
