import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Radio, Network } from 'lucide-react';
import type { Competitor } from '@/lib/types';

interface CompetitorCardProps {
  competitor: Competitor;
  onClick?: () => void;
  index?: number;
}

export default function CompetitorCard({ competitor, onClick, index = 0 }: CompetitorCardProps) {
  const TrendIcon = competitor.trend === 'up' ? TrendingUp : competitor.trend === 'down' ? TrendingDown : Minus;
  const trendColor = competitor.trend === 'up' ? 'text-sage-400' : competitor.trend === 'down' ? 'text-clay-400' : 'text-slate-400';

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative w-full text-left glass rounded-2xl p-5 transition-all hover:border-teal-500/20"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: '0 0 30px rgba(45,122,120,0.06)' }} />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.15), rgba(122,91,142,0.15))', border: '1px solid rgba(255,255,255,0.08)' }}>
            {competitor.name[0]}
          </div>
          <div>
            <div className="text-white font-semibold">{competitor.name}</div>
            <div className="text-xs text-slate-500">{competitor.industry}</div>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
          <TrendIcon className="w-3.5 h-3.5" strokeWidth={2} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-teal-400/70" strokeWidth={1.5} />
          <div>
            <div className="text-lg font-semibold text-white">{competitor.signalCount}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Signals</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Network className="w-3.5 h-3.5 text-plum-400/70" strokeWidth={1.5} />
          <div>
            <div className="text-lg font-semibold text-white">{competitor.patternCount}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Patterns</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="text-xs text-slate-400">
          <span className="text-slate-500">Last signal:</span> {competitor.lastActivity}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="text-xs text-slate-500">Intel Score</div>
          <div className="text-sm font-semibold text-teal-400">{competitor.intelligenceScore}</div>
        </div>
      </div>
    </motion.button>
  );
}
