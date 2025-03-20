
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import GameMonitor from '@/components/GameMonitor';
import { Apple } from '@/utils/gameAnalyzer';

const Index = () => {
  // For demo purposes, fake the game environment
  const [gameActive, setGameActive] = useState(true);
  
  // Simulated banner for Apple of Fortune game
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Toaster />
      
      {/* Simulated Game Environment */}
      <div className="relative w-full max-w-6xl mx-auto p-6 pt-16">
        <header className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-medium mb-2"
          >
            Analyse de Sécurité - Demo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-muted-foreground"
          >
            Visualisation de l'environnement Apple of Fortune
          </motion.p>
        </header>
        
        {/* Simulated Game Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative w-full aspect-video bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Game Canvas */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center justify-center">
            {gameActive ? (
              <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                {/* Visual representation of the game */}
                <div className="absolute w-[500px] h-[500px] rounded-full border-4 border-dashed border-gray-200 animate-spin-slow" style={{ animationDuration: "120s" }}></div>
                <div className="absolute w-[400px] h-[400px] rounded-full border-2 border-dashed border-gray-200 animate-spin-slow" style={{ animationDuration: "90s" }}></div>
                <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-gray-200 animate-spin-slow" style={{ animationDuration: "60s" }}></div>
                
                {/* Game elements that would be present in real game */}
                <div className="relative z-10 w-40 h-40 bg-red-500 rounded-full flex items-center justify-center shadow-xl">
                  <div className="text-white font-bold text-lg">Apple of Fortune</div>
                </div>
                
                {/* Placeholders for apples that would be dynamically positioned */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
                    style={{
                      left: `${50 + 35 * Math.cos(i * Math.PI / 4)}%`,
                      top: `${50 + 35 * Math.sin(i * Math.PI / 4)}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="w-6 h-6 bg-red-400 rounded-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 max-w-md">
                <h3 className="text-xl font-medium mb-4">Jeu non détecté</h3>
                <p className="text-muted-foreground mb-6">
                  Accédez au jeu Apple of Fortune pour activer l'analyse.
                </p>
                <button 
                  onClick={() => setGameActive(true)}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Simuler le jeu
                </button>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-medium mb-4">Comment utiliser l'extension</h2>
          <ol className="space-y-2 list-decimal list-inside text-gray-700">
            <li>Naviguez vers le jeu "Apple of Fortune" sur la plateforme 1xbet</li>
            <li>Activez l'analyse en utilisant le bouton situé en bas à droite</li>
            <li>Patientez pendant l'analyse du code source et du jeu</li>
            <li>Une fois l'analyse terminée, les marqueurs vont apparaître sur les pommes</li>
            <li>Les pommes avec un "+" vert sont gagnantes, celles avec un "×" rouge sont perdantes</li>
          </ol>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md text-blue-700 text-sm">
            <p className="font-medium mb-1">Note importante</p>
            <p>
              Ceci est une démonstration de l'extension. Dans un environnement réel, l'extension analyserait 
              automatiquement le code source du jeu à chaque fois que la page est actualisée.
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* The Game Monitor component that would be injected into the page */}
      {gameActive && <GameMonitor />}
    </div>
  );
};

export default Index;
