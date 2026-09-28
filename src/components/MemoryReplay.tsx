import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface ReplayStep {
  label: string;
  month: string;
  color: string;
}

interface MemoryReplayProps {
  steps?: ReplayStep[];
  trigger?: number;
}

const defaultSteps: ReplayStep[] = [
  { label: 'Hiring', month: 'JAN', color: '#7A5B8E' },
  { label: 'Messaging', month: 'FEB', color: '#B9783B' },
  { label: 'Product', month: 'MAR', color: '#47739A' },
  { label: 'Market Expansion', month: 'APR', color: '#4B6E58' },
];

export default function MemoryReplay({ steps = defaultSteps, trigger = 0 }: MemoryReplayProps) {
  const [playing, setPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (trigger > 0) play();
  }, [trigger]);

  function play() {
    setPlaying(true);
    setActiveStep(-1);
    steps.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), (i + 1) * 800);
    });
    setTimeout(() => {
      setActiveStep(steps.length);
      setTimeout(() => setPlaying(false), 2000);
    }, (steps.length + 1) * 800);
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-plum-400 font-medium mb-1">Memory Replay</div>
          <h3 className="text-lg font-semibold text-white">Replay Historical Pattern</h3>
        </div>
        <button
          onClick={play}
          disabled={playing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, rgba(122,91,142,0.2), rgba(45,122,120,0.2))', border: '1px solid rgba(122,91,142,0.25)' }}
        >
          <Play className="w-4 h-4" strokeWidth={1.5} />
          Replay Pattern
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-1">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-1 w-full sm:w-auto">
            <motion.div
              animate={{
                scale: activeStep >= i ? 1 : 0.85,
                opacity: activeStep >= i ? 1 : 0.4,
              }}
              transition={{ duration: 0.4 }}
              className="flex-1 sm:flex-initial glass rounded-xl px-4 py-3 text-center min-w-[100px]"
              style={activeStep >= i ? { borderColor: `${step.color}40`, boxShadow: `0 0 20px ${step.color}15` } : {}}
            >
              <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">{step.month}</div>
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: step.color, boxShadow: activeStep >= i ? `0 0 8px ${step.color}` : 'none' }} />
                <span className="text-sm font-medium text-white">{step.label}</span>
              </div>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="hidden sm:block w-6 h-px relative">
                <div className="absolute inset-0 bg-white/5" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: activeStep > i ? '100%' : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(90deg, ${step.color}, ${steps[i + 1].color})` }}
                />
              </div>
            )}
            {i < steps.length - 1 && <div className="sm:hidden text-slate-600 text-center text-xs">↓</div>}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeStep >= steps.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-3 rounded-xl bg-plum-500/10 border border-plum-500/20 text-sm text-plum-300 flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-plum-400 animate-pulse" />
            Similar sequence detected today.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
