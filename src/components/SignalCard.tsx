import { motion } from 'framer-motion';
import { SIGNAL_TYPE_META, IMPORTANCE_META, type Signal } from '@/lib/types';

interface SignalCardProps {
  signal: Signal;
  index?: number;
  onClick?: () => void;
}

export default function SignalCard({ signal, index = 0, onClick }: SignalCardProps) {
  const meta = SIGNAL_TYPE_META[signal.type];
  const impMeta = IMPORTANCE_META[signal.importance];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ x: 4 }}
      onClick={onClick}
      className="group relative glass rounded-xl p-4 cursor-pointer transition-all hover:border-white/10"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: meta.hex, boxShadow: `0 0 10px ${meta.hex}80` }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: `${meta.hex}15`, color: meta.hex, border: `1px solid ${meta.hex}30` }}>
              {meta.label}
            </span>
            <span className="text-xs text-slate-500">{signal.competitorName}</span>
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${impMeta.hex}15`, color: impMeta.hex }}>
              {impMeta.label}
            </span>
          </div>
          <div className="text-sm text-white font-medium mb-1">{signal.title}</div>
          <div className="text-xs text-slate-400 line-clamp-2">{signal.description}</div>
          <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
            <span>{new Date(signal.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <span>·</span>
            <span>{signal.source}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
