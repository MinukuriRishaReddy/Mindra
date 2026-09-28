import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, LayoutDashboard, Users, Radio, Network, Database, Sparkles, MapPin, Telescope, Target, Activity } from 'lucide-react';

interface NavbarProps {
  route: string;
  onNavigate: (route: string) => void;
}

const navItems = [
  { label: 'Intelligence', route: '/', icon: Sparkles },
  { label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
  { label: 'Competitors', route: '/competitors', icon: Users },
  { label: 'Signals', route: '/signals', icon: Radio },
  { label: 'Patterns', route: '/patterns', icon: Network },
  { label: 'Memory', route: '/memory', icon: Database },
  { label: 'Geography', route: '/geographic-intelligence', icon: MapPin },
  { label: 'Forecast', route: '/forecast', icon: Telescope },
  { label: 'Goal Map', route: '/goal-map', icon: Target },
  { label: 'Strategy', route: '/strategy', icon: Activity },
];

export default function Navbar({ route, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-4 left-0 right-0 z-50 mx-auto w-[calc(100%-2rem)] max-w-6xl"
    >
      {/* Brand centered on top */}
      <div className="flex justify-center mb-2">
        <button onClick={() => onNavigate('/')} className="group flex items-center gap-2.5 px-5 py-2 rounded-2xl transition-all" style={{ background: scrolled ? 'rgba(14,20,25,0.85)' : 'rgba(14,20,25,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div className="absolute inset-0 rounded-lg border border-teal-500/30 group-hover:border-teal-500/50 transition-colors" />
            <div className="absolute inset-1 rounded-md bg-gradient-to-br from-teal-500/20 to-plum-500/20" />
            <Brain className="w-4 h-4 text-teal-400 relative z-10" strokeWidth={1.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">Mindra</span>
        </button>
      </div>

      {/* Nav tags row */}
      <div className="nav-scrollbar overflow-x-auto rounded-2xl"
        style={{ background: scrolled ? 'rgba(14,20,25,0.85)' : 'rgba(14,20,25,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: scrolled ? '0 0 30px rgba(45,122,120,0.05)' : 'none' }}
      >
        <div className="flex min-w-max items-center justify-center gap-1.5 px-3 py-2.5 mx-auto">
        {navItems.map((item) => {
          const active = route === item.route;
          return (
            <button
              key={item.route}
              onClick={() => onNavigate(item.route)}
              className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                active
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
              style={active ? { background: 'rgba(45,122,120,0.15)', border: '1px solid rgba(45,122,120,0.25)' } : { border: '1px solid transparent' }}
            >
              <item.icon className="w-3.5 h-3.5" strokeWidth={1.5} />
              {item.label}
            </button>
          );
        })}
        </div>
      </div>
    </motion.nav>
  );
}
