import { SIGNAL_TYPE_META } from '@/lib/types';
import { useStore } from '@/lib/store';
import { generateTicker } from '@/lib/dataEngine';

export default function SignalTicker() {
  const { signals } = useStore();
  const tickerItems = generateTicker(signals);
  const items = tickerItems.length > 0 ? [...tickerItems, ...tickerItems] : [];

  if (items.length === 0) return null;

  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-black/30 py-3">
      <div className="flex gap-8 ticker-track whitespace-nowrap">
        {items.map((item, i) => {
          const meta = SIGNAL_TYPE_META[item.type as keyof typeof SIGNAL_TYPE_META];
          return (
            <div key={i} className="flex items-center gap-2.5 text-sm">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: meta?.hex ?? '#64748B', boxShadow: `0 0 8px ${meta?.hex ?? '#64748B'}` }} />
              <span className="text-slate-500">{item.name}</span>
              <span className="text-slate-300">— {item.text}</span>
            </div>
          );
        })}
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0F14] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0F14] to-transparent pointer-events-none" />
    </div>
  );
}
