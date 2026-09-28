import type { Confidence, Competitor, Pattern, Signal } from './types';
import { seededRandom, hashString } from './dataEngineHelpers';

export interface ForecastScenario {
  id: string;
  competitorName: string;
  scenario: string;
  evidence: string[];
  historicalAnalogs: string;
  timeHorizon: string;
  confidence: Confidence;
  patternMatch: number;
}

const SCENARIO_TEMPLATES = [
  'Enterprise product expansion — new vertical-specific offering likely within {horizon}.',
  'Pricing model restructuring — shift in pricing strategy likely within {horizon}.',
  'Geographic expansion — new market entry likely within {horizon}.',
  'Product pivot — new feature set or product direction likely within {horizon}.',
  'Go-to-market shift — messaging and positioning change likely within {horizon}.',
];

const HORIZONS = ['4–8 weeks', '8–12 weeks', '12–16 weeks', '6–10 weeks'];
const CONFIDENCES: Confidence[] = ['low', 'medium', 'high'];

export function generateForecastScenarios(competitors: Competitor[], patterns: Pattern[]): ForecastScenario[] {
  const scenarios: ForecastScenario[] = [];

  for (const comp of competitors) {
    const compPatterns = patterns.filter(p => p.competitorId === comp.id);
    if (compPatterns.length === 0) continue;

    const rng = seededRandom(hashString(comp.id) + 5000);
    const topPattern = compPatterns.sort((a, b) => b.patternMatch - a.patternMatch)[0];
    const horizon = HORIZONS[Math.floor(rng() * HORIZONS.length)];
    const template = SCENARIO_TEMPLATES[Math.floor(rng() * SCENARIO_TEMPLATES.length)];

    scenarios.push({
      id: `fc-${comp.id}`,
      competitorName: comp.name,
      scenario: template.replace('{horizon}', horizon),
      evidence: topPattern.evidence.slice(0, 4),
      historicalAnalogs: `Previous ${topPattern.type.replace(/_/g, ' ')} pattern from ${comp.name} preceded a similar strategic shift. Pattern match: ${topPattern.patternMatch}%.`,
      timeHorizon: horizon,
      confidence: topPattern.confidence,
      patternMatch: topPattern.patternMatch,
    });
  }

  return scenarios;
}

export interface ExecutiveInsight {
  competitorName: string;
  insight: string;
  why: string[];
  geographicSignal: string;
  implication: string;
}

export function generateExecutiveInsights(competitors: Competitor[], patterns: Pattern[]): ExecutiveInsight[] {
  const insights: ExecutiveInsight[] = [];

  for (const comp of competitors.slice(0, 4)) {
    const compPatterns = patterns.filter(p => p.competitorId === comp.id);
    if (compPatterns.length === 0) continue;

    const topPattern = compPatterns.sort((a, b) => b.patternMatch - a.patternMatch)[0];

    insights.push({
      competitorName: comp.name,
      insight: `${comp.name} is showing an emerging ${topPattern.name.toLowerCase()}.`,
      why: topPattern.evidence.slice(0, 4),
      geographicSignal: 'Hyderabad enterprise activity also increasing — Telangana tech ecosystem expanding.',
      implication: `Competitive pressure from ${comp.name} may increase. Consider accelerating your positioning in response.`,
    });
  }

  return insights;
}

export interface ReverseGoalResult {
  target: string;
  currentPosition: string;
  requiredChanges: string[];
  requiredCapabilities: string[];
  competitorResponse: string;
  geographicFactors: string;
  potentialScenarios: string[];
  requiredActions: string[];
}

export function generateReverseGoal(target: string, competitors: Competitor[]): ReverseGoalResult {
  const compCount = competitors.length;
  const compNames = competitors.slice(0, 3).map(c => c.name).join(', ') || 'existing competitors';

  return {
    target: target || 'Reach 10% market share in your target segment.',
    currentPosition: `You are tracking ${compCount} competitor${compCount !== 1 ? 's' : ''}. ${compNames} ${compCount > 1 ? 'are' : 'is'} already active in the market.`,
    requiredChanges: [
      'Establish a clear differentiation from tracked competitors',
      'Develop market-specific capabilities and compliance',
      'Build partnerships with 2–3 local system integrators',
      'Create case studies within 90 days of entry',
    ],
    requiredCapabilities: [
      'Enterprise-grade security and compliance (SSO, audit logs, data residency)',
      'Competitive pricing positioned below market leaders',
      'Local customer success and support team',
      'Vertical-specific product features',
    ],
    competitorResponse: `${compNames} ${compCount > 1 ? 'are' : 'is'} already expanding. Expect aggressive pricing and feature competition from established players.`,
    geographicFactors: 'Your target market has growing demand but decision cycles are 4–6 months. Competitive density is increasing.',
    potentialScenarios: [
      'Scenario A: Fast entry via partnership with local integrator — 6–9 months to meaningful share',
      'Scenario B: Direct sales build — 12–18 months to meaningful share, higher control',
      'Scenario C: Product-led growth with self-serve — slower but lower cost, 18–24 months',
    ],
    requiredActions: [
      'Hire 2 sales reps in your target market within 60 days',
      'Achieve compliance certification within 90 days',
      'Sign 1 local partnership within 120 days',
      'Close 3 customer pilots within 180 days',
    ],
  };
}
