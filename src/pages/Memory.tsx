import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import MemoryGraphView from '@/components/MemoryGraphView';
import { useStore } from '@/lib/store';
import { generateMemoryGraph } from '@/lib/dataEngine';

interface MemoryProps {
  onNavigate: (route: string) => void;
}

export default function Memory({ onNavigate }: MemoryProps) {
  const { competitors, signals, patterns } = useStore();
  const [selectedId, setSelectedId] = useState(competitors[0]?.id ?? '');
  const competitor = competitors.find((c) => c.id === selectedId);
  const graph = competitor ? generateMemoryGraph(competitor, signals, patterns) : null;

  return (
    <div className="relative z-10 pt-32 pb-12 px-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <Database className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
          Competitor Memory
        </h1>
        <p className="text-sm text-slate-500">Interactive memory graph showing how signals, observations and patterns connect over time.</p>
      </div>

      {/* Competitor selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {competitors.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedId === c.id ? 'glass-strong text-teal-400 border-teal-500/30' : 'glass text-slate-400 border-white/5'}`}
            style={selectedId === c.id ? { border: '1px solid rgba(45,122,120,0.3)' } : {}}
          >
            {c.name}
          </button>
        ))}
      </div>

      {competitor && graph ? (
        <motion.div key={competitor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="glass rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.15), rgba(122,91,142,0.15))', border: '1px solid rgba(255,255,255,0.08)' }}>
                {competitor.name[0]}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{competitor.name}</h2>
                <p className="text-xs text-slate-500">{competitor.industry} · Added {new Date(competitor.dateAdded).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Observations', value: graph.observations, color: '#2D7A78' },
              { label: 'Connected Events', value: graph.connectedEvents, color: '#47739A' },
              { label: 'Recurring Patterns', value: graph.recurringPatterns, color: '#7A5B8E' },
              { label: 'Historical Sequences', value: graph.historicalSequences, color: '#4B6E58' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="glass rounded-xl p-4">
                <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <MemoryGraphView graph={graph} />

          <div className="glass rounded-2xl p-5 mt-6">
            <h3 className="text-sm font-semibold text-white mb-3">How Memory Works</h3>
            <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-slate-400">
              {['Signal', 'Observation', 'Historical Context', 'Relationships'].map((step, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">{step}</span>
                  {i < 3 && <span className="text-slate-600">→</span>}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">Each competitor's memory compounds over time — new signals connect to historical observations, forming patterns that reveal strategic intent.</p>
          </div>
        </motion.div>
      ) : (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-slate-400 mb-4">No competitor selected.</p>
          <button onClick={() => onNavigate('/competitors')} className="text-teal-400 text-sm">Add a competitor →</button>
        </div>
      )}
    </div>
  );
}
