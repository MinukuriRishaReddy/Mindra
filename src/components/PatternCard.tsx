import { motion } from 'framer-motion';
import { Network, Calendar, GitBranch, TrendingUp } from 'lucide-react';
import type { Pattern } from '@/lib/types';
import { CONFIDENCE_META } from '@/lib/types';

interface PatternCardProps {
  pattern: Pattern;
  index?: number;
  onReplay?: () => void;
}

export default function PatternCard({ pattern, index = 0, onReplay }: PatternCardProps) {
  const conf = CONFIDENCE_META[pattern.confidence];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative glass rounded-2xl p-5 transition-all hover:border-plum-500/20"
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{ background: 'radial-gradient(circle, #7A5B8E, transparent 70%)' }} />

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(122,91,142,0.1)', border: '1px solid rgba(122,91,142,0.2)' }}>
            <Network className="w-4 h-4 text-plum-400" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-plum-400">Pattern Detected</div>
            <div className="text-xs text-slate-500">{pattern.competitorName}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Confidence</div>
          <div className="text-sm font-semibold" style={{ color: conf.hex }}>{conf.label}</div>
        </div>
      </div>

      <h3 className="text-base font-semibold text-white mb-2">{pattern.name}</h3>
      <p className="text-sm text-slate-400 mb-4">{pattern.description}</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Frequency</div>
          <div className="text-sm text-white font-medium">{pattern.frequency}×</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">First Seen</div>
          <div className="text-sm text-white font-medium">{new Date(pattern.firstObserved).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Last Seen</div>
          <div className="text-sm text-white font-medium">{new Date(pattern.lastObserved).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Pattern Similarity</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pattern.patternMatch}%` }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #7A5B8E, #2D7A78)' }}
            />
          </div>
          <span className="text-xs text-slate-400 font-medium">{pattern.patternMatch}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-xs text-amber-300">
          <TrendingUp className="w-3.5 h-3.5" strokeWidth={1.5} />
          {pattern.strategicSignal}
        </div>
        {onReplay && (
          <button onClick={onReplay} className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 transition-colors px-2.5 py-1.5 rounded-lg border border-teal-500/20 hover:bg-teal-500/10">
            <GitBranch className="w-3.5 h-3.5" strokeWidth={1.5} />
            Replay Pattern
          </button>
        )}
      </div>
    </motion.div>
  );
}
