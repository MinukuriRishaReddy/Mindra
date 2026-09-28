import type { Competitor, Signal, Pattern, IntelligenceBrief, MemoryGraph, SignalType, Importance, Confidence } from './types';
import { seededRandom, hashString } from './dataEngineHelpers';

const SIGNAL_TYPES: SignalType[] = ['PRICING', 'PRODUCT', 'HIRING', 'MESSAGING', 'STRATEGY'];
const IMPORTANCES: Importance[] = ['low', 'medium', 'high', 'critical'];

const SIGNAL_TEMPLATES: Record<SignalType, { titles: string[]; descs: string[]; sources: string[] }> = {
  PRICING: {
    titles: ['New pricing tier detected', 'Pricing page updated', 'Discount structure changed', 'Annual billing discount introduced', 'Enterprise plan pricing modified'],
    descs: ['Pricing page monitor detected a change in the tier structure and positioning.', 'A new pricing plan appeared, positioned between existing tiers.', 'Discount structure was updated with new annual billing incentives.'],
    sources: ['Pricing Page Monitor', 'Pricing Page Monitor', 'Pricing Page Monitor'],
  },
  PRODUCT: {
    titles: ['New product feature launched', 'Product page updated', 'New model variant released', 'Enterprise feature detected', 'Product expansion observed'],
    descs: ['A new feature was detected on the product page.', 'A dedicated product page appeared on the site.', 'New model variant released with enterprise-focused improvements.'],
    sources: ['Product Page Monitor', 'Product Page Monitor', 'Product Page Monitor'],
  },
  HIRING: {
    titles: ['Engineering roles posted', 'New department created', 'Hiring spike detected', 'Enterprise sales team expansion', 'Specialized roles posted'],
    descs: ['Job postings increased sharply across multiple teams.', 'New roles targeting a specific vertical were detected.', 'Hiring spike detected across engineering and product teams.'],
    sources: ['Job Board Monitor', 'Career Page Monitor', 'Job Board Monitor'],
  },
  MESSAGING: {
    titles: ['Website copy changed', 'New positioning detected', 'Homepage headline shifted', 'Security messaging increased', 'Vertical-specific messaging appeared'],
    descs: ['Website copy shifted to emphasize a new positioning.', 'Homepage headline changed to reflect a new go-to-market focus.', 'New landing page section targeting a specific vertical appeared.'],
    sources: ['Website Monitor', 'Website Monitor', 'Website Monitor'],
  },
  STRATEGY: {
    titles: ['Partnership announced', 'Funding round closed', 'Geographic expansion detected', 'Acquisition rumored', 'Market expansion signal'],
    descs: ['New integration partnership with a major platform announced.', 'Funding round closed with emphasis on go-to-market expansion.', 'New office opening announced, targeting a new market.'],
    sources: ['Press Release Monitor', 'Press Release Monitor', 'Press Release Monitor'],
  },
};

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pickN<T>(arr: T[], n: number, rng: () => number): T[] {
  const copy = [...arr];
  const result: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(rng() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

function timeAgo(daysAgo: number): string {
  if (daysAgo < 1) return `${Math.floor(daysAgo * 24)} hours ago`;
  if (daysAgo === 1) return '1 day ago';
  return `${Math.floor(daysAgo)} days ago`;
}

function timestampDaysAgo(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(Math.floor(Math.random() * 12) + 8, 0, 0, 0);
  return d.toISOString();
}

export function generateSignals(competitors: Competitor[]): Signal[] {
  const signals: Signal[] = [];
  let sigCounter = 0;

  for (const comp of competitors) {
    const rng = seededRandom(hashString(comp.id));
    const count = Math.floor(rng() * 8) + 5;
    const categories = comp.trackingCategories.length > 0 ? comp.trackingCategories : SIGNAL_TYPES;

    for (let i = 0; i < count; i++) {
      const type = pick(categories, rng);
      const templates = SIGNAL_TEMPLATES[type];
      const tIdx = Math.floor(rng() * templates.titles.length);
      sigCounter++;
      signals.push({
        id: `sig-${comp.id}-${sigCounter}`,
        competitorId: comp.id,
        competitorName: comp.name,
        type,
        title: templates.titles[tIdx],
        description: templates.descs[tIdx % templates.descs.length],
        timestamp: timestampDaysAgo(rng() * 14),
        importance: pick(IMPORTANCES, rng),
        source: templates.sources[tIdx % templates.sources.length],
      });
    }
  }

  signals.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return signals;
}

const PATTERN_NAMES: Record<string, string[]> = {
  hiring_momentum: ['Hiring Momentum', 'Engineering Hiring Surge', 'Team Expansion Pattern'],
  pricing_pressure: ['Pricing Pressure', 'Pricing Strategy Shift', 'Tier Restructuring Pattern'],
  signal_sequence: ['Enterprise Expansion Sequence', 'Go-To-Market Pivot', 'Vertical Expansion Pattern'],
  security_positioning: ['Messaging Shift', 'Security Positioning Pattern', 'Enterprise Messaging Pivot'],
  enterprise_focus: ['Enterprise Focus Pattern', 'Enterprise Go-To-Market Shift', 'Enterprise Investment Pattern'],
};

const PATTERN_TYPES = ['hiring_momentum', 'pricing_pressure', 'signal_sequence', 'security_positioning', 'enterprise_focus'];
const CONFIDENCES: Confidence[] = ['low', 'medium', 'high'];

export function generatePatterns(competitors: Competitor[], signals: Signal[]): Pattern[] {
  const patterns: Pattern[] = [];
  let patCounter = 0;

  for (const comp of competitors) {
    const rng = seededRandom(hashString(comp.id) + 1000);
    const compSignals = signals.filter(s => s.competitorId === comp.id);
    if (compSignals.length < 2) continue;

    const patternCount = Math.floor(rng() * 3) + 1;
    for (let i = 0; i < patternCount; i++) {
      const type = pick(PATTERN_TYPES, rng);
      const name = pick(PATTERN_NAMES[type], rng);
      const relatedCount = Math.min(compSignals.length, Math.floor(rng() * 4) + 2);
      const related = pickN(compSignals, relatedCount, rng);
      patCounter++;

      patterns.push({
        id: `pat-${comp.id}-${patCounter}`,
        competitorId: comp.id,
        competitorName: comp.name,
        name,
        description: `${name} detected across ${relatedCount} connected signals from ${comp.name}.`,
        type: type as Pattern['type'],
        confidence: pick(CONFIDENCES, rng),
        patternMatch: Math.floor(rng() * 30) + 60,
        firstObserved: timestampDaysAgo(rng() * 45 + 15).split('T')[0],
        lastObserved: timestampDaysAgo(rng() * 7).split('T')[0],
        frequency: Math.floor(rng() * 3) + 1,
        relatedSignals: related.map(s => s.id),
        evidence: related.slice(0, 4).map(s => s.title),
        why: `The combination of ${type.replace(/_/g, ' ')} signals resembles a previously observed behavioral pattern.`,
        strategicSignal: `${name} suggests ${comp.name} is pursuing a deliberate strategic direction.`,
      });
    }
  }

  return patterns;
}

export function generateBriefs(competitors: Competitor[], patterns: Pattern[]): IntelligenceBrief[] {
  const briefs: IntelligenceBrief[] = [];

  for (const comp of competitors) {
    const compPatterns = patterns.filter(p => p.competitorId === comp.id);
    if (compPatterns.length === 0) continue;

    const topPattern = compPatterns.sort((a, b) => b.patternMatch - a.patternMatch)[0];
    const rng = seededRandom(hashString(comp.id) + 2000);

    briefs.push({
      id: `brief-${comp.id}`,
      competitorId: comp.id,
      competitorName: comp.name,
      title: `${comp.name} is showing ${topPattern.name.toLowerCase()}.`,
      evidence: topPattern.evidence,
      why: topPattern.why,
      strategicSignal: topPattern.strategicSignal,
      confidence: topPattern.confidence,
      patternMatch: topPattern.patternMatch,
      timestamp: timestampDaysAgo(rng() * 2),
    });
  }

  return briefs;
}

export function generateMemoryGraph(competitor: Competitor, signals: Signal[], patterns: Pattern[]): MemoryGraph {
  const rng = seededRandom(hashString(competitor.id) + 3000);
  const compSignals = signals.filter(s => s.competitorId === competitor.id);
  const compPatterns = patterns.filter(p => p.competitorId === competitor.id);

  const nodeCount = Math.min(compSignals.length + compPatterns.length + 1, 9);
  const nodes: MemoryGraph['nodes'] = [];
  const edges: MemoryGraph['edges'] = [];

  const types: MemoryGraph['nodes'][0]['type'][] = ['signal', 'product', 'pattern', 'market'];
  const yPositions = [10, 30, 55, 75, 95];
  let signalIdx = 0;
  let patternIdx = 0;

  for (let i = 0; i < nodeCount; i++) {
    const isPattern = i >= Math.min(compSignals.length, 4) && patternIdx < compPatterns.length;
    const isMarket = i === nodeCount - 1;

    const type: MemoryGraph['nodes'][0]['type'] = isMarket ? 'market' : isPattern ? 'pattern' : pick(types, rng);
    const label = isMarket
      ? 'Market Expansion'
      : isPattern
      ? compPatterns[patternIdx++]?.name || 'Pattern'
      : compSignals[signalIdx++]?.title?.split(' ').slice(0, 3).join(' ') || 'Signal';

    const detail = isMarket
      ? `Strategic market signal from ${competitor.name}.`
      : isPattern
      ? compPatterns[patternIdx - 1]?.description || ''
      : compSignals[signalIdx - 1]?.description || '';

    const x = 15 + (rng() * 70);
    const y = yPositions[Math.min(Math.floor(i / 2), yPositions.length - 1)];

    nodes.push({ id: `n${i + 1}`, label, type, x, y, detail });
  }

  for (let i = 0; i < nodes.length - 1; i++) {
    if (rng() > 0.3 || i < 2) {
      const target = Math.min(i + Math.floor(rng() * 3) + 1, nodes.length - 1);
      edges.push({ from: nodes[i].id, to: nodes[target].id });
    }
  }

  return {
    competitorId: competitor.id,
    nodes,
    edges,
    observations: compSignals.length,
    connectedEvents: Math.floor(compSignals.length * 0.5),
    recurringPatterns: compPatterns.length,
    historicalSequences: Math.max(0, compPatterns.length - 1),
  };
}

export function generateTicker(signals: Signal[]): { name: string; text: string; type: string }[] {
  return signals.slice(0, 12).map(s => ({
    name: s.competitorName,
    text: s.title,
    type: s.type,
  }));
}

export function generateRadarData(competitors: Competitor[]): { axis: string; [key: string]: number | string }[] {
  const axes = ['Product', 'Pricing', 'Hiring', 'Enterprise', 'Security', 'Expansion'];
  return axes.map(axis => {
    const row: { axis: string; [key: string]: number | string } = { axis };
    for (const comp of competitors.slice(0, 4)) {
      const rng = seededRandom(hashString(comp.id + axis));
      row[comp.name] = Math.floor(rng() * 40) + 50;
    }
    return row;
  });
}

export function updateCompetitorStats(competitor: Competitor, signals: Signal[], patterns: Pattern[]): Competitor {
  const compSignals = signals.filter(s => s.competitorId === competitor.id);
  const compPatterns = patterns.filter(p => p.competitorId === competitor.id);
  const score = Math.min(100, 40 + compSignals.length * 3 + compPatterns.length * 5);
  const trend: Competitor['trend'] = compSignals.length > 8 ? 'up' : compSignals.length > 3 ? 'stable' : 'down';

  return {
    ...competitor,
    signalCount: compSignals.length,
    patternCount: compPatterns.length,
    lastActivity: compSignals.length > 0 ? timeAgo((Date.now() - new Date(compSignals[0].timestamp).getTime()) / (1000 * 60 * 60 * 24)) : 'No activity yet',
    intelligenceScore: score,
    trend,
  };
}
