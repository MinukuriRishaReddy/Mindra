import { motion } from 'framer-motion';
import { Plus, Radio, Network, FileText, ArrowRight, MapPin, Telescope, Target, Activity, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import StatsBar from '@/components/StatsBar';
import SignalCard from '@/components/SignalCard';
import PatternCard from '@/components/PatternCard';
import IntelligenceBriefCard from '@/components/IntelligenceBriefCard';
import { useStore } from '@/lib/store';
import { loadBusinessProfile, type BusinessProfile } from '@/lib/onboarding';
import { getUserStrategy } from '@/lib/userStrategy';

interface DashboardProps {
  onNavigate: (route: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { competitors, signals, patterns, briefs } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const profile = loadBusinessProfile();
  const strategy = profile ? getUserStrategy(profile.userType) : null;

  const recentSignals = [...signals].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 6);
  const emergingPatterns = patterns.filter((p) => p.confidence === 'high' || p.confidence === 'medium').slice(0, 4);
  const geoSignals = signals.filter((s) => s.metadata?.geography).slice(0, 3);
  const forecasts = 3;

  return (
    <div className="relative z-10 pt-32 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {profile?.companyName ? `${profile.companyName} Intelligence` : 'Intelligence Dashboard'}
          </h1>
          <p className="text-sm text-slate-500">
            {profile ? `${profile.industry} · ${profile.city || 'Global'}` : 'Your competitive intelligence overview.'}
          </p>
        </div>
        <button onClick={() => onNavigate('/competitors')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.15), rgba(122,91,142,0.15))', border: '1px solid rgba(45,122,120,0.2)' }}>
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          Add Competitor
        </button>
      </div>

      <StatsBar competitors={competitors.length} signals={signals.length} patterns={patterns.length} emerging={signals.filter((s) => s.importance === 'high' || s.importance === 'critical').length} />

      {/* User-specific strategy */}
      {strategy && (
        <div className="mt-8 glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
            <h2 className="text-sm font-semibold text-white">Your Strategy Focus</h2>
            <span className="text-xs text-slate-500">— tailored to your profile</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {strategy.focus.map((f, i) => (
              <span key={f} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: ['#2D7A78','#47739A','#7A5B8E','#B9783B','#4B6E58','#C25B5B'][i%6]+'12', border: `1px solid ${['#2D7A78','#47739A','#7A5B8E','#B9783B','#4B6E58','#C25B5B'][i%6]}25`, color: ['#2D7A78','#47739A','#7A5B8E','#B9783B','#4B6E58','#C25B5B'][i%6] }}>{f}</span>
            ))}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        <QuickLink icon={MapPin} label="Geographic Intelligence" route="/geographic-intelligence" color="#4B6E58" onNavigate={onNavigate} />
        <QuickLink icon={Telescope} label="Forecast Scenarios" route="/forecast" color="#2D7A78" onNavigate={onNavigate} />
        <QuickLink icon={Target} label="Reverse-Goal Sim" route="/goals" color="#7A5B8E" onNavigate={onNavigate} />
        <QuickLink icon={Activity} label="Strategy Center" route="/strategy" color="#B9783B" onNavigate={onNavigate} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Signals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
              <h2 className="text-sm font-semibold text-white">Recent Signals</h2>
            </div>
            <button onClick={() => onNavigate('/signals')} className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
            </button>
          </div>
          <div className="space-y-2">
            {recentSignals.map((sig, i) => (
              <SignalCard key={sig.id} signal={sig} index={i} onClick={() => onNavigate('/signals')} />
            ))}
          </div>
        </div>

        {/* Emerging Patterns */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-plum-400" strokeWidth={1.5} />
              <h2 className="text-sm font-semibold text-white">Emerging Patterns</h2>
            </div>
            <button onClick={() => onNavigate('/patterns')} className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
            </button>
          </div>
          <div className="space-y-3">
            {emergingPatterns.map((pat, i) => (
              <PatternCard key={pat.id} pattern={pat} index={i} onReplay={() => onNavigate('/patterns')} />
            ))}
          </div>
        </div>
      </div>

      {/* Intelligence Briefs */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
          <h2 className="text-sm font-semibold text-white">Intelligence Briefs</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {briefs.map((brief, i) => (
            <IntelligenceBriefCard key={brief.id} brief={brief} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickLink({ icon: Icon, label, route, color, onNavigate }: { icon: typeof MapPin; label: string; route: string; color: string; onNavigate: (r: string) => void }) {
  return (
    <button onClick={() => onNavigate(route)} className="group glass rounded-2xl p-4 flex items-center gap-3 hover:border-teal-500/20 transition-all">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon className="w-5 h-5" strokeWidth={1.5} style={{ color }} />
      </div>
      <div className="text-left">
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">Open <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" /></div>
      </div>
    </button>
  );
}
