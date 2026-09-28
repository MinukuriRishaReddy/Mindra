import { useState } from 'react';
import { useStore } from '@/lib/store';
import { generateRadarData } from '@/lib/dataEngine';

const COMP_COLORS = ['#2D7A78', '#7A5B8E', '#4B6E58', '#B9783B'];

export default function CompetitorRadar() {
  const { competitors } = useStore();
  const [active, setActive] = useState<string | null>(null);
  const cx = 150, cy = 150, maxR = 110;
  const axes = generateRadarData(competitors);
  const compNames = competitors.slice(0, 4).map(c => c.name);
  const compColors: Record<string, string> = {};
  compNames.forEach((name, i) => { compColors[name] = COMP_COLORS[i % COMP_COLORS.length]; });

  function getPoint(axisIndex: number, value: number) {
    const angle = (axisIndex / axes.length) * Math.PI * 2 - Math.PI / 2;
    const r = (value / 100) * maxR;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  }

  function getAxisPoint(index: number, r: number) {
    const angle = (index / axes.length) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  }

  function polygonPoints(comp: string) {
    return axes.map((a, i) => {
      const p = getPoint(i, (a as Record<string, number | string>)[comp] as number);
      return `${p.x},${p.y}`;
    }).join(' ');
  }

  if (compNames.length === 0) {
    return <div className="text-center text-slate-500 py-8 text-sm">Add competitors to see the radar chart.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8">
      <div className="relative">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {[0.25, 0.5, 0.75, 1].map((frac) => (
            <polygon
              key={frac}
              points={axes.map((_, i) => {
                const p = getAxisPoint(i, maxR * frac);
                return `${p.x},${p.y}`;
              }).join(' ')}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}
          {axes.map((_, i) => {
            const p = getAxisPoint(i, maxR);
            return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />;
          })}
          {axes.map((a, i) => {
            const p = getAxisPoint(i, maxR + 18);
            return (
              <text key={a.axis} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#64748B" className="select-none">
                {a.axis}
              </text>
            );
          })}
          {compNames.map((comp) => {
            const isActive = active === comp || active === null;
            const color = compColors[comp];
            return (
              <polygon
                key={comp}
                points={polygonPoints(comp)}
                fill={color + (isActive ? '20' : '08')}
                stroke={color}
                strokeWidth={isActive ? 1.5 : 0.5}
                opacity={isActive ? 1 : 0.3}
                className="transition-all cursor-pointer"
                onClick={() => setActive(active === comp ? null : comp)}
              />
            );
          })}
          <circle cx={cx} cy={cy} r="3" fill="rgba(45,122,120,0.3)" />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Click to highlight</div>
        {compNames.map((comp) => (
          <button
            key={comp}
            onClick={() => setActive(active === comp ? null : comp)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all text-left ${active === comp ? 'glass-strong' : 'glass'}`}
            style={active === comp ? { border: `1px solid ${compColors[comp]}40` } : {}}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: compColors[comp], boxShadow: `0 0 8px ${compColors[comp]}80` }} />
            <span className="text-sm text-white font-medium">{comp}</span>
            {active === comp && <span className="text-xs text-slate-500 ml-auto">Active</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
