import type { UserType } from './onboarding';

export interface UserStrategySection {
  title: string;
  icon: string;
  items: { label: string; value: string; color: string }[];
}

export interface UserStrategy {
  focus: string[];
  sections: UserStrategySection[];
}

export function getUserStrategy(userType: UserType): UserStrategy {
  switch (userType) {
    case 'startup-founder':
      return {
        focus: ['Competitors', 'Market Trends', 'Growth Opportunities', 'Product Strategy', 'Pricing', 'Hiring', 'Forecasting'],
        sections: [
          {
            title: 'Competitive Landscape',
            icon: 'Users',
            items: [
              { label: 'Tracked Competitors', value: '3 active', color: '#2D7A78' },
              { label: 'Top Threat', value: 'Anthropic — enterprise expansion', color: '#C25B5B' },
              { label: 'Opportunity', value: 'Mid-market pricing gap detected', color: '#4B6E58' },
            ],
          },
          {
            title: 'Growth Signals',
            icon: 'TrendingUp',
            items: [
              { label: 'Hiring Momentum', value: 'Anthropic +12 roles this week', color: '#7A5B8E' },
              { label: 'Pricing Trend', value: 'OpenAI restructuring — gap forming', color: '#2D7A78' },
              { label: 'Product Activity', value: '2 enterprise launches this month', color: '#47739A' },
            ],
          },
          {
            title: 'Strategic Recommendations',
            icon: 'Lightbulb',
            items: [
              { label: 'Product', value: 'Differentiate through vertical specialization', color: '#4B6E58' },
              { label: 'Pricing', value: 'Position between OpenAI mid-tier and enterprise', color: '#B9783B' },
              { label: 'Hiring', value: 'Build enterprise sales team — market is shifting', color: '#7A5B8E' },
            ],
          },
        ],
      };
    case 'startup-idea':
      return {
        focus: ['Market Validation', 'Competitor Landscape', 'Market Gaps', 'Geographic Opportunities', 'Pricing Benchmarks', 'Potential Risks', 'Existing Alternatives'],
        sections: [
          {
            title: 'Market Validation',
            icon: 'Search',
            items: [
              { label: 'Market Size', value: 'Global AI market: $180B, growing 37% YoY', color: '#4B6E58' },
              { label: 'Demand Signal', value: 'Enterprise AI demand classified as High', color: '#2D7A78' },
              { label: 'Timing', value: 'Favorable — market expanding rapidly', color: '#4B6E58' },
            ],
          },
          {
            title: 'Competitive Gaps',
            icon: 'Network',
            items: [
              { label: 'Pricing Gap', value: 'Mid-market segment underserved between $15–$45/user/mo', color: '#B9783B' },
              { label: 'Vertical Gap', value: 'No dominant vertical-specific AI platform for healthcare', color: '#2D7A78' },
              { label: 'Geographic Gap', value: 'India enterprise AI — limited local vendors', color: '#47739A' },
            ],
          },
          {
            title: 'Risks & Alternatives',
            icon: 'AlertTriangle',
            items: [
              { label: 'Risk', value: 'OpenAI and Anthropic expanding enterprise — may close gaps', color: '#C25B5B' },
              { label: 'Alternative', value: '5+ existing competitors in general AI space', color: '#B9783B' },
              { label: 'Mitigation', value: 'Focus on vertical or geography before entering', color: '#4B6E58' },
            ],
          },
        ],
      };
    case 'existing-business':
      return {
        focus: ['Competitive Positioning', 'Market Share Signals', 'Competitor Movement', 'Pricing', 'Customer Demand', 'Regional Expansion', 'Strategic Improvements'],
        sections: [
          {
            title: 'Current Position',
            icon: 'Activity',
            items: [
              { label: 'Market Position', value: 'Challenger — 2nd tier in enterprise AI', color: '#2D7A78' },
              { label: 'Competitive Pressure', value: 'High — 2 competitors expanding aggressively', color: '#C25B5B' },
              { label: 'Customer Retention', value: 'Stable but at risk from enterprise features', color: '#B9783B' },
            ],
          },
          {
            title: 'Competitor Movement',
            icon: 'TrendingUp',
            items: [
              { label: 'Anthropic', value: 'Enterprise expansion accelerating — 87% pattern match', color: '#7A5B8E' },
              { label: 'OpenAI', value: 'Pricing model restructuring — may disrupt mid-market', color: '#2D7A78' },
              { label: 'Perplexity', value: 'Geographic expansion to EU — limited direct threat', color: '#47739A' },
            ],
          },
          {
            title: 'Strategic Actions',
            icon: 'Lightbulb',
            items: [
              { label: 'Defensive', value: 'Strengthen enterprise security features to match Anthropic', color: '#4B6E58' },
              { label: 'Offensive', value: 'Enter Hyderabad market before competitors consolidate', color: '#2D7A78' },
              { label: 'Pricing', value: 'Lock in mid-market customers before OpenAI restructure', color: '#B9783B' },
            ],
          },
        ],
      };
  }
}

export const startupIdeaFlow = [
  { label: 'IDEA', color: '#2D7A78' },
  { label: 'MARKET', color: '#47739A' },
  { label: 'COMPETITORS', color: '#7A5B8E' },
  { label: 'CUSTOMER', color: '#B9783B' },
  { label: 'GEOGRAPHY', color: '#4B6E58' },
  { label: 'SIGNALS', color: '#2D7A78' },
  { label: 'GAPS', color: '#47739A' },
  { label: 'OPPORTUNITIES', color: '#7A5B8E' },
  { label: 'RISKS', color: '#C25B5B' },
  { label: 'STRATEGIC INSIGHT', color: '#4B6E58' },
];

export const continuousLearningLoop = [
  { label: 'RETAIN', color: '#47739A' },
  { label: 'RECALL', color: '#7A5B8E' },
  { label: 'ANALYZE', color: '#B9783B' },
  { label: 'FORECAST', color: '#2D7A78' },
  { label: 'ACT', color: '#4B6E58' },
  { label: 'OUTCOME', color: '#47739A' },
  { label: 'EVALUATE', color: '#B9783B' },
  { label: 'LEARN', color: '#4B6E58' },
];

export const fourteenSteps = [
  { num: 1, label: 'Select company, competitors, industry & geography', short: 'Business Context', color: '#2D7A78' },
  { num: 2, label: 'Acquire public data + documents with proven provenance', short: 'Signal Collection', color: '#47739A' },
  { num: 3, label: 'Normalize entities, currency, periods, geography', short: 'Normalization', color: '#7A5B8E' },
  { num: 4, label: 'Calculate KPIs + detect material changes', short: 'KPI Detection', color: '#B9783B' },
  { num: 5, label: 'Convert changes into business events', short: 'Business Events', color: '#4B6E58' },
  { num: 6, label: 'HINDSIGHT RETAIN — store event + context + meaning', short: 'Memory Write', color: '#47739A' },
  { num: 7, label: 'HINDSIGHT RECALL — retrieve history + analogs', short: 'Memory Recall', color: '#7A5B8E' },
  { num: 8, label: 'Strategy + scientific model analysis', short: 'Strategy Analysis', color: '#B9783B' },
  { num: 9, label: 'Forecast scenarios with evidence + confidence', short: 'Forecast', color: '#2D7A78' },
  { num: 10, label: 'Executive insight + competitor benchmark', short: 'Executive Insight', color: '#4B6E58' },
  { num: 11, label: 'User sets target values', short: 'User Target', color: '#47739A' },
  { num: 12, label: 'Reverse-goal simulation — what changes are needed?', short: 'Reverse-Goal Sim', color: '#7A5B8E' },
  { num: 13, label: 'User action / business outcome', short: 'User Action', color: '#B9783B' },
  { num: 14, label: 'Evaluate result + RETAIN outcome → continuous learning', short: 'Evaluate + Learn', color: '#4B6E58' },
];
