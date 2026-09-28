import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface IntroProps {
  onGetStarted: () => void;
}

const orbitWords = ['SIGNALS', 'MEMORY', 'PATTERNS', 'FORECAST', 'STRATEGY'];

export default function Intro({ onGetStarted }: IntroProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Core animation */}
      <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] mb-12">
        <div className="absolute inset-0 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(45,122,120,0.3) 0%, transparent 60%)' }} />
        <div className="absolute inset-[5%] rounded-full border border-teal-500/10 animate-spin-slow" />
        <div className="absolute inset-[15%] rounded-full border border-plum-500/10 animate-spin-reverse-slow" />
        <div className="absolute inset-[25%] rounded-full border border-steel-500/15 animate-spin-slow" style={{ animationDuration: '45s' }} />
        <svg className="absolute inset-[3%] animate-spin-slow" style={{ animationDuration: '60s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(45,122,120,0.08)" strokeWidth="0.3" strokeDasharray="2 4" />
        </svg>

        {/* Orbiting words */}
        {orbitWords.map((word, i) => {
          const angle = (i / orbitWords.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 42;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <motion.div
              key={word}
              className="absolute text-xs font-bold tracking-wider"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', color: ['#2D7A78', '#47739A', '#7A5B8E', '#4B6E58', '#B9783B'][i] }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, delay: i * 0.6, repeat: Infinity }}
            >
              {word}
            </motion.div>
          );
        })}

        {/* Center */}
        <div className="absolute inset-[35%] rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, rgba(45,122,120,0.2) 0%, rgba(122,91,142,0.1) 70%, transparent 100%)', border: '1px solid rgba(45,122,120,0.2)' }}>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }} className="text-center">
            <div className="text-lg font-bold tracking-[0.3em] text-teal-400">MINDRA</div>
          </motion.div>
        </div>
        <div className="absolute inset-[35%] rounded-full border border-teal-500/20" style={{ animation: 'pulse-ring 3s ease-out infinite' }} />
        <div className="absolute inset-[35%] rounded-full border border-plum-500/20" style={{ animation: 'pulse-ring 3s ease-out infinite 1.5s' }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
          THE AI THAT <span className="text-gradient-cyan">REMEMBERS.</span>
        </h1>
        <h2 className="text-xl sm:text-2xl text-slate-400 font-medium mb-6">From Signals to Strategy.</h2>
        <p className="text-slate-400 leading-relaxed mb-10 max-w-lg mx-auto">
          Mindra transforms fragmented market, competitor, geographic and business signals into persistent intelligence, behavioral patterns, forecasts and strategic insights.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGetStarted}
          className="group relative px-8 py-4 rounded-xl text-base font-medium text-white overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.2), rgba(122,91,142,0.2))', border: '1px solid rgba(45,122,120,0.3)' }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
            GET STARTED
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.3), rgba(122,91,142,0.3))' }} />
        </motion.button>
      </motion.div>
    </div>
  );
}
