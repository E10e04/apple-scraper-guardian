
import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import ProgressBar from './ProgressBar';
import AnalysisOverlay from './AnalysisOverlay';
import ControlPanel from './ControlPanel';
import { useGameAnalysis } from '@/hooks/useGameAnalysis';

interface GameMonitorProps {
  className?: string;
}

const GameMonitor = ({ className }: GameMonitorProps) => {
  const { gameState, handleToggle, startAnalysis } = useGameAnalysis();

  // Simulate detection of page refresh (for demo)
  // In a real extension, this would watch for navigation events or DOM changes
  useEffect(() => {
    // For demo purposes only - in a real extension this would detect actual
    // game state changes by observing the DOM or network requests
    const refreshInterval = setInterval(() => {
      // If enabled and not analyzing, occasionally "detect" a page refresh
      if (gameState.isEnabled && !gameState.isAnalyzing && Math.random() > 0.9) {
        console.log('Game refresh detected, starting new analysis...');
        toast.info('Mise à jour du jeu détectée', {
          description: 'Lancement d\'une nouvelle analyse...',
          duration: 3000
        });
        startAnalysis();
      }
    }, 15000); // Check every 15 seconds
    
    return () => clearInterval(refreshInterval);
  }, [gameState.isEnabled, gameState.isAnalyzing]);

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
        <ControlPanel 
          isEnabled={gameState.isEnabled}
          isLoaded={gameState.isLoaded}
          isAnalyzing={gameState.isAnalyzing}
          apples={gameState.apples}
          onToggle={handleToggle}
          onReanalyze={startAnalysis}
        />
      </AnimatePresence>
    </div>
  );
};

export default GameMonitor;
