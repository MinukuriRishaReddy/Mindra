import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight, CheckCircle2, MapPin, AlertTriangle, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { useStore } from '@/lib/store';
import { generateReverseGoal } from '@/lib/workflow';

export default function Goals() {
  const { competitors } = useStore();
  const [target, setTarget] = useState('');
  const [simulated, setSimulated] = useState(false);
  const result = simulated ? generateReverseGoal(target, competitors) : null;

  return (
    <div className="relative z-10 pt-32 pb-14 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5 text-xs text-teal-400"><Target className="w-3.5 h-3.5" /> Reverse-goal simulation</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">What Would It Take?</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Set a target. Mindra works backwards to identify the changes, capabilities and actions required to achieve it.</p>
      </div>

      <div className="glass rounded-2xl p-6 mb-8">
        <label className="text-xs uppercase tracking-wider text-slate-500 mb-2 block">Your target</label>
        <div className="flex gap-3">
          <input value={target} onChange={(e) => setTarget(e.target.value)} className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/30" />
          <button onClick={() => setSimulated(true)} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,.2), rgba(122,91,142,.2))', border: '1px solid rgba(45,122,120,.25)' }}>Simulate <Zap className="w-4 h-4" /></button>
        </div>
      </div>

      {simulated && result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-bronze-500/15 border border-bronze-500/30"><AlertTriangle className="w-5 h-5 text-bronze-400" /></div>
            <div><div className="text-xs uppercase tracking-wider text-bronze-400 mb-1">Current position</div><div className="text-sm text-slate-200">{result.currentPosition}</div></div>
          </div>

          <Section title="Required changes" color="#2D7A78" items={result.requiredChanges} />
          <Section title="Required capabilities" color="#47739A" items={result.requiredCapabilities} />

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3"><MapPin className="w-4 h-4 text-sage-400" /><span className="text-xs font-semibold text-white">Geographic factors</span></div>
            <p className="text-sm text-slate-300">{result.geographicFactors}</p>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-plum-400" /><span className="text-xs font-semibold text-white">Potential competitor response</span></div>
            <p className="text-sm text-slate-300">{result.competitorResponse}</p>
          </div>

          <Section title="Potential scenarios" color="#7A5B8E" items={result.potentialScenarios} />
          <Section title="Required actions" color="#4B6E58" items={result.requiredActions} />

          <div className="flex items-center gap-2 text-xs text-bronze-400/80 p-4"><AlertCircle className="w-3.5 h-3.5" /> Simulation does not guarantee an outcome. Scenarios are evidence-based estimates.</div>
        </motion.div>
      )}
    </div>
  );
}

function Section({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs uppercase tracking-wider mb-3" style={{ color }}>{title}</div>
      <div className="space-y-2">{items.map((item, i) => <div key={i} className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color }} strokeWidth={1.5} />{item}</div>)}</div>
    </div>
  );
}
