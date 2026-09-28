import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import type { IntelligenceBrief } from '@/lib/types';
import { CONFIDENCE_META } from '@/lib/types';

interface IntelligenceBriefCardProps {
  brief: IntelligenceBrief;
  index?: number;
}

export default function IntelligenceBriefCard({ brief, index = 0 }: IntelligenceBriefCardProps) {
  const [expanded, setExpanded] = useState(false);
  const conf = CONFIDENCE_META[brief.confidence];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative glass-strong rounded-2xl p-6 overflow-hidden"
      style={{ border: '1px solid rgba(45,122,120,0.12)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #2D7A78, #7A5B8E, transparent)' }} />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(45,122,120,0.1)', border: '1px solid rgba(45,122,120,0.2)' }}>
            <Shield className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-teal-400 font-medium">Intelligence Brief</div>
            <div className="text-xs text-slate-500">{brief.competitorName}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Confidence</div>
          <div className="text-sm font-semibold" style={{ color: conf.hex }}>{conf.label}</div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-4">{brief.title}</h3>

      <div className="mb-4">
        <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Evidence</div>
        <div className="space-y-1.5">
          {brief.evidence.map((ev, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-sage-400/70" strokeWidth={1.5} />
              <span>{ev}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
        <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Why this matters</div>
        <div className="text-sm text-slate-300">{brief.why}</div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-bronze-400" strokeWidth={1.5} />
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500">Strategic Signal</div>
          <div className="text-sm text-amber-300">{brief.strategicSignal}</div>
        </div>
      </div>

      <button onClick={() => setExpanded(!expanded)} className="text-xs text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1">
        <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
        {expanded ? 'Hide' : 'Why did Mindra generate this insight?'}
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-white/5"
        >
          <div className="text-xs text-slate-400 mb-2">Pattern similarity: {brief.patternMatch}%</div>
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${brief.patternMatch}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #2D7A78, #7A5B8E)' }}
            />
          </div>
          <div className="text-xs text-slate-500 italic">
            Pattern similarity is not a prediction of certainty. It indicates how closely current signals match a previously observed sequence.
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

