import { motion } from 'framer-motion';
import { fourteenSteps, continuousLearningLoop } from '@/lib/userStrategy';

export default function IntelligenceWorkflow() {
  return (
    <div className="relative z-10 pt-32 pb-12 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-bold text-white mb-3">
          INFORMATION IS EVERYWHERE.
        </motion.h1>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-4xl font-bold text-gradient-violet mb-6">
          MEMORY ISN'T.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-slate-400 max-w-2xl mx-auto">
          Mindra does not treat every signal as an isolated event. It continuously: RETAIN → RECALL → ANALYZE → FORECAST → ACT → EVALUATE → LEARN
        </motion.p>
      </div>

      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-xl font-semibold text-white text-center mb-8">How Mindra Thinks</motion.h2>

      {/* 14-step workflow */}
      <div className="glass rounded-2xl p-6 sm:p-8 mb-12 overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-2 gap-3">
            {fourteenSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}>
                  {step.num}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white">{step.short}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{step.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-500 text-center mt-6 italic">Figure 2. End-to-end intelligence workflow from setup to continuous learning.</p>
      </div>

      {/* Continuous learning loop */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Continuous Learning Loop</h2>
        <p className="text-sm text-slate-500">Mindra's memory compounds over time — each outcome feeds back into the next cycle.</p>
      </div>

      <div className="glass rounded-2xl p-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {continuousLearningLoop.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
                className="px-4 py-2 rounded-xl text-xs font-bold tracking-wider"
                style={{ background: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}
              >
                {step.label}
              </motion.div>
              {i < continuousLearningLoop.length - 1 && <span className="text-slate-600">→</span>}
            </div>
          ))}
          <span className="text-slate-600 ml-2">↻</span>
        </div>
      </div>
    </div>
  );
}
