
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ToggleButton from './ToggleButton';
import ProgressBar from './ProgressBar';
import AnalysisOverlay from './AnalysisOverlay';
import { analyzeGameData, Apple, GameState, analyzeRealGameSource } from '@/utils/gameAnalyzer';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, Zap } from 'lucide-react';
import { toast } from 'sonner';

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
        toast.success('Analyse activée', {
          description: 'L\'extension va analyser le jeu Apple of Fortune',
          duration: 3000
        });
      } else if (!isEnabled) {
        toast.info('Analyse désactivée', {
          description: 'Les résultats d\'analyse ont été masqués',
          duration: 3000
        });
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
    
    // In a real extension, this would call analyzeRealGameSource()
    // But for our demo, we'll use the mock function
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
      
      toast.success('Analyse terminée', {
        description: `${results.filter(a => a.type === 'good').length} pommes gagnantes identifiées`,
        duration: 5000
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      setGameState(prev => ({
        ...prev,
        isAnalyzing: false,
        analysisProgress: 0
      }));
      
      toast.error('Échec de l\'analyse', {
        description: 'Impossible d\'analyser le jeu. Veuillez réessayer.',
        duration: 5000
      });
    }
  };

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

  // Count the good and bad apples
  const goodApples = gameState.apples.filter(apple => apple.type === 'good');
  const badApples = gameState.apples.filter(apple => apple.type === 'bad');
  
  // Calculate win probability
  const winProbability = gameState.apples.length > 0 
    ? Math.round((goodApples.length / gameState.apples.length) * 100) 
    : 0;
  
  // Get the highest multiplier
  const highestMultiplier = goodApples.reduce((max, apple) => 
    Math.max(max, apple.multiplier || 0), 0);

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
            <div className="flex items-center justify-between w-full">
              <Zap className={cn(
                "w-5 h-5 mr-2", 
                gameState.isEnabled ? "text-primary" : "text-muted-foreground"
              )} />
              <h3 className="text-sm font-medium flex-1">
                {gameState.isEnabled ? 'Analyse Activée' : 'Analyse Désactivée'}
              </h3>
              <span className="text-xs text-muted-foreground">v1.0.0</span>
            </div>
            
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
                  onClick={startAnalysis}
                  className="w-full mt-2 py-1.5 px-3 text-xs bg-primary/20 hover:bg-primary/30 text-primary rounded-md transition-colors"
                >
                  Analyser à nouveau
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GameMonitor;
