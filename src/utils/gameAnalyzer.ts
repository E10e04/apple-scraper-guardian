
// Types to represent game elements
export type AppleType = 'good' | 'bad';

export interface Apple {
  id: string;
  type: AppleType;
  position: { x: number; y: number };
  value?: number;
}

export interface GameState {
  apples: Apple[];
  isAnalyzing: boolean;
  analysisProgress: number;
  isLoaded: boolean;
  isEnabled: boolean;
}

// Mock data generation for demo purposes
export const generateMockGameData = (): Apple[] => {
  const apples: Apple[] = [];
  
  // Generate some random apples
  const totalApples = 15 + Math.floor(Math.random() * 10); // 15-24 apples
  const goodAppleCount = Math.ceil(totalApples * 0.3); // ~30% good apples
  
  for (let i = 0; i < totalApples; i++) {
    const isGood = i < goodAppleCount;
    
    apples.push({
      id: `apple-${i}`,
      type: isGood ? 'good' : 'bad',
      position: {
        x: 5 + Math.random() * 90, // 5-95% of width
        y: 5 + Math.random() * 90  // 5-95% of height
      },
      value: isGood ? Math.ceil(Math.random() * 10) : undefined
    });
  }
  
  return apples;
};

// Simulate the analysis process
export const analyzeGameData = async (
  onProgress: (progress: number) => void
): Promise<Apple[]> => {
  console.log('Starting game analysis...');
  
  // Simulate a multi-stage analysis process
  const stages = [
    { label: 'Initializing analyzer...', duration: 300 },
    { label: 'Scraping game source code...', duration: 800 },
    { label: 'Identifying apple elements...', duration: 600 },
    { label: 'Analyzing game mechanics...', duration: 700 },
    { label: 'Classifying apple types...', duration: 500 },
    { label: 'Finalizing results...', duration: 400 }
  ];
  
  // Total duration to use for progress calculation
  const totalDuration = stages.reduce((sum, stage) => sum + stage.duration, 0);
  let elapsedTime = 0;
  
  // Process each stage sequentially
  for (const stage of stages) {
    console.log(stage.label);
    
    // Update progress at start of stage
    onProgress((elapsedTime / totalDuration) * 100);
    
    // Simulate the work with a delay
    await new Promise(resolve => setTimeout(resolve, stage.duration));
    
    elapsedTime += stage.duration;
    
    // Update progress at end of stage
    onProgress((elapsedTime / totalDuration) * 100);
  }
  
  // Generate mock result data
  const result = generateMockGameData();
  console.log('Analysis completed. Found', result.length, 'apples');
  
  return result;
};
