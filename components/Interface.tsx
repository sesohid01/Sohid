
import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, ChevronDown } from 'lucide-react';
import { soundManager } from '../services/soundManager';

const LuxurySection = ({ children, id, className }: { children?: React.ReactNode, id: string, className?: string }) => (
  <section 
    id={id} 
    className={`min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-24 py-24 relative z-10 ${className}`}
  >
    {children}
  </section>
);

const Interface: React.FC = () => {
  const handleHover = () => soundManager.playHover();
  const handleClick = () => soundManager.playClick();

  return (
    <div className="flex flex-col w-full overflow-hidden select-none">
      
      {/* Hero Section */}
      <LuxurySection id="home">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mono text-gold-text mb-6"
          >
            ESTABLISHED 2026 // STUDENT
          </motion.div>
          
          <h1 className="text-[12vw] md:text-[8vw] font-bold leading-tight gold-text tracking-tighter mb-4">
            SO HID
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-xl md:text-2xl font-light font-serif italic mb-12 px-4">
            A journey of learning, creativity, and digital exploration.
          </p>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center cursor-pointer"
            onClick={handleClick}
          >
            <ChevronDown size={32} className="text-gray-600" />
          </motion.div>
        </motion.div>
      </LuxurySection>

      {/* Bio Section */}
      <LuxurySection id="about">
        <div className="grid md:grid-cols-2 gap-20 items-center w-full max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-gold-text"></span>
              <span className="mono text-gold-text uppercase">My Profile</span>
            </div>
            
            <h2 className="text-6xl font-bold leading-none">
              Student. <br />
              <span className="font-serif italic font-light lowercase">Creative.</span> <br />
              Visionary.
            </h2>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
              <p>
                I am a student currently living in <span className="text-white font-medium">Joypurhat, Bangladesh</span>. I am passionate about how technology and design come together to create beautiful things.
              </p>
              <p>
                Even as a student, I spend my time exploring the digital world and learning how to build high-quality, impactful projects.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
               <div onMouseEnter={handleHover} className="px-6 py-2 glass rounded-full text-xs mono border-gold-text/20 cursor-default">LEARNER</div>
               <div onMouseEnter={handleHover} className="px-6 py-2 glass rounded-full text-xs mono border-gold-text/20 cursor-default">CREATIVE MIND</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square glass rounded-2xl overflow-hidden border border-white/10 group cursor-pointer" onClick={handleClick}>
              <img 
                src="https://lh3.googleusercontent.com/d/1ZJqe8LnB8KUTg43KHd3CpiJ02x_wClKq" 
                alt="SO Hid Profile" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                onError={(e) => { 
                  // Fallback to high-quality abstract if direct link fails
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop"; 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-700"></div>
              <div className="absolute bottom-10 left-10 translate-z-10">
                 <h3 className="text-2xl font-bold gold-text uppercase">SO HID</h3>
                 <p className="mono text-[10px]">LOC_JOYPURHAT // BANGLADESH</p>
              </div>
            </div>
          </motion.div>
        </div>
      </LuxurySection>

      {/* Facebook Link */}
      <LuxurySection id="facebook">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="w-full max-w-4xl text-center glass p-12 md:p-20 rounded-3xl border-gold-text/10"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-white/10">
            <Facebook size={32} className="text-gold-text" />
          </div>
          <h2 className="text-5xl font-bold mb-8">Follow My Journey</h2>
          <p className="text-gray-400 text-xl font-light mb-12 max-w-xl mx-auto italic font-serif">
            "Every step forward is a new discovery."
          </p>
          <a 
            href="https://www.facebook.com/profile.php?id=61583954032961" 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={handleHover}
            onClick={handleClick}
            className="inline-block bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#d4af37] transition-all hover:scale-105"
          >
            Visit Facebook Profile
          </a>
        </motion.div>
      </LuxurySection>

      {/* Footer / Contact */}
      <LuxurySection id="contact" className="min-h-[60vh]">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-7xl font-bold gold-text mb-10">SAY HI.</h2>
            <div className="flex gap-8 mb-10">
              <a href="#" onMouseEnter={handleHover} onClick={handleClick} className="text-gray-400 hover:text-white transition-colors"><Instagram size={24}/></a>
              <a href="https://www.facebook.com/profile.php?id=61583954032961" onMouseEnter={handleHover} onClick={handleClick} className="text-gray-400 hover:text-white transition-colors"><Facebook size={24}/></a>
              <a href="#" onMouseEnter={handleHover} onClick={handleClick} className="text-gray-400 hover:text-white transition-colors"><Twitter size={24}/></a>
            </div>
            <p className="text-gray-500 font-light text-sm max-w-sm">
              SO HID // Student & Learner from Joypurhat. Dedicated to personal growth and exploring the future of the digital world.
            </p>
          </div>
          
          <div className="flex flex-col justify-end items-end text-right">
            <a 
              href="https://www.facebook.com/profile.php?id=61583954032961" 
              onMouseEnter={handleHover}
              onClick={handleClick}
              className="text-4xl md:text-6xl font-bold hover:gold-text transition-all duration-500"
            >
              LET'S TALK
            </a>
            <div className="mt-20 mono text-[8px] flex flex-col items-end">
               <span>&copy; 2026 SO HID</span>
               <span className="text-gold-text">JOYPURHAT, BANGLADESH</span>
            </div>
          </div>
        </div>
      </LuxurySection>
    </div>
  );
};

export default Interface;
