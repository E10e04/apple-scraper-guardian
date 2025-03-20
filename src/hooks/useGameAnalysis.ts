
import { useState } from 'react';
import { analyzeGameData, Apple, GameState } from '@/utils/gameAnalyzer';
import { toast } from 'sonner';

export function useGameAnalysis() {
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

  return {
    gameState,
    handleToggle,
    startAnalysis
  };
}
