import { useState } from 'react';
import { Network } from 'lucide-react';
import PatternCard from '@/components/PatternCard';
import MemoryReplay from '@/components/MemoryReplay';
import { useStore } from '@/lib/store';
import type { Confidence } from '@/lib/types';

const confFilters: (Confidence | 'all')[] = ['all', 'high', 'medium', 'low'];

export default function Patterns() {
  const { patterns } = useStore();
  const [conf, setConf] = useState<Confidence | 'all'>('all');
  const [replayTrigger, setReplayTrigger] = useState(0);

  const filtered = conf === 'all' ? patterns : patterns.filter((p) => p.confidence === conf);

  return (
    <div className="relative z-10 pt-32 pb-12 px-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <Network className="w-5 h-5 text-plum-400" strokeWidth={1.5} />
          Patterns
        </h1>
        <p className="text-sm text-slate-500">{patterns.length} behavioral patterns detected across your competitive landscape.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {confFilters.map((c) => (
          <button
            key={c}
            onClick={() => setConf(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${conf === c ? 'bg-plum-500/15 text-plum-400 border border-plum-500/30' : 'bg-white/[0.03] text-slate-500 border border-white/10'}`}
          >
            {c === 'all' ? 'All Confidence' : c}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <MemoryReplay trigger={replayTrigger} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 glass rounded-2xl p-12 text-center">
            <p className="text-slate-400">No patterns match this filter.</p>
          </div>
        ) : (
          filtered.map((pat, i) => (
            <PatternCard key={pat.id} pattern={pat} index={i} onReplay={() => setReplayTrigger((t) => t + 1)} />
          ))
        )}
      </div>
    </div>
  );
}
