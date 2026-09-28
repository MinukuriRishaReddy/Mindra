export type SignalType = 'PRICING' | 'PRODUCT' | 'HIRING' | 'MESSAGING' | 'STRATEGY';
export type Importance = 'low' | 'medium' | 'high' | 'critical';
export type Confidence = 'low' | 'medium' | 'high';

export interface Competitor {
  id: string;
  name: string;
  website: string;
  industry: string;
  region: string;
  trackingCategories: SignalType[];
  dateAdded: string;
  signalCount: number;
  patternCount: number;
  lastActivity: string;
  intelligenceScore: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Signal {
  id: string;
  competitorId: string;
  competitorName: string;
  type: SignalType;
  title: string;
  description: string;
  timestamp: string;
  importance: Importance;
  source: string;
  metadata?: Record<string, string>;
}

export interface Observation {
  id: string;
  competitorId: string;
  text: string;
  signalIds: string[];
  timestamp: string;
}

export interface Pattern {
  id: string;
  competitorId: string;
  competitorName: string;
  name: string;
  description: string;
  type: 'hiring_momentum' | 'pricing_pressure' | 'signal_sequence' | 'security_positioning' | 'enterprise_focus';
  confidence: Confidence;
  patternMatch: number;
  firstObserved: string;
  lastObserved: string;
  frequency: number;
  relatedSignals: string[];
  evidence: string[];
  why: string;
  strategicSignal: string;
}

export interface IntelligenceBrief {
  id: string;
  competitorId: string;
  competitorName: string;
  title: string;
  evidence: string[];
  why: string;
  strategicSignal: string;
  confidence: Confidence;
  patternMatch: number;
  timestamp: string;
}

export interface MemoryNode {
  id: string;
  label: string;
  type: 'signal' | 'observation' | 'pattern' | 'product' | 'market' | 'competitor';
  x: number;
  y: number;
  detail?: string;
}

export interface MemoryEdge {
  from: string;
  to: string;
}

export interface MemoryGraph {
  competitorId: string;
  nodes: MemoryNode[];
  edges: MemoryEdge[];
  observations: number;
  connectedEvents: number;
  recurringPatterns: number;
  historicalSequences: number;
}

export const SIGNAL_TYPE_META: Record<SignalType, { color: string; hex: string; label: string }> = {
  PRICING: { color: 'teal', hex: '#2D7A78', label: 'Pricing' },
  PRODUCT: { color: 'steel', hex: '#47739A', label: 'Product' },
  HIRING: { color: 'plum', hex: '#7A5B8E', label: 'Hiring' },
  MESSAGING: { color: 'bronze', hex: '#B9783B', label: 'Messaging' },
  STRATEGY: { color: 'sage', hex: '#4B6E58', label: 'Strategy' },
};

export const IMPORTANCE_META: Record<Importance, { label: string; hex: string }> = {
  low: { label: 'Low', hex: '#64748B' },
  medium: { label: 'Medium', hex: '#47739A' },
  high: { label: 'High', hex: '#B9783B' },
  critical: { label: 'Critical', hex: '#C25B5B' },
};

export const CONFIDENCE_META: Record<Confidence, { label: string; hex: string; pct: number }> = {
  low: { label: 'Low', hex: '#64748B', pct: 40 },
  medium: { label: 'Medium', hex: '#47739A', pct: 65 },
  high: { label: 'High', hex: '#4B6E58', pct: 87 },
};
