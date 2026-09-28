import { motion } from 'framer-motion';
import { Activity, TrendingUp, Lightbulb, AlertTriangle, Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getUserStrategy, startupIdeaFlow } from '@/lib/userStrategy';
import { type BusinessProfile, loadBusinessProfile } from '@/lib/onboarding';
import { useStore } from '@/lib/store';
import { generateExecutiveInsights } from '@/lib/workflow';

interface Props { onNavigate: (route: string) => void; }

export default function BusinessImprovement({ onNavigate }: Props) {
  const profile = loadBusinessProfile();
  const strategy = profile ? getUserStrategy(profile.userType) : getUserStrategy('existing-business');
  const { competitors, patterns } = useStore();
  const insights = generateExecutiveInsights(competitors, patterns);

  return (
    <div className="relative z-10 pt-32 pb-14 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5 text-xs text-teal-400"><Activity className="w-3.5 h-3.5" /> Business improvement center</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{profile?.userType === 'startup-idea' ? 'Startup Idea Analysis' : profile?.userType === 'startup-founder' ? 'Startup Growth Intelligence' : 'Business Improvement Center'}</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">{profile?.companyName ? `Tailored intelligence for ${profile.companyName}.` : 'Tailored intelligence based on your business context.'}</p>
      </div>

      {/* Focus areas */}
      <div className="glass rounded-2xl p-5 mb-8">
        <div className="text-xs uppercase tracking-wider text-slate-500 mb-3">Focus areas</div>
        <div className="flex flex-wrap gap-2">{strategy.focus.map((f, i) => <span key={f} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: ['#2D7A78','#47739A','#7A5B8E','#B9783B','#4B6E58','#C25B5B'][i%6]+'12', border: `1px solid ${['#2D7A78','#47739A','#7A5B8E','#B9783B','#4B6E58','#C25B5B'][i%6]}25`, color: ['#2D7A78','#47739A','#7A5B8E','#B9783B','#4B6E58','#C25B5B'][i%6] }}>{f}</span>)}</div>
      </div>

      {/* Startup idea flow */}
      {profile?.userType === 'startup-idea' && (
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="text-xs uppercase tracking-wider text-teal-400 mb-4">Idea → Strategic insight flow</div>
          <div className="flex flex-wrap items-center gap-2">{startupIdeaFlow.map((step, i) => <div key={step.label} className="flex items-center gap-2"><div className="px-3 py-2 rounded-lg text-xs font-bold tracking-wider" style={{ background: step.color+'15', border: `1px solid ${step.color}30`, color: step.color }}>{step.label}</div>{i < startupIdeaFlow.length - 1 && <ArrowRight className="w-3 h-3 text-slate-600" />}</div>)}</div>
        </div>
      )}

      {/* Strategy sections */}
      <div className="space-y-6 mb-8">
        {strategy.sections.map((section, i) => (
          <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white mb-4">{section.title}</h2>
            <div className="grid sm:grid-cols-3 gap-3">{section.items.map((item) => <div key={item.label} className="rounded-xl bg-white/[0.02] p-4 border border-white/5"><div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: item.color }}>{item.label}</div><div className="text-sm text-slate-200">{item.value}</div></div>)}</div>
          </motion.div>
        ))}
      </div>

      {/* Executive insights */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4"><Lightbulb className="w-4 h-4 text-teal-400" /><h2 className="text-sm font-semibold text-white">Executive insights</h2></div>
        <div className="space-y-4">{insights.map((insight, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(45,122,120,.16)' }}>
            <div className="text-xs uppercase tracking-wider text-teal-400 mb-2">Mindra Intelligence</div>
            <h3 className="text-lg font-semibold text-white mb-4">{insight.insight}</h3>
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Why?</div>
            <div className="space-y-1.5 mb-4">{insight.why.map((w, j) => <div key={j} className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-sage-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />{w}</div>)}</div>
            <div className="grid sm:grid-cols-2 gap-3"><div className="rounded-xl bg-steel-500/5 border border-steel-500/15 p-3"><div className="text-[10px] uppercase tracking-wider text-steel-400 mb-1">Geographic signal</div><div className="text-xs text-slate-300">{insight.geographicSignal}</div></div><div className="rounded-xl bg-bronze-500/5 border border-bronze-500/15 p-3"><div className="text-[10px] uppercase tracking-wider text-bronze-400 mb-1">Possible implication</div><div className="text-xs text-slate-300">{insight.implication}</div></div></div>
          </motion.div>
        ))}</div>
      </div>

      <button onClick={() => onNavigate('/goals')} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white mx-auto block" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,.2), rgba(122,91,142,.2))', border: '1px solid rgba(45,122,120,.25)' }}>
        <Target className="w-4 h-4" /> Run reverse-goal simulation <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
