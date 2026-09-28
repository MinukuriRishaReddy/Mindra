import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { SignalType } from '@/lib/types';

interface AddCompetitorModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; website: string; industry: string; region: string; trackingCategories: SignalType[] }) => void;
}

const allCategories: { type: SignalType; label: string }[] = [
  { type: 'PRICING', label: 'Pricing' },
  { type: 'PRODUCT', label: 'Product' },
  { type: 'HIRING', label: 'Hiring' },
  { type: 'MESSAGING', label: 'Messaging' },
  { type: 'STRATEGY', label: 'Strategic Activity' },
];

const initSteps = [
  'INITIALIZING COMPETITOR MEMORY',
  'SCANNING SIGNAL SOURCES',
  'BUILDING PROFILE',
  'MEMORY INITIALIZED',
  'TRACKING ACTIVE',
];

export default function AddCompetitorModal({ open, onClose, onAdd }: AddCompetitorModalProps) {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [region, setRegion] = useState('');
  const [cats, setCats] = useState<SignalType[]>(['PRICING', 'PRODUCT', 'HIRING', 'MESSAGING', 'STRATEGY']);
  const [submitting, setSubmitting] = useState(false);
  const [initStep, setInitStep] = useState(0);

  function toggleCat(t: SignalType) {
    setCats((prev) => prev.includes(t) ? prev.filter((c) => c !== t) : [...prev, t]);
  }

  function handleSubmit() {
    if (!name.trim() || !website.trim()) return;
    setSubmitting(true);
    setInitStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setInitStep(step);
      if (step >= initSteps.length) {
        clearInterval(interval);
        onAdd({ name: name.trim(), website: website.trim(), industry: industry.trim() || 'Technology', region: region.trim() || 'Global', trackingCategories: cats });
        setSubmitting(false);
        setInitStep(0);
        setName('');
        setWebsite('');
        setIndustry('');
        setRegion('');
        setCats(['PRICING', 'PRODUCT', 'HIRING', 'MESSAGING', 'STRATEGY']);
        onClose();
      }
    }, 600);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(5,7,13,0.8)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-2xl w-full max-w-lg p-6 relative overflow-hidden"
            style={{ border: '1px solid rgba(45,122,120,0.15)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #2D7A78, #7A5B8E, transparent)' }} />

            <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors">
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {!submitting ? (
              <>
                <h2 className="text-xl font-semibold text-white mb-1">Add Competitor</h2>
                <p className="text-sm text-slate-400 mb-6">Start tracking a new competitor's signals and building their memory profile.</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 block">Company Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Cohere"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 block">Website URL</label>
                    <input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="cohere.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/30 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 block">Industry (optional)</label>
                      <input
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="AI / SaaS"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 block">Region (optional)</label>
                      <input
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder="Global"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/30 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Tracking Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {allCategories.map((cat) => {
                        const active = cats.includes(cat.type);
                        return (
                          <button
                            key={cat.type}
                            onClick={() => toggleCat(cat.type)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              active
                                ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                                : 'bg-white/[0.03] text-slate-500 border border-white/10'
                            }`}
                          >
                            {active ? '✓ ' : ''}{cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!name.trim() || !website.trim()}
                  className="w-full mt-6 py-3 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.2), rgba(122,91,142,0.2))', border: '1px solid rgba(45,122,120,0.25)' }}
                >
                  Start Tracking
                </button>
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border border-teal-500/20 animate-spin-slow" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-2 rounded-full border border-plum-500/20 animate-spin-reverse-slow" style={{ animationDuration: '4s' }} />
                  <div className="absolute inset-4 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, rgba(45,122,120,0.2), transparent)' }}>
                    <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" style={{ boxShadow: '0 0 16px rgba(45,122,120,0.8)' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  {initSteps.map((step, i) => (
                    <div key={i} className={`text-sm transition-all ${i <= initStep ? 'text-teal-400' : 'text-slate-600'}`}>
                      {i < initStep && '✓ '}
                      {i === initStep && '⟳ '}
                      {i > initStep && '○ '}
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
