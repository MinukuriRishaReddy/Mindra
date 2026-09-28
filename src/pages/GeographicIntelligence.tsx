import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, CheckCircle2, MapPin, ShieldAlert, TrendingUp, Brain, Radio } from 'lucide-react';
import { useStore } from '@/lib/store';
import { generateGeoHierarchy, generateLocalIntelligenceBrief, type GeoData } from '@/lib/geographic';

const levelColors: Record<string, string> = {
  global: '#2D7A78',
  country: '#47739A',
  state: '#B9783B',
  district: '#4B6E58',
  city: '#7A5B8E',
  locality: '#C26B5D',
};

export default function GeographicIntelligence() {
  const { competitors } = useStore();
  const geoHierarchy = useMemo(() => generateGeoHierarchy(competitors), [competitors]);
  const localBrief = useMemo(() => generateLocalIntelligenceBrief(competitors, geoHierarchy), [competitors, geoHierarchy]);
  const [selected, setSelected] = useState<GeoData>(geoHierarchy[5] ?? geoHierarchy[0] ?? null as any);
  const [selectedLevel, setSelectedLevel] = useState<string>(geoHierarchy[5]?.level ?? geoHierarchy[0]?.level ?? 'locality');
  const currentGeo = geoHierarchy.find(g => g.level === selectedLevel) ?? geoHierarchy[0];

  return (
    <div className="relative z-10 pt-32 pb-14 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5 text-xs text-teal-400"><MapPin className="w-3.5 h-3.5" /> Geographic intelligence</div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">GLOBAL TO LOCAL INTELLIGENCE</h1>
        <p className="text-slate-400 leading-relaxed">Understand how large-scale market signals propagate into local opportunities and risks. Move up and down the hierarchy to see how a global trend becomes a local opening.</p>
      </div>

      {/* Vertical propagation diagram */}
      <div className="glass rounded-3xl p-6 sm:p-10 mb-14">
        <div className="max-w-2xl mx-auto">
          {geoHierarchy.map((geo, i) => {
            const active = selected.level === geo.level;
            const color = levelColors[geo.level];
            return (
              <div key={geo.level}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => { setSelected(geo); setSelectedLevel(geo.level); }}
                  className={`w-full text-left rounded-2xl p-5 transition-all ${active ? 'bg-white/[0.06] border-2' : 'bg-white/[0.02] border border-white/5 hover:border-white/10'}`}
                  style={active ? { borderColor: color } : undefined}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ background: color, boxShadow: active ? `0 0 12px ${color}` : 'none' }} />
                      <span className="text-sm font-bold tracking-[0.15em] text-white">{geo.name}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">{geo.level}</span>
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">{geo.trends[0]}</div>
                  {active && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 space-y-3 overflow-hidden">
                      <div className="grid grid-cols-3 gap-2">{geo.kpis.map((kpi) => <div key={kpi.label} className="rounded-lg bg-white/[0.03] p-2.5"><div className="text-sm font-semibold text-white">{kpi.value}</div><div className="text-[10px] text-slate-500 mt-0.5">{kpi.label}</div></div>)}</div>
                      <div className="space-y-1.5">{geo.signals.map((signal) => <div key={signal.label} className="flex items-start gap-2 text-xs text-slate-300"><Radio className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: signal.color }} />{signal.label}</div>)}</div>
                    </motion.div>
                  )}
                </motion.button>
                {i < geoHierarchy.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Cross-level correlation engine */}
          <div className="flex flex-col items-center pt-4">
            <ArrowDown className="w-4 h-4 text-slate-600 mb-3" />
            <div className="w-full rounded-2xl p-5 text-center" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.15), rgba(184,120,59,0.1))', border: '1px solid rgba(45,122,120,0.3)' }}>
              <div className="flex items-center justify-center gap-2 mb-2"><Brain className="w-4 h-4 text-teal-400" /><span className="text-sm font-bold tracking-wider text-white">CROSS-LEVEL CORRELATION ENGINE</span></div>
              <p className="text-xs text-slate-400 max-w-md mx-auto">Does a global signal actually propagate to this local market? Mindra traces the chain and surfaces the local implication.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Correlation trace */}
      <div className="mb-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-teal-400 mb-2">Correlation trace</div>
            <h2 className="text-2xl font-semibold text-white">From a global signal to a local opportunity</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500"><ArrowUp className="w-3 h-3" /> trace upward</div>
        </div>
        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="space-y-1">
            {geoHierarchy.map((geo, i) => {
              const color = levelColors[geo.level];
              return (
                <div key={geo.level}>
                  <div className="flex items-start gap-4 p-3 rounded-xl bg-white/[0.02]">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                    <div className="flex-1">
                      <div className="text-xs font-bold tracking-wider text-white">{geo.name}</div>
                      <div className="text-xs text-slate-400 mt-1">{geo.signals[0].label}</div>
                    </div>
                  </div>
                  {i < geoHierarchy.length - 1 && <div className="ml-[22px] py-0.5"><ArrowDown className="w-3 h-3 text-slate-700" /></div>}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-sage-500/10 border border-sage-500/20">
            <CheckCircle2 className="w-5 h-5 text-sage-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs uppercase tracking-wider text-sage-400 mb-1">Local intelligence brief</div>
              <div className="text-sm text-slate-200">{localBrief.title}</div>
              <div className="mt-3 space-y-1">{localBrief.evidence.map((e, j) => <div key={j} className="text-xs text-slate-400 flex gap-2"><span className="text-sage-400">•</span>{e}</div>)}</div>
              <div className="mt-3 text-sm text-teal-300">{localBrief.insight}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected detail panel */}
      <motion.div key={selectedLevel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4"><TrendingUp className="w-4 h-4 text-teal-400" /><span className="text-xs font-semibold text-white">Opportunities at this level</span></div>
          <div className="space-y-2">{currentGeo?.opportunities.map((item) => <div key={item} className="text-sm text-slate-300 flex gap-2"><span className="text-teal-400">•</span>{item}</div>)}</div>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4"><ShieldAlert className="w-4 h-4 text-bronze-400" /><span className="text-xs font-semibold text-white">Risks at this level</span></div>
          <div className="space-y-2">{currentGeo?.risks.map((item) => <div key={item} className="text-sm text-slate-300 flex gap-2"><span className="text-bronze-400">•</span>{item}</div>)}</div>
        </div>
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-3"><Brain className="w-4 h-4 text-plum-400" /><span className="text-xs font-semibold text-white">Relevant memory</span></div>
          <p className="text-sm text-slate-300 leading-relaxed">{currentGeo?.memory}</p>
          <p className="text-xs text-slate-500 mt-3">Historical context: {currentGeo?.historicalContext}</p>
        </div>
      </motion.div>

      <p className="text-xs text-slate-500 text-center mt-10 italic">Figure 3. Multi-scale geographic intelligence hierarchy.</p>
    </div>
  );
}
