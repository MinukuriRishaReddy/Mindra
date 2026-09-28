import { motion } from 'framer-motion';
import { Brain, TrendingUp, Activity, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  icon: typeof Brain;
  color: string;
}

interface StatsBarProps {
  competitors: number;
  signals: number;
  patterns: number;
  emerging: number;
}

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let frame: number;
    function step(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return <>{val}</>;
}

export default function StatsBar({ competitors, signals, patterns, emerging }: StatsBarProps) {
  const stats: Stat[] = [
    { label: 'Total Competitors', value: competitors, icon: Brain, color: '#2D7A78' },
    { label: 'Active Signals', value: signals, icon: Activity, color: '#47739A' },
    { label: 'Patterns Detected', value: patterns, icon: TrendingUp, color: '#7A5B8E' },
    { label: 'Emerging Signals', value: emerging, icon: Zap, color: '#B9783B' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="glass rounded-2xl p-5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 transition-opacity group-hover:opacity-20" style={{ background: `radial-gradient(circle, ${stat.color}, transparent 70%)` }} />
          <div className="flex items-center gap-2 mb-3">
            <stat.icon className="w-4 h-4" strokeWidth={1.5} style={{ color: stat.color }} />
            <span className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</span>
          </div>
          <div className="text-3xl font-bold text-white">
            <CountUp target={stat.value} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
