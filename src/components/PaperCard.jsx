import React, { useState } from 'react';
import { Calendar, Quote, ExternalLink, FileText, ChevronDown, ChevronUp, Tag } from 'lucide-react';

export default function PaperCard({ paper, onOpenModal }) {
  const [expanded, setExpanded] = useState(false);

  // Extract author names safely
  const authorNames = Array.isArray(paper.authors)
    ? paper.authors
        .map((a) => (typeof a === 'string' ? a : a?.author?.display_name || a?.raw_author_name))
        .filter(Boolean)
    : [];

  // Extract topic names safely
  const topicNames = Array.isArray(paper.topics)
    ? paper.topics
        .map((t) => (typeof t === 'string' ? t : t?.display_name || t?.name))
        .filter(Boolean)
        .slice(0, 3)
    : [];

  return (
    <div className="glass-panel glass-panel-hover animate-fade-in" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Top Meta Badges */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {paper.publication_year && (
            <span className="badge badge-indigo">
              <Calendar size={12} />
              {paper.publication_year}
            </span>
          )}
          {typeof paper.citation_count === 'number' && (
            <span className="badge badge-emerald">
              <Quote size={12} />
              {paper.citation_count.toLocaleString()} citations
            </span>
          )}
        </div>

        {paper.doi && (
          <a
            href={paper.doi.startsWith('http') ? paper.doi : `https://doi.org/${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '6px' }}
          >
            <ExternalLink size={12} />
            DOI
          </a>
        )}
      </div>

      {/* Paper Title */}
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', lineHeight: 1.4, cursor: 'pointer' }} onClick={() => onOpenModal(paper)}>
        {paper.title || 'Untitled Research Paper'}
      </h3>

      {/* Authors list */}
      {authorNames.length > 0 && (
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-muted)' }}>Authors:</span>
          <span>{authorNames.slice(0, 4).join(', ')}{authorNames.length > 4 ? ` +${authorNames.length - 4} more` : ''}</span>
        </div>
      )}

      {/* Abstract preview */}
      {paper.abstract && (
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', background: 'rgba(0, 0, 0, 0.25)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
          <p style={{ lineHeight: 1.5 }}>
            {expanded ? paper.abstract : `${paper.abstract.slice(0, 180)}...`}
          </p>
          {paper.abstract.length > 180 && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{ background: 'none', border: 'none', color: '#a5b4fc', fontSize: '12px', fontWeight: 600, cursor: 'pointer', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              {expanded ? <>Show less <ChevronUp size={12} /></> : <>Read more <ChevronDown size={12} /></>}
            </button>
          )}
        </div>
      )}

      {/* Topics / Keywords */}
      {topicNames.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
          {topicNames.map((topic, i) => (
            <span key={i} className="badge badge-amber" style={{ fontSize: '11px', padding: '3px 8px' }}>
              <Tag size={10} />
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* View full details button */}
      <button
        onClick={() => onOpenModal(paper)}
        className="btn btn-secondary"
        style={{ width: '100%', fontSize: '13px', marginTop: '4px' }}
      >
        <FileText size={14} />
        View Full Details
      </button>

    </div>
  );
}

