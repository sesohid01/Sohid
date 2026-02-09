
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import Experience from './components/Experience';
import Interface from './components/Interface';
import { soundManager } from './services/soundManager';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure loading screen stays long enough for assets to initialize
    const timer = setTimeout(() => setLoading(false), 2500);
    
    let lastTick = 0;
    const handleGlobalInteraction = () => {
      const now = performance.now();
      if (now - lastTick > 50) {
        soundManager.playTick();
        lastTick = now;
      }
    };

    window.addEventListener('mousedown', handleGlobalInteraction, { passive: true });
    window.addEventListener('touchstart', handleGlobalInteraction, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousedown', handleGlobalInteraction);
      window.removeEventListener('touchstart', handleGlobalInteraction);
    };
  }, []);

  return (
    <main className="h-screen w-full bg-[#050505] relative overflow-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[100]"
          >
            <div className="w-32 h-[1px] bg-white/5 mb-10 relative overflow-hidden">
               <motion.div 
                 initial={{ x: '-100%' }}
                 animate={{ x: '100%' }}
                 transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                 className="absolute inset-0 bg-[#d4af37]"
               />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <p className="text-[#d4af37] tracking-[1.5em] font-light text-[9px] uppercase pl-[1.5em]">
                SO HID
              </p>
              <p className="text-white/20 tracking-[0.2em] font-mono text-[7px] uppercase">
                Optimizing Engine...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0">
        <Canvas 
          shadows={false} 
          // Cap DPR for performance, use AdaptiveDpr to scale down if needed
          dpr={[1, 2]} 
          camera={{ position: [0, 0, 10], fov: 45 }}
          performance={{ min: 0.5 }} 
          gl={{ 
            antialias: false, // Turn off for massive FPS boost, resolution handles it
            alpha: true, 
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            precision: "lowp", // Vital for older/mobile GPUs
            failIfMajorPerformanceCaveat: false // Prevents black screen on low-end hardware
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#050505');
          }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Suspense fallback={null}>
            <ScrollControls pages={4} damping={0.12} infinite={false}>
              <Experience />
              <Scroll html>
                <div className="w-screen">
                  <Interface />
                </div>
              </Scroll>
            </ScrollControls>
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Persistent Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 z-[60] flex justify-between items-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto cursor-pointer group" 
          onClick={() => soundManager.playClick()}
        >
          <span className="font-bold tracking-[0.5em] text-xs text-white group-hover:text-[#d4af37] transition-all duration-300">SO HID</span>
          <div className="h-[1px] w-0 group-hover:w-full bg-[#d4af37] transition-all duration-500 mt-1"></div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto flex gap-8 items-center"
        >
           <a href="#about" onMouseEnter={() => soundManager.playHover()} className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-[#d4af37] transition-colors">About</a>
           <a href="#facebook" onMouseEnter={() => soundManager.playHover()} className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-[#d4af37] transition-colors">Facebook</a>
        </motion.div>
      </nav>

      {/* Cinematic Vignette Overlay - pointer-events-none is crucial */}
      <div className="fixed inset-0 pointer-events-none z-[55] shadow-[inset_0_0_15vw_rgba(0,0,0,0.9)] opacity-80"></div>
    </main>
  );
};

export default App;
