
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ToggleButton from './ToggleButton';
import ProgressBar from './ProgressBar';
import AnalysisOverlay from './AnalysisOverlay';
import { analyzeGameData, Apple, GameState } from '@/utils/gameAnalyzer';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface GameMonitorProps {
  className?: string;
}

const GameMonitor = ({ className }: GameMonitorProps) => {
  const [gameState, setGameState] = useState<GameState>({
    apples: [],
    isAnalyzing: false,
    analysisProgress: 0,
    isLoaded: false,
    isEnabled: false
  });

  const handleToggle = () => {
    if (gameState.isAnalyzing) return; // Prevent toggle during analysis
    
    setGameState(prev => {
      const isEnabled = !prev.isEnabled;
      
      // If we're turning it on, start the analysis
      if (isEnabled && !prev.isAnalyzing && prev.apples.length === 0) {
        startAnalysis();
      }
      
      return { ...prev, isEnabled };
    });
  };

  const startAnalysis = async () => {
    // Reset state for a new analysis
    setGameState(prev => ({
      ...prev,
      isAnalyzing: true,
      analysisProgress: 0,
      apples: []
    }));
    
    try {
      // Begin the analysis
      const results = await analyzeGameData((progress) => {
        setGameState(prev => ({
          ...prev,
          analysisProgress: progress
        }));
      });
      
      // Update with results
      setGameState(prev => ({
        ...prev,
        apples: results,
        isAnalyzing: false,
        analysisProgress: 100,
        isLoaded: true
      }));
    } catch (error) {
      console.error('Analysis failed:', error);
      setGameState(prev => ({
        ...prev,
        isAnalyzing: false,
        analysisProgress: 0
      }));
    }
  };

  // Simulate detection of page refresh (for demo)
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      // If enabled and not analyzing, occasionally "detect" a page refresh
      if (gameState.isEnabled && !gameState.isAnalyzing && Math.random() > 0.9) {
        console.log('Game refresh detected, starting new analysis...');
        startAnalysis();
      }
    }, 15000); // Check every 15 seconds
    
    return () => clearInterval(refreshInterval);
  }, [gameState.isEnabled, gameState.isAnalyzing]);

  // Count the good and bad apples
  const goodApples = gameState.apples.filter(apple => apple.type === 'good').length;
  const badApples = gameState.apples.filter(apple => apple.type === 'bad').length;

  return (
    <div className={cn('relative', className)}>
      {/* Progress bar - only visible during analysis */}
      <ProgressBar 
        progress={gameState.analysisProgress} 
        isVisible={gameState.isAnalyzing}
        message={`Analyse du jeu Apple of Fortune en cours...`}
      />
      
      {/* Analysis overlay - displays the markers */}
      <AnalysisOverlay 
        apples={gameState.apples} 
        isVisible={gameState.isEnabled && gameState.isLoaded && !gameState.isAnalyzing} 
      />
      
      {/* Controls panel */}
      <AnimatePresence>
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
              gameState.isEnabled ? "border-primary/30" : "border-gray-200"
            )}
          >
            <h3 className="text-sm font-medium text-center">
              {gameState.isEnabled ? 'Analyse Activée' : 'Analyse Désactivée'}
            </h3>
            
            <ToggleButton 
              isActive={gameState.isEnabled} 
              onToggle={handleToggle} 
            />
            
            {/* Results summary - only show when we have results */}
            {gameState.isEnabled && gameState.isLoaded && !gameState.isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full pt-3 border-t text-xs space-y-2"
              >
                <h4 className="font-medium flex items-center gap-1">
                  <Info size={14} className="text-blue-500" />
                  Résultat de l'analyse
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-apple-good" />
                    <span>{goodApples} pommes gagnantes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertCircle size={14} className="text-apple-bad" />
                    <span>{badApples} pommes perdantes</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GameMonitor;
