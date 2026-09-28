import { motion } from 'framer-motion';
import { Telescope, Clock, Gauge, CheckCircle2, AlertCircle, Activity } from 'lucide-react';
import { useStore } from '@/lib/store';
import { generateForecastScenarios } from '@/lib/workflow';
import { CONFIDENCE_META } from '@/lib/types';

export default function Forecast() {
  const { competitors, patterns } = useStore();
  const scenarios = generateForecastScenarios(competitors, patterns);
  return (
    <div className="relative z-10 pt-32 pb-14 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5 text-xs text-teal-400"><Telescope className="w-3.5 h-3.5" /> Forecasting</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Forecast Scenarios</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Mindra represents forecasts as evidence-backed scenarios — not guaranteed outcomes. Every scenario shows its evidence, historical analogs, confidence and time horizon.</p>
      </div>

      <div className="glass rounded-2xl p-6 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          {['CURRENT SIGNALS','HISTORICAL ANALOGS','PATTERN MATCH','SCENARIO'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg font-bold tracking-wider" style={{ background: ['#2D7A78','#47739A','#7A5B8E','#4B6E58'][i]+'15', border: `1px solid ${['#2D7A78','#47739A','#7A5B8E','#4B6E58'][i]}30`, color: ['#2D7A78','#47739A','#7A5B8E','#4B6E58'][i] }}>{label}</div>
              {i < 3 && <span className="text-slate-600">→</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {scenarios.map((fc, i) => {
          const conf = CONFIDENCE_META[fc.confidence];
          return (
            <motion.div key={fc.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(45,122,120,.12)' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-teal-400 mb-1">{fc.competitorName}</div>
                  <h2 className="text-lg font-semibold text-white leading-snug max-w-xl">{fc.scenario}</h2>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 mb-1">Confidence</div>
                  <div className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: `${conf.hex}15`, border: `1px solid ${conf.hex}30`, color: conf.hex }}>{conf.label}</div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-5">
                <div className="rounded-xl bg-white/[0.02] p-3 flex items-center gap-3"><Clock className="w-4 h-4 text-steel-400" /><div><div className="text-[10px] text-slate-500 uppercase">Time horizon</div><div className="text-sm text-white">{fc.timeHorizon}</div></div></div>
                <div className="rounded-xl bg-white/[0.02] p-3 flex items-center gap-3"><Gauge className="w-4 h-4 text-plum-400" /><div><div className="text-[10px] text-slate-500 uppercase">Pattern match</div><div className="text-sm text-white">{fc.patternMatch}%</div></div></div>
                <div className="rounded-xl bg-white/[0.02] p-3 flex items-center gap-3"><Activity className="w-4 h-4 text-sage-400" /><div><div className="text-[10px] text-slate-500 uppercase">Analog</div><div className="text-sm text-white">{fc.confidence === 'high' ? 'Direct' : 'Comparable'}</div></div></div>
              </div>

              <div className="mb-4">
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Evidence</div>
                <div className="space-y-1.5">{fc.evidence.map((e, j) => <div key={j} className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-sage-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />{e}</div>)}</div>
              </div>

              <div className="rounded-xl bg-plum-500/5 border border-plum-500/15 p-4">
                <div className="text-xs uppercase tracking-wider text-plum-400 mb-2">Historical analog</div>
                <p className="text-sm text-slate-300">{fc.historicalAnalogs}</p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-bronze-400/80"><AlertCircle className="w-3.5 h-3.5" /> Forecasts represent possible scenarios, not guaranteed outcomes.</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
