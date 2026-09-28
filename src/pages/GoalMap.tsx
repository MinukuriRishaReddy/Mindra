import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Compass, MapPin, Target, TrendingUp } from 'lucide-react';
import type { BusinessProfile, UserType } from '@/lib/onboarding';

interface GoalMapProps {
  profile: BusinessProfile | null;
  onNavigate: (route: string) => void;
}

type GoalNode = { id: string; title: string; detail: string; color: string; duration: string };

const userGoals: Record<UserType, { eyebrow: string; title: string; intro: string; nodes: GoalNode[]; outcome: string }> = {
  'startup-founder': {
    eyebrow: 'STARTUP FOUNDER PATH',
    title: 'A grounded route from market signals to growth decisions.',
    intro: 'Mindra has translated your context, competitor movement and geographic signals into an actionable sequence. This is a working itinerary, not a prediction.',
    nodes: [
      { id: '1', title: 'Clarify the wedge', detail: 'Define the customer segment where your product can win before competitors consolidate the space.', color: '#2D7A78', duration: 'Week 1–2' },
      { id: '2', title: 'Benchmark the field', detail: 'Compare OpenAI, Anthropic and Perplexity on pricing, enterprise features, hiring and messaging.', color: '#47739A', duration: 'Week 2–3' },
      { id: '3', title: 'Build the proof point', detail: 'Create a focused enterprise use case and validate it with 3–5 target customers.', color: '#B9783B', duration: 'Week 3–6' },
      { id: '4', title: 'Enter the local market', detail: 'Use Hyderabad and HITEC City signals to identify partners, pilots and first local advocates.', color: '#4B6E58', duration: 'Week 6–10' },
      { id: '5', title: 'Measure and adjust', detail: 'Compare traction against the target, record the outcome and feed the learning back into memory.', color: '#7A5B8E', duration: 'Week 10–12' },
    ],
    outcome: 'A defensible growth wedge with evidence behind the next hiring, pricing and market-entry decision.',
  },
  'startup-idea': {
    eyebrow: 'STARTUP IDEA PATH',
    title: 'A validation path before you commit time and capital.',
    intro: 'Mindra has organized your idea into a sequence that tests demand, alternatives, geography and the gaps competitors have not closed.',
    nodes: [
      { id: '1', title: 'Frame the problem', detail: 'Write the narrowest version of the problem and identify who experiences it often enough to pay.', color: '#2D7A78', duration: 'Week 1' },
      { id: '2', title: 'Map existing alternatives', detail: 'Review competitors, manual workarounds, pricing and product promises across the target market.', color: '#47739A', duration: 'Week 1–2' },
      { id: '3', title: 'Test the gap', detail: 'Interview target users and test a simple workflow against the strongest existing alternative.', color: '#B9783B', duration: 'Week 2–4' },
      { id: '4', title: 'Choose the launch geography', detail: 'Compare demand, local competition, access and partners across country, city and locality levels.', color: '#4B6E58', duration: 'Week 4–5' },
      { id: '5', title: 'Make the build decision', detail: 'Score evidence, risks and willingness to pay. Start only if the gap survives contact with customers.', color: '#7A5B8E', duration: 'Week 5–6' },
    ],
    outcome: 'A clear build, reshape or stop decision based on observed customer evidence rather than enthusiasm alone.',
  },
  'existing-business': {
    eyebrow: 'EXISTING BUSINESS PATH',
    title: 'A practical route to improve competitive position.',
    intro: 'Mindra has connected current market movement with your existing position, then worked backwards from the business goal you entered.',
    nodes: [
      { id: '1', title: 'Baseline the position', detail: 'Measure current pricing, customer demand, competitors, regional presence and market-share signals.', color: '#2D7A78', duration: 'Week 1–2' },
      { id: '2', title: 'Protect the core', detail: 'Close the most urgent product, retention or positioning gap exposed by competitor movement.', color: '#47739A', duration: 'Week 2–5' },
      { id: '3', title: 'Run a focused experiment', detail: 'Test one pricing, product or sales change with a defined success measure and timebox.', color: '#B9783B', duration: 'Week 5–8' },
      { id: '4', title: 'Expand where signals agree', detail: 'Prioritize the city or locality where demand, access and competitive density create the best opening.', color: '#4B6E58', duration: 'Week 8–12' },
      { id: '5', title: 'Evaluate the outcome', detail: 'Compare actual movement with the forecast, retain the result and update the next decision.', color: '#7A5B8E', duration: 'Week 12–14' },
    ],
    outcome: 'A measured improvement plan that protects the base business while opening one evidence-backed growth lane.',
  },
};

export default function GoalMap({ profile, onNavigate }: GoalMapProps) {
  const userType = profile?.userType ?? 'startup-founder';
  const plan = userGoals[userType];
  const [selectedId, setSelectedId] = useState(plan.nodes[0].id);
  const selected = useMemo(() => plan.nodes.find((node) => node.id === selectedId) ?? plan.nodes[0], [plan.nodes, selectedId]);

  return (
    <div className="relative z-10 pt-32 pb-14 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start mb-14">
        <div className="pt-8">
          <div className="text-xs uppercase tracking-[0.2em] text-teal-400 mb-4">{plan.eyebrow}</div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.08] mb-6">{plan.title}</h1>
          <p className="text-base text-slate-400 leading-relaxed mb-8 max-w-xl">{plan.intro}</p>
          <div className="flex items-center gap-3 text-sm text-slate-300"><Target className="w-4 h-4 text-bronze-400" /><span>Goal:</span><strong className="text-white">{profile?.objective || 'Build a stronger market position'}</strong></div>
        </div>

        <div className="paper-card rounded-[28px] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8"><div><div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Goal map</div><div className="text-sm text-slate-700 mt-1">A sequence you can act on</div></div><Compass className="w-5 h-5 text-teal-700" /></div>
          <div className="relative pl-5">
            <div className="absolute left-[31px] top-5 bottom-5 w-px bg-slate-300" />
            <div className="space-y-5">
              {plan.nodes.map((node, index) => (
                <motion.button key={node.id} whileHover={{ x: 4 }} onClick={() => setSelectedId(node.id)} className={`relative z-10 w-full flex items-start gap-4 text-left rounded-2xl p-3 transition-all ${selectedId === node.id ? 'bg-white shadow-[0_8px_25px_rgba(37,58,62,.1)]' : 'hover:bg-white/60'}`}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: node.color }}>{index + 1}</div>
                  <div className="flex-1"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-slate-800">{node.title}</span><span className="text-[10px] text-slate-500 whitespace-nowrap">{node.duration}</span></div><div className="text-xs text-slate-500 mt-1 leading-relaxed">{node.detail}</div></div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6"><div><div className="text-xs uppercase tracking-[0.18em] text-teal-400 mb-2">Selected milestone</div><h2 className="text-2xl font-semibold text-white">{selected.title}</h2></div><div className="flex items-center gap-2 text-xs text-slate-500"><Clock3 className="w-4 h-4" /> {selected.duration}</div></div>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">{selected.detail}</p>
          <div className="grid sm:grid-cols-3 gap-3"><Metric icon={CalendarDays} label="Cadence" value="Weekly review" /><Metric icon={TrendingUp} label="Evidence" value="Signals + memory" /><Metric icon={MapPin} label="Lens" value={profile?.city || 'Global'} /></div>
        </div>
        <div className="paper-card rounded-2xl p-6 sm:p-8"><div className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-3">Estimated result</div><h2 className="text-xl font-semibold text-slate-800 mb-4">{plan.outcome}</h2><div className="space-y-3 text-sm text-slate-600"><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />Every milestone has a time window.</div><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />Each action creates an outcome to evaluate.</div><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />The plan updates when new evidence arrives.</div></div></div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-10"><button onClick={() => onNavigate('/dashboard')} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white bg-teal-700 hover:bg-teal-600 transition-colors">Enter intelligence workspace <ArrowRight className="w-4 h-4" /></button><button onClick={() => onNavigate('/geographic-intelligence')} className="px-6 py-3 rounded-xl text-sm font-medium text-slate-300 glass hover:text-white transition-colors">Explore geographic signals</button></div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: string; value: string }) { return <div className="rounded-xl bg-white/[0.03] p-3"><Icon className="w-4 h-4 text-teal-400 mb-2" /><div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div><div className="text-xs text-white mt-1">{value}</div></div>; }
