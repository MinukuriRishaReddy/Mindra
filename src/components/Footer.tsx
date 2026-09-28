import { Brain } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

const links = [
  { label: 'Intelligence', route: '/' },
  { label: 'Competitors', route: '/competitors' },
  { label: 'Memory', route: '/memory' },
  { label: 'Patterns', route: '/patterns' },
  { label: 'Dashboard', route: '/dashboard' },
];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-20 pt-12 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.15), rgba(122,91,142,0.15))', border: '1px solid rgba(45,122,120,0.2)' }}>
                <Brain className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-semibold text-white">Mindra</span>
            </div>
            <p className="text-sm text-slate-500">From Signals to Strategy.</p>
          </div>

          <div className="flex flex-wrap gap-6">
            {links.map((link) => (
              <button key={link.route} onClick={() => onNavigate(link.route)} className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">Built for the future of competitive intelligence.</p>
          <p className="text-xs text-slate-600">© 2026 All rights are reserved by team techies</p>
        </div>
      </div>
    </footer>
  );
}
