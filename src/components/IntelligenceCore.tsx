import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const cycleWords = ['SIGNAL', 'MEMORY', 'PATTERN', 'INSIGHT'];

const floatingCards = [
  { text: '12 new healthcare jobs', delay: 0, side: 'left' },
  { text: 'Messaging shift detected', delay: 1.5, side: 'right' },
  { text: 'Previous launch pattern matched', delay: 3, side: 'left' },
  { text: 'Strategic pattern detected', delay: 4.5, side: 'right' },
  { text: 'Possible healthcare expansion', delay: 6, side: 'left' },
];

export default function IntelligenceCore() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % cycleWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(45,122,120,0.3) 0%, transparent 60%)' }} />

      {/* Orbital rings */}
      <div className="absolute inset-[8%] rounded-full border border-teal-500/10 animate-spin-slow" />
      <div className="absolute inset-[18%] rounded-full border border-plum-500/10 animate-spin-reverse-slow" />
      <div className="absolute inset-[28%] rounded-full border border-steel-500/15 animate-spin-slow" style={{ animationDuration: '45s' }} />

      {/* Dashed orbit */}
      <svg className="absolute inset-[5%] animate-spin-slow" style={{ animationDuration: '60s' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(45,122,120,0.08)" strokeWidth="0.3" strokeDasharray="2 4" />
      </svg>

      {/* Orbiting nodes */}
      <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '20s' }}>
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-teal-400" style={{ boxShadow: '0 0 12px rgba(45,122,120,0.8)' }} />
      </div>
      <div className="absolute inset-0 animate-spin-reverse-slow" style={{ animationDuration: '25s' }}>
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-2 h-2 rounded-full bg-plum-400" style={{ boxShadow: '0 0 10px rgba(122,91,142,0.8)' }} />
      </div>
      <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '30s' }}>
        <div className="absolute bottom-[10%] left-[15%] w-1.5 h-1.5 rounded-full bg-steel-400" style={{ boxShadow: '0 0 8px rgba(71,115,154,0.8)' }} />
      </div>

      {/* Core */}
      <div className="absolute inset-[35%] rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, rgba(45,122,120,0.15) 0%, rgba(122,91,142,0.1) 70%, transparent 100%)', border: '1px solid rgba(45,122,120,0.15)' }}>
        <div className="text-center">
          <motion.div
            key={wordIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold tracking-[0.2em] text-teal-400"
          >
            {cycleWords[wordIndex]}
          </motion.div>
          <div className="text-[10px] tracking-[0.15em] text-slate-500 mt-1">MEMORY</div>
        </div>
      </div>

      {/* Pulse rings */}
      <div className="absolute inset-[35%] rounded-full border border-teal-500/20" style={{ animation: 'pulse-ring 3s ease-out infinite' }} />
      <div className="absolute inset-[35%] rounded-full border border-plum-500/20" style={{ animation: 'pulse-ring 3s ease-out infinite 1.5s' }} />

      {/* Floating intelligence cards */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: card.side === 'left' ? -30 : 30, y: 10 }}
          animate={{ opacity: [0, 1, 1, 0], x: card.side === 'left' ? -30 : 30, y: 10 }}
          transition={{ duration: 3, delay: card.delay, repeat: Infinity, repeatDelay: 4.5 }}
          className={`absolute top-[${20 + i * 15}%] ${card.side === 'left' ? 'left-0' : 'right-0'} hidden md:block`}
        >
          <div className="glass px-3 py-2 rounded-lg text-xs text-slate-300 whitespace-nowrap" style={{ borderColor: 'rgba(45,122,120,0.15)' }}>
            {card.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
