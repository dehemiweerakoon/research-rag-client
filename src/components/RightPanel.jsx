import React from 'react';
import { Users, TrendingUp, Hash } from 'lucide-react';

const KEY_AUTHORS = [
  { name: 'Yann', color: '#6d28d9' },
  { name: 'Yoshua', color: '#7c3aed' },
  { name: 'Geoffrey', color: '#059669' },
  { name: 'Ashish', color: '#1e293b' },
];

const TRENDING_TOPICS = [
  { label: 'Deep Learning', count: '34k+' },
  { label: 'Transformers', count: '41k+' },
  { label: 'RAG Systems', count: '29k+' },
  { label: 'LLM Reasoning', count: '38k+' },
  { label: 'Graph Neural Nets', count: '18k+' },
  { label: 'Diffusion Models', count: '22k+' },
];

const CHART_DATA = [
  { year: '2020', ai: 40, dl: 30, llm: 10 },
  { year: '2021', ai: 50, dl: 35, llm: 15 },
  { year: '2022', ai: 60, dl: 45, llm: 30 },
  { year: '2023', ai: 75, dl: 55, llm: 50 },
  { year: '2024', ai: 85, dl: 60, llm: 70 },
  { year: '2025', ai: 90, dl: 65, llm: 85 },
];

export default function RightPanel({ onSelectTopic, onSelectAuthor }) {
  const maxVal = 100;

  return (
    <aside style={{
      width: '280px',
      backgroundColor: '#ffffff',
      borderLeft: '1px solid #f1f0fb',
      padding: '20px 16px',
      overflowY: 'auto',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>

      {/* Key Authors */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={15} style={{ color: '#6d28d9' }} /> Key Authors
          </h3>
          <span style={{ fontSize: '11px', color: '#6d28d9', fontWeight: 700, cursor: 'pointer' }}>View All</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {KEY_AUTHORS.map((a) => (
            <div
              key={a.name}
              onClick={() => onSelectAuthor && onSelectAuthor(a.name)}
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: a.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: 800, marginBottom: '4px'
              }}>
                {a.name[0]}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748b' }}>{a.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={15} style={{ color: '#6d28d9' }} /> Trending Topics
          </h3>
          <span style={{ fontSize: '11px', color: '#6d28d9', fontWeight: 700, cursor: 'pointer' }}>Filter</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {TRENDING_TOPICS.map((t) => (
            <button
              key={t.label}
              onClick={() => onSelectTopic && onSelectTopic(t.label)}
              style={{
                padding: '5px 10px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                fontSize: '11px',
                fontWeight: 600,
                color: '#1e293b',
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ede9fe';
                e.currentTarget.style.borderColor = '#c4b5fd';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              {t.label} <span style={{ color: '#6d28d9', fontWeight: 800, fontSize: '10px' }}>{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Citations Trend Chart */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>Citations Trend</h3>
        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>Indexed papers volume</div>

        <svg viewBox="0 0 240 110" style={{ width: '100%', height: '100px' }}>
          {CHART_DATA.map((d, i) => {
            const x = 10 + i * 40;
            const barW = 24;
            return (
              <g key={d.year}>
                <rect x={x} y={100 - d.ai} width={barW} height={d.ai} rx={4} fill="#6d28d9" opacity={0.85} />
                <rect x={x + 4} y={100 - d.dl} width={barW - 8} height={d.dl} rx={3} fill="#a855f7" opacity={0.7} />
                <rect x={x + 7} y={100 - d.llm} width={barW - 14} height={d.llm} rx={2} fill="#ec4899" opacity={0.8} />
                <text x={x + barW / 2} y={109} textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="inherit">{d.year}</text>
              </g>
            );
          })}
        </svg>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
          <span style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6d28d9', display: 'inline-block' }} /> AI Papers
          </span>
          <span style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7', display: 'inline-block' }} /> Deep Learning
          </span>
          <span style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ec4899', display: 'inline-block' }} /> LLMs
          </span>
        </div>
      </div>

    </aside>
  );
}
