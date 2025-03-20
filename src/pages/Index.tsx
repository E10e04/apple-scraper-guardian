
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import GameMonitor from '@/components/GameMonitor';

const Index = () => {
  // For demo purposes, fake the game environment
  const [gameActive, setGameActive] = useState(true);
  
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
            Apple of Fortune - Démo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-muted-foreground"
          >
            Simulation de l'environnement du jeu pour l'extension d'analyse
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center">
            {gameActive ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Game title */}
                <div className="absolute top-4 w-full text-center">
                  <div className="inline-block bg-red-600 text-white px-6 py-2 rounded-full font-bold">
                    Apple of Fortune
                  </div>
                </div>
                
                {/* Grid of rows with apples */}
                <div className="grid grid-rows-7 gap-6 w-4/5 h-4/5">
                  {Array.from({ length: 7 }).map((_, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="flex justify-center items-center space-x-4">
                      {Array.from({ length: 3 + (rowIndex % 2) }).map((_, colIndex) => (
                        <div
                          key={`apple-${rowIndex}-${colIndex}`}
                          className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-gray-200 hover:border-gray-300 transition-colors"
                        >
                          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-3 bg-green-800 absolute -top-1 rounded-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                
                {/* Game controls */}
                <div className="absolute bottom-4 w-full flex justify-center space-x-4">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
                    Encaisser
                  </button>
                  <div className="px-4 py-2 bg-gray-100 rounded-md shadow-md">
                    Mise: 100€
                  </div>
                  <div className="px-4 py-2 bg-yellow-100 rounded-md shadow-md">
                    Gain Potentiel: 350€
                  </div>
                </div>
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
            <li>Les pommes avec un "✓" vert sont gagnantes, celles avec un "×" rouge sont perdantes</li>
            <li>Consultez les statistiques détaillées dans le panneau d'information</li>
          </ol>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md text-blue-700 text-sm">
            <p className="font-medium mb-1">Note importante</p>
            <p>
              Ceci est une démonstration de l'extension. Dans un environnement réel, l'extension analyserait 
              automatiquement le code source du jeu à chaque fois que la page est actualisée, en utilisant des 
              techniques d'inspection du DOM et d'analyse du code JavaScript pour déterminer les positions gagnantes.
            </p>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-md text-yellow-700 text-sm">
            <p className="font-medium mb-1">Installation en tant qu'extension Chrome</p>
            <p>
              Pour installer cette application en tant qu'extension Chrome:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Téléchargez le code source complet</li>
              <li>Exécutez <code>npm run build</code> pour créer la version de production</li>
              <li>Ouvrez Chrome et accédez à chrome://extensions/</li>
              <li>Activez le "Mode développeur" en haut à droite</li>
              <li>Cliquez sur "Charger l'extension non empaquetée" et sélectionnez le dossier <code>dist</code></li>
              <li>L'extension est maintenant installée et prête à analyser le jeu Apple of Fortune</li>
            </ol>
          </div>
        </motion.div>
      </div>
      
      {/* The Game Monitor component that would be injected into the page */}
      {gameActive && <GameMonitor />}
    </div>
  );
};

export default Index;
