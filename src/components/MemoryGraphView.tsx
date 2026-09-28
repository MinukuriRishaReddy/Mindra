import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MemoryGraph, MemoryNode } from '@/lib/types';

interface MemoryGraphViewProps {
  graph: MemoryGraph;
}

const nodeColors: Record<MemoryNode['type'], string> = {
  signal: '#2D7A78',
  observation: '#47739A',
  pattern: '#7A5B8E',
  product: '#47739A',
  market: '#4B6E58',
  competitor: '#B9783B',
};

const nodeRadius: Record<MemoryNode['type'], number> = {
  signal: 8,
  observation: 7,
  pattern: 12,
  product: 10,
  market: 14,
  competitor: 16,
};

export default function MemoryGraphView({ graph }: MemoryGraphViewProps) {
  const [selected, setSelected] = useState<MemoryNode | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div className="relative w-full aspect-[4/3] glass rounded-2xl overflow-hidden">
      <svg ref={svgRef} viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {graph.edges.map((edge, i) => {
          const from = graph.nodes.find((n) => n.id === edge.from);
          const to = graph.nodes.find((n) => n.id === edge.to);
          if (!from || !to) return null;
          return (
            <g key={i}>
              <line
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="rgba(45,122,120,0.15)"
                strokeWidth="0.3"
              />
              <line
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="rgba(45,122,120,0.3)"
                strokeWidth="0.15"
                strokeDasharray="1 2"
                style={{ animation: `dash-flow ${3 + i * 0.5}s linear infinite` }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {graph.nodes.map((node) => {
          const color = nodeColors[node.type];
          const r = nodeRadius[node.type];
          const isSelected = selected?.id === node.id;
          return (
            <g key={node.id} className="cursor-pointer" onClick={() => setSelected(node)}>
              {isSelected && (
                <circle cx={node.x} cy={node.y} r={r + 4} fill="none" stroke={color} strokeWidth="0.3" opacity="0.5" style={{ animation: 'pulse-ring 1.5s ease-out infinite' }} />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={`${color}30`}
                stroke={color}
                strokeWidth="0.4"
                filter="url(#glow)"
                className="transition-all"
                style={{ opacity: isSelected ? 1 : 0.7 }}
              />
              <text
                x={node.x}
                y={node.y + r + 3}
                textAnchor="middle"
                fontSize="2.2"
                fill={isSelected ? '#E2E8F0' : '#94A3B8'}
                className="pointer-events-none select-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute top-4 left-4 flex flex-wrap gap-3">
        {graph.observations > 0 && (
          <div className="glass px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-500">Observations: </span>
            <span className="text-teal-400 font-medium">{graph.observations}</span>
          </div>
        )}
        {graph.connectedEvents > 0 && (
          <div className="glass px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-500">Connected Events: </span>
            <span className="text-steel-400 font-medium">{graph.connectedEvents}</span>
          </div>
        )}
        {graph.recurringPatterns > 0 && (
          <div className="glass px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-500">Recurring Patterns: </span>
            <span className="text-plum-400 font-medium">{graph.recurringPatterns}</span>
          </div>
        )}
        {graph.historicalSequences > 0 && (
          <div className="glass px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-500">Historical Sequences: </span>
            <span className="text-sage-400 font-medium">{graph.historicalSequences}</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        {Object.entries(nodeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            {type}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-4 right-4 bottom-4 w-64 glass-strong rounded-xl p-4 overflow-y-auto"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: nodeColors[selected.type], boxShadow: `0 0 8px ${nodeColors[selected.type]}` }} />
              <span className="text-xs uppercase tracking-wider font-medium" style={{ color: nodeColors[selected.type] }}>{selected.type}</span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">{selected.label}</h4>
            <p className="text-xs text-slate-400">{selected.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
