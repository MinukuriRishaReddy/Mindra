import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Rocket, Lightbulb, Building2, Plus, X } from 'lucide-react';
import { type UserType, type BusinessProfile, userTypeCopy, saveBusinessProfile } from '@/lib/onboarding';

interface OnboardingProps {
  onComplete: (profile: BusinessProfile) => void;
  onBack: () => void;
}

const userTypes: { type: UserType; icon: typeof Rocket }[] = [
  { type: 'startup-founder', icon: Rocket },
  { type: 'startup-idea', icon: Lightbulb },
  { type: 'existing-business', icon: Building2 },
];

export default function Onboarding({ onComplete, onBack }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [form, setForm] = useState<Partial<BusinessProfile>>({
    competitors: [],
  });
  const [competitorInput, setCompetitorInput] = useState('');

  function selectType(type: UserType) {
    setUserType(type);
    setForm({ ...form, userType: type });
    setStep(1);
  }

  function update<K extends keyof BusinessProfile>(key: K, value: BusinessProfile[K]) {
    setForm({ ...form, [key]: value });
  }

  function addCompetitor() {
    if (!competitorInput.trim()) return;
    update('competitors', [...(form.competitors ?? []), competitorInput.trim()]);
    setCompetitorInput('');
  }

  function removeCompetitor(c: string) {
    update('competitors', (form.competitors ?? []).filter((x) => x !== c));
  }

  function handleComplete() {
    if (!userType) return;
    const profile = form as BusinessProfile;
    saveBusinessProfile(profile);
    onComplete(profile);
  }

  const canProceed = step === 0 || (step === 1 && form.companyName && form.industry);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-12">
      <div className="w-full max-w-2xl">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back
          </button>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">WELCOME TO MINDRA</h1>
                <p className="text-slate-400">Tell Mindra where you are in your business journey.</p>
              </div>
              <div className="space-y-4">
                {userTypes.map(({ type, icon: Icon }, i) => {
                  const copy = userTypeCopy[type];
                  return (
                    <motion.button
                      key={type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -4 }}
                      onClick={() => selectType(type)}
                      className="group w-full text-left glass rounded-2xl p-6 transition-all hover:border-teal-500/20"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.15), rgba(122,91,142,0.15))', border: '1px solid rgba(45,122,120,0.2)' }}>
                          <Icon className="w-6 h-6 text-teal-400" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1">{copy.title}</h3>
                          <p className="text-sm text-slate-400 mb-3">{copy.description}</p>
                          <span className="text-xs text-teal-400 group-hover:text-teal-300 flex items-center gap-1">
                            {copy.cta} <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="mb-8">
                <div className="text-xs uppercase tracking-wider text-teal-400 mb-2">{userTypeCopy[userType!].title}</div>
                <h1 className="text-2xl font-bold text-white mb-1">Business Context</h1>
                <p className="text-sm text-slate-500">Tell Mindra about your business so it can tailor intelligence to your context.</p>
              </div>

              <div className="space-y-4">
                <Field label="Company / Startup Name" value={form.companyName ?? ''} onChange={(v) => update('companyName', v)} placeholder="e.g. Nova AI" />
                <Field label="Industry" value={form.industry ?? ''} onChange={(v) => update('industry', v)} placeholder="AI SaaS" />
                <Field label="Business Model" value={form.businessModel ?? ''} onChange={(v) => update('businessModel', v)} placeholder="B2B SaaS, usage-based" />
                <Field label="Primary Product / Service" value={form.product ?? ''} onChange={(v) => update('product', v)} placeholder="AI scheduling platform" />
                <Field label="Target Customer" value={form.targetCustomer ?? ''} onChange={(v) => update('targetCustomer', v)} placeholder="Mid-market enterprises" />
                <Field label="Website URL" value={form.website ?? ''} onChange={(v) => update('website', v)} placeholder="novaai.com" />

                <div className="grid grid-cols-3 gap-3">
                  <Field label="Country" value={form.country ?? ''} onChange={(v) => update('country', v)} placeholder="India" />
                  <Field label="State / Region" value={form.region ?? ''} onChange={(v) => update('region', v)} placeholder="Telangana" />
                  <Field label="City" value={form.city ?? ''} onChange={(v) => update('city', v)} placeholder="Hyderabad" />
                </div>
                <Field label="Locality (optional)" value={form.locality ?? ''} onChange={(v) => update('locality', v)} placeholder="HITEC City" />

                {/* Competitors */}
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 block">Competitors</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={competitorInput}
                      onChange={(e) => setCompetitorInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCompetitor(); } }}
                      placeholder="Add competitor (e.g. OpenAI)"
                      className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500/30 transition-colors"
                    />
                    <button onClick={addCompetitor} className="px-3 rounded-xl bg-teal-500/15 border border-teal-500/20 text-teal-400">
                      <Plus className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(form.competitors ?? []).map((c) => (
                      <span key={c} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-300">
                        {c}
                        <button onClick={() => removeCompetitor(c)}><X className="w-3 h-3 text-slate-500 hover:text-clay-400" strokeWidth={1.5} /></button>
                      </span>
                    ))}
                  </div>
                </div>

                <Field label="Main Business Objective" value={form.objective ?? ''} onChange={(v) => update('objective', v)} placeholder="Enter Hyderabad enterprise market within 6 months" />
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={onBack} className="text-sm text-slate-500 hover:text-white transition-colors">Cancel</button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceed}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.2), rgba(122,91,142,0.2))', border: '1px solid rgba(45,122,120,0.25)' }}
                >
                  Continue <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="mb-8">
                <div className="text-xs uppercase tracking-wider text-teal-400 mb-2">{userTypeCopy[userType!].title}</div>
                <h1 className="text-2xl font-bold text-white mb-1">Additional Context</h1>
                <p className="text-sm text-slate-500">Help Mindra understand your specific situation.</p>
              </div>

              <div className="space-y-4">
                {userType === 'startup-idea' && (
                  <>
                    <Field label="Startup Idea" value={form.startupIdea ?? ''} onChange={(v) => update('startupIdea', v)} placeholder="AI scheduling platform for healthcare" />
                    <Field label="Problem Being Solved" value={form.problem ?? ''} onChange={(v) => update('problem', v)} placeholder="Healthcare scheduling is manual and inefficient" />
                    <Field label="Target Users" value={form.targetUsers ?? ''} onChange={(v) => update('targetUsers', v)} placeholder="Hospital administrators" />
                    <Field label="Expected Market" value={form.expectedMarket ?? ''} onChange={(v) => update('expectedMarket', v)} placeholder="India healthcare AI — $2B" />
                  </>
                )}
                {userType === 'startup-founder' && (
                  <>
                    <Field label="Startup Stage" value={form.startupStage ?? ''} onChange={(v) => update('startupStage', v)} placeholder="Seed / Pre-Series A" />
                    <Field label="Current Traction" value={form.traction ?? ''} onChange={(v) => update('traction', v)} placeholder="12 paying customers, $8K MRR" />
                    <Field label="Target Market" value={form.expectedMarket ?? ''} onChange={(v) => update('expectedMarket', v)} placeholder="Mid-market enterprises in India" />
                    <Field label="Main Strategic Concern" value={form.strategicConcern ?? ''} onChange={(v) => update('strategicConcern', v)} placeholder="Anthropic expanding into our segment" />
                  </>
                )}
                {userType === 'existing-business' && (
                  <>
                    <Field label="Current Business Stage" value={form.businessStage ?? ''} onChange={(v) => update('businessStage', v)} placeholder="Growth stage — 50 employees" />
                    <Field label="Current Challenge" value={form.currentChallenge ?? ''} onChange={(v) => update('currentChallenge', v)} placeholder="Losing enterprise deals to Anthropic" />
                    <Field label="Business Goal" value={form.businessGoal ?? ''} onChange={(v) => update('businessGoal', v)} placeholder="Increase enterprise market share by 15%" />
                  </>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back
                </button>
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, rgba(45,122,120,0.2), rgba(122,91,142,0.2))', border: '1px solid rgba(45,122,120,0.25)' }}
                >
                  <Check className="w-4 h-4" strokeWidth={1.5} /> Start Intelligence
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 block">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500/30 transition-colors"
      />
    </div>
  );
}
