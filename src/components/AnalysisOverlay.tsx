
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Apple } from '@/utils/gameAnalyzer';
import { Check, X } from 'lucide-react';

interface AnalysisOverlayProps {
  apples: Apple[];
  isVisible: boolean;
  className?: string;
}

const AnalysisOverlay = ({ apples, isVisible, className }: AnalysisOverlayProps) => {
  if (!isVisible) return null;
  
  // Group apples by row for grid display
  const rowsMap = apples.reduce((acc, apple) => {
    if (!acc[apple.row]) {
      acc[apple.row] = [];
    }
    acc[apple.row].push(apple);
    return acc;
  }, {} as Record<number, Apple[]>);
  
  // Convert to array and sort by row number
  const rows = Object.keys(rowsMap)
    .map(Number)
    .sort((a, b) => a - b)
    .map(rowNum => ({
      rowNum,
      apples: rowsMap[rowNum].sort((a, b) => a.column - b.column)
    }));
  
  return (
    <div 
      className={cn(
        'absolute inset-0 pointer-events-none z-40',
        className
      )}
    >
      <AnimatePresence>
        {isVisible && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            {rows.map(({ rowNum, apples: rowApples }) => (
              <motion.div
                key={`row-${rowNum}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowNum * 0.1 }}
                className="flex justify-center items-center mb-4 relative"
                style={{
                  width: '100%',
                  marginTop: `${rowNum * 2}px`
                }}
              >
                {rowApples.map((apple) => (
                  <motion.div
                    key={apple.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 500, 
                      damping: 30,
                      delay: apple.column * 0.1 // Stagger effect by column
                    }}
                    style={{
                      left: `${apple.position.x}%`,
                      top: `${apple.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className={cn(
                      'absolute rounded-full flex items-center justify-center',
                      'w-10 h-10 shadow-lg border-2',
                      apple.type === 'good' 
                        ? 'bg-apple-good/20 border-apple-good text-apple-good' 
                        : 'bg-apple-bad/20 border-apple-bad text-apple-bad'
                    )}
                  >
                    {apple.type === 'good' ? (
                      <div className="flex flex-col items-center justify-center">
                        <Check size={16} className="text-apple-good" />
                        {apple.multiplier && (
                          <span className="text-xs font-semibold">
                            x{apple.multiplier.toFixed(1)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <X size={16} className="text-apple-bad" />
                    )}
                    
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
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalysisOverlay;
