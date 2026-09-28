import { motion } from 'framer-motion';
import { ArrowLeft, Radio, Network, FileText, Brain, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useState } from 'react';
import SignalCard from '@/components/SignalCard';
import PatternCard from '@/components/PatternCard';
import IntelligenceBriefCard from '@/components/IntelligenceBriefCard';
import MemoryReplay from '@/components/MemoryReplay';
import { useStore, getSignalsByCompetitor, getPatternsByCompetitor, getBriefsByCompetitor } from '@/lib/store';
import { SIGNAL_TYPE_META, type SignalType } from '@/lib/types';

interface CompetitorDetailProps {
  competitorId: string;
  onNavigate: (route: string) => void;
}

export default function CompetitorDetail({ competitorId, onNavigate }: CompetitorDetailProps) {
  const { competitors, signals, patterns, briefs } = useStore();
  const [replayTrigger, setReplayTrigger] = useState(0);
  const competitor = competitors.find((c) => c.id === competitorId);

  if (!competitor) {
    return (
      <div className="relative z-10 pt-32 px-6 max-w-4xl mx-auto text-center">
        <p className="text-slate-400 mb-4">Competitor not found.</p>
        <button onClick={() => onNavigate('/competitors')} className="text-teal-400">← Back to Competitors</button>
      </div>
    );
  }

  const compSignals = getSignalsByCompetitor(signals, competitorId);
  const compPatterns = getPatternsByCompetitor(patterns, competitorId);
  const compBriefs = getBriefsByCompetitor(briefs, competitorId);
  const TrendIcon = competitor.trend === 'up' ? TrendingUp : competitor.trend === 'down' ? TrendingDown : Minus;
  const trendColor = competitor.trend === 'up' ? 'text-sage-400' : competitor.trend === 'down' ? 'text-clay-400' : 'text-slate-400';

  return (
    <div className="relative z-10 pt-32 pb-12 px-6 max-w-6xl mx-auto">
      <button onClick={() => onNavigate('/competitors')} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
        Back to Competitors
      </button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.15), rgba(122,91,142,0.15))', border: '1px solid rgba(255,255,255,0.08)' }}>
              {competitor.name[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{competitor.name}</h1>
              <p className="text-sm text-slate-500">Competitive Intelligence Profile</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                <span>{competitor.website}</span>
                <span>·</span>
                <span>{competitor.industry}</span>
                <span>·</span>
                <span>{competitor.region}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-400">{competitor.signalCount}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Signals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-plum-400">{competitor.patternCount}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Patterns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{competitor.intelligenceScore}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Intel Score</div>
            </div>
            <div className={`flex items-center gap-1 ${trendColor}`}>
              <TrendIcon className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
          {competitor.trackingCategories.map((cat) => {
            const meta = SIGNAL_TYPE_META[cat];
            return (
              <span key={cat} className="text-xs px-2 py-1 rounded" style={{ background: `${meta.hex}15`, color: meta.hex, border: `1px solid ${meta.hex}30` }}>
                {meta.label}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* Signal Timeline */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Radio className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
          Signal Timeline
        </h2>
        <div className="glass rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            {compSignals.slice(0, 4).map((sig, i) => {
              const meta = SIGNAL_TYPE_META[sig.type];
              const month = new Date(sig.timestamp).toLocaleString('default', { month: 'short' }).toUpperCase();
              return (
                <div key={sig.id} className="flex items-center gap-2 sm:gap-0">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.15 }} className="text-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: `${meta.hex}15`, border: `1px solid ${meta.hex}40` }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: meta.hex, boxShadow: `0 0 8px ${meta.hex}` }} />
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{month}</div>
                    <div className="text-xs text-white font-medium truncate max-w-[80px]">{sig.title.split(' ').slice(0, 2).join(' ')}</div>
                  </motion.div>
                  {i < Math.min(compSignals.length, 4) - 1 && <div className="hidden sm:block w-16 h-px mx-2" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }} />}
                  {i < Math.min(compSignals.length, 4) - 1 && <div className="sm:hidden text-slate-600 text-xs">↓</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Memory Replay */}
      <div className="mb-8">
        <MemoryReplay trigger={replayTrigger} />
      </div>

      {/* Signals + Patterns */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Radio className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
            Collected Signals ({compSignals.length})
          </h2>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {compSignals.length === 0 ? (
              <div className="glass rounded-xl p-6 text-center text-sm text-slate-500">No signals collected yet.</div>
            ) : (
              compSignals.map((sig, i) => <SignalCard key={sig.id} signal={sig} index={i} />)
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Network className="w-4 h-4 text-plum-400" strokeWidth={1.5} />
            Detected Patterns ({compPatterns.length})
          </h2>
          <div className="space-y-3">
            {compPatterns.length === 0 ? (
              <div className="glass rounded-xl p-6 text-center text-sm text-slate-500">No patterns detected yet.</div>
            ) : (
              compPatterns.map((pat, i) => (
                <PatternCard key={pat.id} pattern={pat} index={i} onReplay={() => setReplayTrigger((t) => t + 1)} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Intelligence Briefs */}
      {compBriefs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
            Intelligence Briefs
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {compBriefs.map((brief, i) => (
              <IntelligenceBriefCard key={brief.id} brief={brief} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Memory link */}
      <div className="glass rounded-2xl p-6 text-center">
        <Brain className="w-6 h-6 text-teal-400 mx-auto mb-3" strokeWidth={1.5} />
        <h3 className="text-sm font-semibold text-white mb-2">Competitor Memory</h3>
        <p className="text-sm text-slate-400 mb-4">Explore the full memory graph for {competitor.name}.</p>
        <button onClick={() => onNavigate('/memory')} className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
          View Memory Graph →
        </button>
      </div>
    </div>
  );
}
