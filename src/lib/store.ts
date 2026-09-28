import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Competitor, Signal, Pattern, IntelligenceBrief, SignalType } from './types';
import { generateSignals, generatePatterns, generateBriefs, updateCompetitorStats } from './dataEngine';

const STORAGE_KEY = 'mindra-competitors-v2';

function loadCompetitors(): Competitor[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
}

function saveCompetitors(competitors: Competitor[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(competitors));
  } catch {}
}

let globalCompetitors: Competitor[] = loadCompetitors();
const listeners = new Set<() => void>();

function notify() {
  saveCompetitors(globalCompetitors);
  listeners.forEach((l) => l());
}

export function useStore() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const l = () => setTick((t) => t + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);

  const addCompetitor = useCallback((c: Omit<Competitor, 'id' | 'signalCount' | 'patternCount' | 'lastActivity' | 'intelligenceScore' | 'trend' | 'dateAdded'>) => {
    const comp: Competitor = {
      ...c,
      id: `comp-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
      signalCount: 0,
      patternCount: 0,
      lastActivity: 'Just now',
      intelligenceScore: 50,
      trend: 'stable',
    };
    globalCompetitors = [...globalCompetitors, comp];
    notify();
    return comp;
  }, []);

  const deleteCompetitor = useCallback((id: string) => {
    globalCompetitors = globalCompetitors.filter((c) => c.id !== id);
    notify();
  }, []);

  const competitors = globalCompetitors;

  const signals = useMemo(() => generateSignals(competitors), [competitors]);
  const patterns = useMemo(() => generatePatterns(competitors, signals), [competitors, signals]);
  const briefs = useMemo(() => generateBriefs(competitors, patterns), [competitors, patterns]);

  const competitorsWithStats = useMemo(
    () => competitors.map(c => updateCompetitorStats(c, signals, patterns)),
    [competitors, signals, patterns]
  );

  return { competitors: competitorsWithStats, signals, patterns, briefs, addCompetitor, deleteCompetitor };
}

export function getSignalsByCompetitor(signals: Signal[], competitorId: string): Signal[] {
  return signals.filter((s) => s.competitorId === competitorId);
}

export function getPatternsByCompetitor(patterns: Pattern[], competitorId: string): Pattern[] {
  return patterns.filter((p) => p.competitorId === competitorId);
}

export function getBriefsByCompetitor(briefs: IntelligenceBrief[], competitorId: string): IntelligenceBrief[] {
  return briefs.filter((b) => b.competitorId === competitorId);
}

export function filterSignals(signals: Signal[], opts: { type?: SignalType | 'all'; competitorId?: string; search?: string }): Signal[] {
  return signals.filter((s) => {
    if (opts.type && opts.type !== 'all' && s.type !== opts.type) return false;
    if (opts.competitorId && s.competitorId !== opts.competitorId) return false;
    if (opts.search) {
      const q = opts.search.toLowerCase();
      if (!s.title.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q) && !s.competitorName.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

export function getCompetitors(): Competitor[] {
  return globalCompetitors;
}
