import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Trash2 } from 'lucide-react';
import CompetitorCard from '@/components/CompetitorCard';
import AddCompetitorModal from '@/components/AddCompetitorModal';
import { useStore } from '@/lib/store';
import type { SignalType } from '@/lib/types';

interface CompetitorsProps {
  onNavigate: (route: string) => void;
}

export default function Competitors({ onNavigate }: CompetitorsProps) {
  const { competitors, addCompetitor, deleteCompetitor } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = competitors.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase()));

  function handleAdd(data: { name: string; website: string; industry: string; region: string; trackingCategories: SignalType[] }) {
    addCompetitor(data);
  }

  return (
    <div className="relative z-10 pt-32 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Competitors</h1>
          <p className="text-sm text-slate-500">{competitors.length} tracked competitors with active signal collection.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.15), rgba(122,91,142,0.15))', border: '1px solid rgba(45,122,120,0.2)' }}>
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          Add Competitor
        </button>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" strokeWidth={1.5} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search competitors..."
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500/30 transition-colors"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl">
          <p className="text-slate-400 mb-4">No competitors found.</p>
          <button onClick={() => setShowModal(true)} className="text-teal-400 text-sm">Add your first competitor →</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((comp, i) => (
            <div key={comp.id} className="relative group">
              <CompetitorCard competitor={comp} index={i} onClick={() => onNavigate(`/competitor/${comp.id}`)} />
              <button
                onClick={() => deleteCompetitor(comp.id)}
                className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center bg-clay-500/10 border border-clay-500/20 text-clay-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-clay-500/20"
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}

      <AddCompetitorModal open={showModal} onClose={() => setShowModal(false)} onAdd={handleAdd} />
    </div>
  );
}
