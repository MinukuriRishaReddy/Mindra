import type { Competitor, Signal } from './types';
import { seededRandom, hashString } from './dataEngineHelpers';

export type GeoLevel = 'global' | 'country' | 'state' | 'district' | 'city' | 'locality';

export interface GeoData {
  level: GeoLevel;
  name: string;
  signals: { label: string; type: string; color: string }[];
  kpis: { label: string; value: string }[];
  competitors: string[];
  trends: string[];
  opportunities: string[];
  risks: string[];
  historicalContext: string;
  memory: string;
}

const LEVEL_NAMES: { level: GeoLevel; name: string }[] = [
  { level: 'global', name: 'GLOBAL' },
  { level: 'country', name: 'INDIA' },
  { level: 'state', name: 'TELANGANA' },
  { level: 'district', name: 'HYDERABAD DISTRICT' },
  { level: 'city', name: 'HYDERABAD' },
  { level: 'locality', name: 'HITEC CITY' },
];

const SIGNAL_LABELS: Record<GeoLevel, string[]> = {
  global: ['AI enterprise adoption increasing across Fortune 500', 'Global AI SaaS pricing trending upward 8% YoY', 'AI engineering talent demand at record high'],
  country: ['India enterprise AI spending increasing 45% YoY', 'DPDP Act compliance requirements expanding', 'Major Indian enterprises announcing AI partnerships'],
  state: ['Telangana tech ecosystem expanding — 200+ AI startups registered', 'State AI policy incentives launched', 'Hyderabad IT corridor hiring surge'],
  district: ['Startup activity density increasing in Hyderabad district', 'New tech park developments announced'],
  city: ['Enterprise AI demand increasing in Hyderabad', 'Major enterprises seeking AI platforms', 'AI engineering roles posted by local enterprises'],
  locality: ['HITEC City has increased enterprise AI activity', 'Nearby AI startups raising rounds', 'Local enterprise offices piloting AI platforms'],
};

const KPIS: Record<GeoLevel, { label: string; value: string }[]> = {
  global: [{ label: 'AI Market Growth', value: '+37% YoY' }, { label: 'Enterprise Adoption', value: '68%' }, { label: 'Avg Deal Size', value: '$84K' }],
  country: [{ label: 'AI Spending Growth', value: '+45% YoY' }, { label: 'Enterprise IT Budget', value: '$12B' }, { label: 'AI Talent Pool', value: '500K+' }],
  state: [{ label: 'Tech Companies', value: '1,500+' }, { label: 'AI Startups', value: '200+' }, { label: 'IT Export', value: '$32B' }],
  district: [{ label: 'Population', value: '10.5M' }, { label: 'Business Density', value: 'High' }, { label: 'Startup Activity', value: '+28% YoY' }],
  city: [{ label: 'Enterprise Demand', value: 'High' }, { label: 'Competitors Present', value: '12+' }, { label: 'Avg AI Budget', value: '$2.1M' }],
  locality: [{ label: 'Tech Companies Nearby', value: '300+' }, { label: 'Enterprise Pilots', value: '15+' }, { label: 'Avg Pricing', value: '$15/user/mo' }],
};

const TRENDS: Record<GeoLevel, string[]> = {
  global: ['AI adoption accelerating', 'Enterprise demand surging', 'Pricing models shifting to usage-based'],
  country: ['Digital India accelerating AI adoption', 'Regulatory framework maturing', 'Domestic AI models emerging'],
  state: ['Tech ecosystem expanding rapidly', 'Government AI incentives active', 'Workforce skilling programs'],
  district: ['Urban tech concentration', 'Startup density rising'],
  city: ['Enterprise AI demand rising', 'Local competition growing', 'Customer segments diversifying'],
  locality: ['Enterprise AI pilot activity', 'Local vendor emergence'],
};

const OPPORTUNITIES: Record<GeoLevel, string[]> = {
  global: ['Enterprise AI expansion', 'Vertical-specific AI solutions', 'Cost-efficient inference'],
  country: ['India-specific AI solutions', 'Compliance-first products', 'Vernacular AI'],
  state: ['State-backed AI incentives', 'Growing talent pool', 'Collaboration with academic institutions'],
  district: ['High-density customer base', 'Tech-savvy workforce'],
  city: ['Enterprise AI market entry', 'Partnership with local enterprises', 'Vertical-specific AI for Indian market'],
  locality: ['Local enterprise AI opportunity', 'Reduced competitive density in enterprise segment'],
};

const RISKS: Record<GeoLevel, string[]> = {
  global: ['Regulatory uncertainty', 'Model commoditization', 'Talent shortage'],
  country: ['Data localization requirements', 'Price sensitivity', 'Regulatory changes'],
  state: ['Talent competition from global firms', 'Infrastructure constraints'],
  district: ['Market saturation in segments'],
  city: ['Competitive density increasing', 'Price competition from local vendors'],
  locality: ['Limited local partner network'],
};

const HISTORICAL: Record<GeoLevel, string> = {
  global: 'AI market has grown 3× in 18 months. Enterprise segment leading growth.',
  country: 'India AI market grew from $6B to $12B in 2 years. Enterprise segment is the fastest-growing.',
  state: 'Telangana launched AI city initiative. Hyderabad is the primary tech hub with 1,500+ tech companies.',
  district: 'Hyderabad district contains the core tech corridor — HITEC City, Madhapur, Gachibowli.',
  city: "Hyderabad is India's second-largest tech hub. Enterprise AI adoption is accelerating across IT, healthcare and finance.",
  locality: 'HITEC City is the core tech corridor. Most enterprise HQs and tech offices are within 3km radius.',
};

const MEMORY: Record<GeoLevel, string> = {
  global: 'Global AI adoption pattern: initial pilot → team expansion → enterprise-wide deployment. Average cycle: 6–9 months.',
  country: 'Indian enterprise AI adoption follows global pattern but with 3–4 month lag. Compliance requirements often drive adoption.',
  state: 'Telangana tech growth pattern: infrastructure investment → talent attraction → startup ecosystem → enterprise adoption.',
  district: 'District-level pattern: tech park development → startup clustering → enterprise presence expansion.',
  city: 'Hyderabad enterprise pattern: pilot → internal AI team → platform purchase → expansion. Average decision cycle: 4–6 months.',
  locality: 'HITEC City pattern: tech office opens → AI pilot initiated → vendor selection → expansion to other offices.',
};

const COLORS = ['#4B6E58', '#2D7A78', '#7A5B8E', '#B9783B', '#47739A'];
const SIGNAL_TYPES = ['STRATEGY', 'PRICING', 'HIRING', 'PRODUCT', 'MESSAGING'];

export function generateGeoHierarchy(competitors: Competitor[]): GeoData[] {
  const compNames = competitors.length > 0 ? competitors.map(c => c.name) : ['OpenAI', 'Anthropic', 'Perplexity', 'Cohere', 'Mistral'];

  return LEVEL_NAMES.map((ln, idx) => {
    const rng = seededRandom(hashString(ln.name) + idx);
    const signalCount = idx < 2 ? 3 : idx < 4 ? 2 : 3;
    const labels = SIGNAL_LABELS[ln.level];
    const selectedSignals = labels.slice(0, signalCount).map((label, i) => ({
      label,
      type: SIGNAL_TYPES[idx % SIGNAL_TYPES.length],
      color: COLORS[(idx + i) % COLORS.length],
    }));

    return {
      level: ln.level,
      name: ln.name,
      signals: selectedSignals,
      kpis: KPIS[ln.level],
      competitors: idx === 0 ? compNames.slice(0, 5) : compNames.slice(0, Math.max(2, 5 - idx)),
      trends: TRENDS[ln.level],
      opportunities: OPPORTUNITIES[ln.level],
      risks: RISKS[ln.level],
      historicalContext: HISTORICAL[ln.level],
      memory: MEMORY[ln.level],
    };
  });
}

export function generateCorrelationFlow(geoHierarchy: GeoData[]): { label: string; text: string; color: string }[] {
  return geoHierarchy.map((g, i) => ({
    label: g.name,
    text: g.signals[0]?.label || 'Signal detected',
    color: COLORS[i % COLORS.length],
  }));
}

export function generateLocalIntelligenceBrief(competitors: Competitor[], geoHierarchy: GeoData[]): {
  title: string;
  evidence: string[];
  insight: string;
  confidence: 'high' | 'medium' | 'low';
} {
  const compNames = competitors.length > 0 ? competitors.map(c => c.name).slice(0, 3).join(', ') : 'tracked competitors';
  const evidence = geoHierarchy.map(g => `${g.name}: ${g.signals[0]?.label || 'signal detected'}`);

  return {
    title: `Hyderabad shows increasing enterprise AI activity while ${competitors.length} competitors are active in the region.`,
    evidence,
    insight: `Potential local enterprise AI opportunity detected. Competitive density is concentrated — early movers can capture enterprise share before market saturates. Active competitors: ${compNames}.`,
    confidence: competitors.length > 2 ? 'high' : 'medium',
  };
}
