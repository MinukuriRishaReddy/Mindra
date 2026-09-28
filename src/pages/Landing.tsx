import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowDown, Eye, Brain, Link2, Search, Lightbulb, Telescope,
  DollarSign, Rocket, Users, MessageSquare, Network, Sparkles,
  CheckCircle2, Activity, TrendingUp, Zap, GitBranch,
} from 'lucide-react';
import IntelligenceCore from '@/components/IntelligenceCore';
import SignalTicker from '@/components/SignalTicker';
import CompetitorRadar from '@/components/CompetitorRadar';
import IntelligenceBriefCard from '@/components/IntelligenceBriefCard';
import { fourteenSteps, continuousLearningLoop } from '@/lib/userStrategy';
import { useStore } from '@/lib/store';

const flowPhases = [
  { name: 'SETUP & COLLECTION', color: '#2D7A78', steps: fourteenSteps.slice(0, 5) },
  { name: 'MEMORY & ANALYSIS', color: '#47739A', steps: fourteenSteps.slice(5, 10) },
  { name: 'GOALS & ACTION', color: '#7A5B8E', steps: fourteenSteps.slice(10, 14) },
];

interface LandingProps {
  onNavigate: (route: string) => void;
}

const thinkingSteps = [
  { num: '01', label: 'OBSERVE', icon: Eye, color: '#2D7A78', desc: 'Collect competitor signals across pricing, product, hiring, messaging and strategy.' },
  { num: '02', label: 'REMEMBER', icon: Brain, color: '#47739A', desc: 'Store meaningful observations in long-term memory — not just as alerts, but as connected history.' },
  { num: '03', label: 'CONNECT', icon: Link2, color: '#7A5B8E', desc: 'Link new events with historical competitor behavior to build a living profile.' },
  { num: '04', label: 'DETECT', icon: Search, color: '#B9783B', desc: 'Identify repeated sequences and behavioral patterns hidden inside the noise.' },
  { num: '05', label: 'REASON', icon: Lightbulb, color: '#4B6E58', desc: 'Generate strategic interpretations from connected signals and matched patterns.' },
  { num: '06', label: 'ANTICIPATE', icon: Telescope, color: '#2D7A78', desc: 'Surface possible future moves based on historically similar sequences.' },
];

const signalTypes = [
  { type: 'PRICING', icon: DollarSign, color: '#2D7A78', examples: ['Pricing tier changed', 'Discount detected', 'Enterprise plan introduced'] },
  { type: 'PRODUCT', icon: Rocket, color: '#47739A', examples: ['New product launched', 'New feature detected', 'Product expansion'] },
  { type: 'HIRING', icon: Users, color: '#7A5B8E', examples: ['Engineering hiring increased', 'New department created', 'Geographic expansion'] },
  { type: 'MESSAGING', icon: MessageSquare, color: '#B9783B', examples: ['Website copy changed', 'New positioning', 'Security messaging increased'] },
  { type: 'STRATEGY', icon: Network, color: '#4B6E58', examples: ['Partnership', 'Acquisition', 'Funding', 'Market expansion'] },
];

const foresightSteps = [
  { label: 'PAST', sub: 'Historical Signals', color: '#64748B' },
  { label: 'MEMORY', sub: 'Stored Competitor Behavior', color: '#47739A' },
  { label: 'PATTERN', sub: 'Repeated Sequence', color: '#7A5B8E' },
  { label: 'CURRENT', sub: 'New Signals', color: '#2D7A78' },
  { label: 'FORESIGHT', sub: 'Possible Next Move', color: '#4B6E58' },
];

export default function Landing({ onNavigate }: LandingProps) {
  const { signals, patterns, briefs } = useStore();
  const topBrief = briefs[0];
  const recentSignals = signals.slice(0, 4).map(s => ({
    name: s.competitorName,
    text: s.title,
    color: ({ PRICING: '#2D7A78', PRODUCT: '#47739A', HIRING: '#7A5B8E', MESSAGING: '#B9783B', STRATEGY: '#4B6E58' } as Record<string, string>)[s.type] ?? '#64748B',
  }));
  const emergingPatterns = patterns.slice(0, 4).map(p => ({
    name: p.name,
    freq: `${p.frequency}x observed`,
    conf: p.confidence.charAt(0).toUpperCase() + p.confidence.slice(1),
    color: ({ high: '#4B6E58', medium: '#B9783B', low: '#64748B' } as Record<string, string>)[p.confidence] ?? '#64748B',
  }));

  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="min-h-screen flex items-center pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" strokeWidth={1.5} />
              <span className="text-xs text-slate-300 tracking-wide">Memory-Powered Competitive Intelligence</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-4">
              The AI That <span className="text-gradient-cyan">Remembers</span> Your Competitors.
            </motion.h1>

            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl sm:text-2xl text-slate-400 font-medium mb-6">
              From Signals to Strategy.
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-slate-400 leading-relaxed mb-8 max-w-lg">
              Mindra continuously remembers competitor activity, connects signals across time, detects recurring behavioral patterns, and transforms fragmented market events into strategic intelligence.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-wrap gap-4">
              <button onClick={() => onNavigate('/onboarding')} className="group relative px-6 py-3 rounded-xl text-sm font-medium text-white overflow-hidden transition-all" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.2), rgba(122,91,142,0.2))', border: '1px solid rgba(45,122,120,0.25)' }}>
                <span className="relative z-10 flex items-center gap-2">
                  GET STARTED
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.3), rgba(122,91,142,0.3))' }} />
              </button>
              <button onClick={() => onNavigate('/workflow')} className="px-6 py-3 rounded-xl text-sm font-medium text-slate-300 glass hover:text-white transition-all">
                See How Mindra Thinks
              </button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <IntelligenceCore />
          </motion.div>
        </div>
      </section>

      <SignalTicker />

      {/* Problem Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Information Is Everywhere.
          </motion.h2>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-4xl font-bold text-gradient-violet">
            Memory Isn't.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-slate-400 max-w-2xl mx-auto mt-6">
            Traditional competitive intelligence tools produce alerts, reports, dashboards and notifications. But they treat every event independently — without memory, there is no pattern, and without pattern, there is no foresight.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Traditional */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-4">Traditional Intelligence</div>
            <div className="space-y-2">
              {['Event 01', 'Event 02', 'Event 03', 'Event 04'].map((ev, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                  <span className="text-sm text-slate-400">{ev}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-clay-400/70 font-medium">Disconnected.</div>
          </motion.div>

          {/* Mindra */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(45,122,120,0.12)' }}>
            <div className="text-xs uppercase tracking-wider text-teal-400 mb-4">Mindra</div>
            <div className="space-y-2">
              {[
                { label: 'Event', color: '#2D7A78' },
                { label: 'Memory', color: '#47739A' },
                { label: 'Connection', color: '#7A5B8E' },
                { label: 'Pattern', color: '#B9783B' },
                { label: 'Insight', color: '#4B6E58' },
                { label: 'Strategic Foresight', color: '#2D7A78' },
              ].map((step, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]" style={{ border: '1px solid rgba(45,122,120,0.06)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: step.color, boxShadow: `0 0 8px ${step.color}80` }} />
                    <span className="text-sm text-white">{step.label}</span>
                  </div>
                  {i < 5 && <div className="ml-5 my-0.5 text-slate-600 text-xs">↓</div>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Mindra Thinks */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-bold text-white mb-3">
              How Mindra Thinks
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-slate-400 max-w-2xl mx-auto">
              Six stages transform raw market signals into strategic foresight.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {thinkingSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative glass rounded-2xl p-6 transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{ background: `radial-gradient(circle, ${step.color}, transparent 70%)` }} />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                    <step.icon className="w-5 h-5" strokeWidth={1.5} style={{ color: step.color }} />
                  </div>
                  <span className="text-2xl font-bold text-white/10">{step.num}</span>
                </div>
                <h3 className="text-sm font-semibold tracking-wider text-white mb-2" style={{ color: step.color }}>{step.label}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Collection */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-bold text-white">
              Every Signal Tells Part of the Story.
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {signalTypes.map((sig, i) => (
              <motion.div
                key={sig.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, rotateY: 5 }}
                className="group relative glass rounded-2xl p-5 transition-all"
                style={{ border: `1px solid ${sig.color}15` }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `0 0 30px ${sig.color}10` }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${sig.color}15`, border: `1px solid ${sig.color}25` }}>
                  <sig.icon className="w-6 h-6" strokeWidth={1.5} style={{ color: sig.color }} />
                </div>
                <h3 className="text-sm font-semibold tracking-wider mb-3" style={{ color: sig.color }}>{sig.type}</h3>
                <div className="space-y-1.5">
                  {sig.examples.map((ex, j) => (
                    <div key={j} className="text-xs text-slate-400 flex items-start gap-1.5">
                      <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: sig.color }} />
                      {ex}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Your Competitive Landscape. Remembered.
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-slate-400 max-w-2xl mx-auto">
              Every competitor gets a living intelligence profile — signals, patterns, memory and strategic briefs.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-white">Competitor Radar</h3>
              <button onClick={() => onNavigate('/competitors')} className="text-xs text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
              </button>
            </div>
            <CompetitorRadar />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-white">Recent Signals</h3>
              </div>
              <div className="space-y-2">
                {recentSignals.length > 0 ? recentSignals.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.02]">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                    <span className="text-xs text-slate-500">{s.name}</span>
                    <span className="text-xs text-slate-300">— {s.text}</span>
                  </div>
                )) : <div className="text-xs text-slate-500 text-center py-4">Add competitors to see signals.</div>}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-plum-400" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-white">Emerging Patterns</h3>
              </div>
              <div className="space-y-2">
                {emergingPatterns.length > 0 ? emergingPatterns.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                      <span className="text-xs text-slate-300">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500">{p.freq}</span>
                      <span style={{ color: p.color }}>{p.conf}</span>
                    </div>
                  </div>
                )) : <div className="text-xs text-slate-500 text-center py-4">Add competitors to see patterns.</div>}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intelligence Brief */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Intelligence Brief
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-slate-400 max-w-2xl mx-auto">
              Mindra combines current signals, historical memory and detected patterns into strategic intelligence — distinguishing observed facts from inferences.
            </motion.p>
          </div>

          {topBrief ? <IntelligenceBriefCard brief={topBrief} /> : <div className="glass rounded-2xl p-8 text-center text-sm text-slate-500">Add competitors to generate intelligence briefs.</div>}
        </div>
      </section>

      {/* Foresight */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-bold text-white">
              From History to Foresight.
            </motion.h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
            {foresightSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center glass rounded-2xl px-5 py-4 min-w-[130px]"
                  style={i === foresightSteps.length - 1 ? { border: `1px solid ${step.color}40`, boxShadow: `0 0 30px ${step.color}20` } : {}}
                >
                  <div className="text-sm font-bold tracking-wider mb-1" style={{ color: step.color }}>{step.label}</div>
                  <div className="text-xs text-slate-500">{step.sub}</div>
                </motion.div>
                {i < foresightSteps.length - 1 && (
                  <div className="text-slate-600 hidden sm:block">→</div>
                )}
                {i < foresightSteps.length - 1 && <div className="sm:hidden text-slate-600 text-xs">↓</div>}
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-12 max-w-md mx-auto text-center glass rounded-2xl p-6" style={{ border: '1px solid rgba(75,110,88,0.2)', boxShadow: '0 0 40px rgba(75,110,88,0.06)' }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-sage-400 animate-pulse" style={{ boxShadow: '0 0 12px rgba(75,110,88,0.8)' }} />
              <span className="text-xs uppercase tracking-wider text-sage-400 font-medium">Foresight</span>
            </div>
            <div className="text-lg font-semibold text-white mb-2">Possible Enterprise Expansion</div>
            <div className="text-sm text-slate-400">Based on 3 historically similar sequences.</div>
            <div className="text-xs text-slate-500 mt-3 italic">Pattern similarity is not a prediction of certainty.</div>
          </motion.div>
        </div>
      </section>

      {/* Memory Compounds */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Memory That Compounds.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-4">Traditional AI</div>
              <div className="flex items-center justify-center gap-3 text-sm text-slate-400 flex-wrap">
                <span>Signal</span><span className="text-slate-600">→</span>
                <span>Response</span><span className="text-slate-600">→</span>
                <span className="text-clay-400/70">Forget</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(45,122,120,0.12)' }}>
              <div className="text-xs uppercase tracking-wider text-teal-400 mb-4">Mindra</div>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-300 flex-wrap">
                {['Signal', 'Remember', 'Connect', 'Learn', 'Detect', 'Reason', 'Improve'].map((s, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span style={{ color: i === 6 ? '#4B6E58' : '#E2E8F0' }}>{s}</span>
                    {i < 6 && <span className="text-slate-600">→</span>}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-sm text-slate-500">
            Powered by persistent memory architecture. The memory backend is modular — designed to connect to a long-term memory layer.
          </motion.p>
        </div>
      </section>

      {/* 14-Step Workflow Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl font-semibold text-white mb-3">How Mindra Thinks</motion.h2>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-4xl font-bold text-white mb-3">INFORMATION IS EVERYWHERE.</motion.h2>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="text-3xl sm:text-4xl font-bold text-gradient-violet mb-6">MEMORY ISN'T.</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-slate-400 max-w-2xl mx-auto">
              Mindra does not treat every signal as an isolated event. It continuously: RETAIN → RECALL → ANALYZE → FORECAST → ACT → EVALUATE → LEARN
            </motion.p>
          </div>

          {/* Flowchart */}
          <div className="glass rounded-2xl p-6 sm:p-10 mb-8 overflow-x-auto">
            <div className="min-w-[520px] max-w-3xl mx-auto">
              {flowPhases.map((phase, pi) => (
                <div key={phase.name}>
                  {/* Phase header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${phase.color}40)` }} />
                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap" style={{ color: phase.color }}>{phase.name}</div>
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${phase.color}40, transparent)` }} />
                  </div>
                  {/* Phase nodes */}
                  <div className="flex flex-col items-center">
                    {phase.steps.map((step, si) => (
                      <div key={step.num} className="flex flex-col items-center">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: (pi * 0.1) + (si * 0.05) }}
                          className="w-full max-w-md flex items-center gap-3 p-4 rounded-xl"
                          style={{ background: `${step.color}10`, border: `1px solid ${step.color}30` }}
                        >
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: `${step.color}20`, border: `1px solid ${step.color}50`, color: step.color }}>
                            {step.num}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-white">{step.short}</div>
                            <div className="text-xs text-slate-400 mt-0.5 leading-snug">{step.label}</div>
                          </div>
                        </motion.div>
                        {si < phase.steps.length - 1 && (
                          <div className="flex flex-col items-center py-1">
                            <div className="w-px h-4" style={{ background: `${step.color}40` }} />
                            <ArrowDown className="w-3 h-3" style={{ color: `${step.color}60` }} strokeWidth={2} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Phase connector */}
                  {pi < flowPhases.length - 1 && (
                    <div className="flex flex-col items-center py-2">
                      <div className="w-px h-6 bg-slate-700" />
                      <ArrowDown className="w-4 h-4 text-slate-600" strokeWidth={2} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="text-center text-xs uppercase tracking-wider text-slate-500 mb-4">Continuous Learning Loop</div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {continuousLearningLoop.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }} className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider" style={{ background: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}>
                    {step.label}
                  </motion.div>
                  {i < continuousLearningLoop.length - 1 && <span className="text-slate-600">→</span>}
                </div>
              ))}
              <span className="text-slate-600 ml-2">↻</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center glass-strong rounded-3xl p-12 relative overflow-hidden" style={{ border: '1px solid rgba(45,122,120,0.15)' }}>
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #2D7A78, #7A5B8E, transparent)' }} />
          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(45,122,120,0.15), transparent 60%)' }} />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Start Watching Your Competitors.</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Add a competitor, collect signals, build memory, detect patterns and generate strategic intelligence — all in one place.
            </p>
            <button onClick={() => onNavigate('/onboarding')} className="group relative px-8 py-3.5 rounded-xl text-sm font-medium text-white overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.2), rgba(122,91,142,0.2))', border: '1px solid rgba(45,122,120,0.25)' }}>
              <span className="relative z-10 flex items-center gap-2">
                GET STARTED
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.3), rgba(122,91,142,0.3))' }} />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
