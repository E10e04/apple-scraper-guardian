
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';
import ToggleButton from './ToggleButton';
import AnalysisResults from './AnalysisResults';
import { Apple } from '@/utils/gameAnalyzer';

interface ControlPanelProps {
  isEnabled: boolean;
  isLoaded: boolean;
  isAnalyzing: boolean;
  apples: Apple[];
  onToggle: () => void;
  onReanalyze: () => void;
}

const ControlPanel = ({
  isEnabled,
  isLoaded,
  isAnalyzing,
  apples,
  onToggle,
  onReanalyze
}: ControlPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.div 
        className={cn(
          "glass-panel rounded-2xl p-4 shadow-lg",
          "flex flex-col items-center space-y-4",
          "transition-all duration-300",
          isEnabled ? "border-primary/30" : "border-gray-200"
        )}
      >
        <div className="flex items-center justify-between w-full">
          <Zap className={cn(
            "w-5 h-5 mr-2", 
            isEnabled ? "text-primary" : "text-muted-foreground"
          )} />
          <h3 className="text-sm font-medium flex-1">
            {isEnabled ? 'Analyse Activée' : 'Analyse Désactivée'}
          </h3>
          <span className="text-xs text-muted-foreground">v1.0.0</span>
        </div>
        
        <ToggleButton 
          isActive={isEnabled} 
          onToggle={onToggle} 
        />
        
        {/* Results summary - only show when we have results */}
        {isEnabled && isLoaded && !isAnalyzing && (
          <AnalysisResults 
            apples={apples} 
            onReanalyze={onReanalyze} 
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ControlPanel;
