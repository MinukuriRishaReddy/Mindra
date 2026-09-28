import { useState, useMemo } from 'react';
import { Search, Radio } from 'lucide-react';
import SignalCard from '@/components/SignalCard';
import { useStore, filterSignals } from '@/lib/store';
import { SIGNAL_TYPE_META, type SignalType } from '@/lib/types';

const typeFilters: (SignalType | 'all')[] = ['all', 'PRICING', 'PRODUCT', 'HIRING', 'MESSAGING', 'STRATEGY'];

export default function Signals() {
  const { signals, competitors } = useStore();
  const [type, setType] = useState<SignalType | 'all'>('all');
  const [competitorId, setCompetitorId] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => filterSignals(signals, { type, competitorId: competitorId === 'all' ? undefined : competitorId, search }), [signals, type, competitorId, search]);

  return (
    <div className="relative z-10 pt-32 pb-12 px-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <Radio className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
          Signals
        </h1>
        <p className="text-sm text-slate-500">{signals.length} signals collected across {competitors.length} competitors.</p>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4 mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search signals..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500/30 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {typeFilters.map((t) => {
            const active = type === t;
            const meta = t === 'all' ? null : SIGNAL_TYPE_META[t];
            return (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                    : 'bg-white/[0.03] text-slate-500 border border-white/10'
                }`}
              >
                {t === 'all' ? 'All Types' : meta?.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCompetitorId('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${competitorId === 'all' ? 'bg-plum-500/15 text-plum-400 border border-plum-500/30' : 'bg-white/[0.03] text-slate-500 border border-white/10'}`}
          >
            All Competitors
          </button>
          {competitors.map((c) => (
            <button
              key={c.id}
              onClick={() => setCompetitorId(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${competitorId === c.id ? 'bg-plum-500/15 text-plum-400 border border-plum-500/30' : 'bg-white/[0.03] text-slate-500 border border-white/10'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Signal feed */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-slate-400">No signals match your filters.</p>
          </div>
        ) : (
          filtered.map((sig, i) => <SignalCard key={sig.id} signal={sig} index={i} />)
        )}
      </div>
    </div>
  );
}
