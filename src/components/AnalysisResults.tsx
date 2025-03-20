
import React from 'react';
import { motion } from 'framer-motion';
import { Apple } from '@/utils/gameAnalyzer';
import { CheckCircle2, AlertCircle, AlertTriangle, Zap, Info } from 'lucide-react';

interface AnalysisResultsProps {
  apples: Apple[];
  onReanalyze: () => void;
}

const AnalysisResults = ({ apples, onReanalyze }: AnalysisResultsProps) => {
  // Count the good and bad apples
  const goodApples = apples.filter(apple => apple.type === 'good');
  const badApples = apples.filter(apple => apple.type === 'bad');
  
  // Calculate win probability
  const winProbability = apples.length > 0 
    ? Math.round((goodApples.length / apples.length) * 100) 
    : 0;
  
  // Get the highest multiplier
  const highestMultiplier = goodApples.reduce((max, apple) => 
    Math.max(max, apple.multiplier || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="w-full pt-3 border-t text-xs space-y-3"
    >
      <h4 className="font-medium flex items-center gap-1">
        <Info size={14} className="text-blue-500" />
        Résultat de l'analyse
      </h4>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <CheckCircle2 size={14} className="text-apple-good" />
            <span>Pommes gagnantes</span>
          </div>
          <span className="font-semibold">{goodApples.length}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <AlertCircle size={14} className="text-apple-bad" />
            <span>Pommes perdantes</span>
          </div>
          <span className="font-semibold">{badApples.length}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <AlertTriangle size={14} className="text-yellow-500" />
            <span>Probabilité de gagner</span>
          </div>
          <span className="font-semibold">{winProbability}%</span>
        </div>
        
        {highestMultiplier > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Zap size={14} className="text-purple-500" />
              <span>Multiplicateur max</span>
            </div>
            <span className="font-semibold">x{highestMultiplier.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <button
        onClick={onReanalyze}
        className="w-full mt-2 py-1.5 px-3 text-xs bg-primary/20 hover:bg-primary/30 text-primary rounded-md transition-colors"
      >
        Analyser à nouveau
      </button>
    </motion.div>
  );
};

export default AnalysisResults;
