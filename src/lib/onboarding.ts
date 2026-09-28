export type UserType = 'startup-founder' | 'startup-idea' | 'existing-business';

export interface BusinessProfile {
  userType: UserType;
  companyName: string;
  industry: string;
  businessModel: string;
  product: string;
  targetCustomer: string;
  country: string;
  region: string;
  city: string;
  locality: string;
  competitors: string[];
  website: string;
  objective: string;
  startupIdea?: string;
  problem?: string;
  targetUsers?: string;
  expectedMarket?: string;
  startupStage?: string;
  traction?: string;
  strategicConcern?: string;
  businessStage?: string;
  currentChallenge?: string;
  businessGoal?: string;
}

const PROFILE_KEY = 'mindra-business-profile-v1';

export function loadBusinessProfile(): BusinessProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) as BusinessProfile : null;
  } catch {
    return null;
  }
}

export function saveBusinessProfile(profile: BusinessProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearBusinessProfile(): void {
  localStorage.removeItem(PROFILE_KEY);
}

export const userTypeCopy: Record<UserType, { title: string; description: string; cta: string }> = {
  'startup-founder': {
    title: 'STARTUP FOUNDER',
    description: 'I have a startup and want to understand competitors, market movements and strategic opportunities.',
    cta: 'CONTINUE AS STARTUP FOUNDER',
  },
  'startup-idea': {
    title: 'STARTUP IDEA',
    description: 'I have a startup idea and want to validate, analyze the market and discover opportunities before building.',
    cta: 'CONTINUE WITH STARTUP IDEA',
  },
  'existing-business': {
    title: 'EXISTING BUSINESS',
    description: 'I already run a business and want to improve my competitive position, strategy and market performance.',
    cta: 'IMPROVE MY BUSINESS',
  },
};
