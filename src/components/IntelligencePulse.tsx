import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Network } from 'lucide-react';

export default function IntelligencePulse() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 group"
      >
        <div className="relative w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.2), rgba(122,91,142,0.2))', border: '1px solid rgba(45,122,120,0.3)' }}>
          <div className="absolute inset-0 rounded-full border border-teal-500/30" style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
          <div className="absolute inset-0 rounded-full border border-plum-500/30" style={{ animation: 'pulse-ring 2s ease-out infinite 1s' }} />
          <Zap className="w-6 h-6 text-teal-400" strokeWidth={1.5} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-40 w-80 glass-strong rounded-2xl p-5"
            style={{ border: '1px solid rgba(45,122,120,0.15)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #2D7A78, #7A5B8E, transparent)' }} />

            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(45,122,120,0.8)' }} />
              <span className="text-xs uppercase tracking-wider text-teal-400 font-medium">Mindra Intelligence Pulse</span>
            </div>

            <div className="text-sm text-white mb-4">3 new signals connected.</div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <div className="w-2 h-2 rounded-full bg-plum-400" />
                Hiring increase
              </div>
              <div className="ml-3 text-slate-500 text-xs">↓</div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <div className="w-2 h-2 rounded-full bg-bronze-400" />
                Messaging shift
              </div>
              <div className="ml-3 text-slate-500 text-xs">↓</div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <div className="w-2 h-2 rounded-full bg-steel-400" />
                Product activity
              </div>
              <div className="ml-3 text-slate-500 text-xs">↓</div>
              <div className="flex items-center gap-2 text-xs text-plum-300 font-medium pt-2 border-t border-white/5">
                <Network className="w-3.5 h-3.5 text-plum-400" strokeWidth={1.5} />
                Emerging pattern detected.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

