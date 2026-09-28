import { useState, useEffect, useCallback } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IntelligencePulse from '@/components/IntelligencePulse';
import Intro from '@/pages/Intro';
import Onboarding from '@/pages/Onboarding';
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import Competitors from '@/pages/Competitors';
import CompetitorDetail from '@/pages/CompetitorDetail';
import Signals from '@/pages/Signals';
import Patterns from '@/pages/Patterns';
import Memory from '@/pages/Memory';
import IntelligenceWorkflow from '@/pages/IntelligenceWorkflow';
import GeographicIntelligence from '@/pages/GeographicIntelligence';
import Forecast from '@/pages/Forecast';
import Goals from '@/pages/Goals';
import GoalMap from '@/pages/GoalMap';
import BusinessImprovement from '@/pages/BusinessImprovement';
import { loadBusinessProfile, type BusinessProfile } from '@/lib/onboarding';

type AppView = 'intro' | 'onboarding' | 'app';

function App() {
  const [view, setView] = useState<AppView>(() => {
    const path = window.location.pathname;
    if (path === '/intro') return 'intro';
    if (path === '/onboarding') return 'onboarding';
    return 'app';
  });
  const [route, setRoute] = useState(window.location.pathname);
  const [profile, setProfile] = useState<BusinessProfile | null>(() => loadBusinessProfile());

  useEffect(() => {
    const onPop = () => {
      const p = window.location.pathname;
      setRoute(p);
      if (p === '/intro') setView('intro');
      else if (p === '/onboarding') setView('onboarding');
      else setView('app');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((r: string) => {
    window.history.pushState({}, '', r);
    setRoute(r);
    if (r === '/intro') setView('intro');
    else if (r === '/onboarding') setView('onboarding');
    else setView('app');
    window.scrollTo(0, 0);
  }, []);

  function handleGetStarted() {
    navigate('/onboarding');
  }

  function handleOnboardingComplete(p: BusinessProfile) {
    setProfile(p);
    navigate('/goal-map');
  }

  function renderPage() {
    if (route === '/' || route === '/landing') return <Landing onNavigate={navigate} />;
    if (route === '/dashboard') return <Dashboard onNavigate={navigate} />;
    if (route === '/competitors') return <Competitors onNavigate={navigate} />;
    if (route === '/signals') return <Signals />;
    if (route === '/patterns') return <Patterns />;
    if (route === '/memory') return <Memory onNavigate={navigate} />;
    if (route === '/workflow') return <IntelligenceWorkflow />;
    if (route === '/geographic-intelligence') return <GeographicIntelligence />;
    if (route === '/forecast') return <Forecast />;
    if (route === '/goals') return <Goals />;
    if (route === '/goal-map') return <GoalMap profile={profile} onNavigate={navigate} />;
    if (route === '/strategy') return <BusinessImprovement onNavigate={navigate} />;
    if (route.startsWith('/competitor/')) {
      const id = route.split('/competitor/')[1];
      return <CompetitorDetail competitorId={id} onNavigate={navigate} />;
    }
    return <Landing onNavigate={navigate} />;
  }

  if (view === 'intro') {
    return (
      <div className="min-h-screen bg-[#0A0F14] text-slate-200 relative">
        <NeuralBackground />
        <Intro onGetStarted={handleGetStarted} />
      </div>
    );
  }

  if (view === 'onboarding') {
    return (
      <div className="min-h-screen bg-[#0A0F14] text-slate-200 relative">
        <NeuralBackground />
        <Onboarding onComplete={handleOnboardingComplete} onBack={() => navigate('/intro')} />
      </div>
    );
  }

  const showFooter = route === '/' || route === '/dashboard' || route === '/landing';
  const showPulse = route !== '/' && route !== '/landing';

  return (
    <div className="min-h-screen bg-[#0A0F14] text-slate-200 relative">
      <NeuralBackground />
      <Navbar route={route} onNavigate={navigate} />
      {renderPage()}
      {showPulse && <IntelligencePulse />}
      {showFooter && <Footer onNavigate={navigate} />}
    </div>
  );
}

export default App;
