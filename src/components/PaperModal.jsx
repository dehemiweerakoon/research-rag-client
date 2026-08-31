import React from 'react';
import { X, Calendar, Quote, ExternalLink, BookOpen, Layers } from 'lucide-react';

export default function PaperModal({ paper, onClose }) {
  if (!paper) return null;

  const authorNames = Array.isArray(paper.authors)
    ? paper.authors
        .map((a) => (typeof a === 'string' ? a : a?.author?.display_name || a?.raw_author_name))
        .filter(Boolean)
    : [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '760px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '28px',
          background: 'rgba(17, 24, 39, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-secondary"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '6px',
            borderRadius: '50%',
          }}
        >
          <X size={18} />
        </button>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {paper.publication_year && (
            <span className="badge badge-indigo">
              <Calendar size={12} />
              Published in {paper.publication_year}
            </span>
          )}
          {typeof paper.citation_count === 'number' && (
            <span className="badge badge-emerald">
              <Quote size={12} />
              {paper.citation_count.toLocaleString()} Citations
            </span>
          )}
          {paper.paper_id && (
            <span className="badge badge-amber">
              <Layers size={12} />
              {paper.paper_id.replace('https://openalex.org/', 'OpenAlex: ')}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', lineHeight: 1.4, marginBottom: '16px', paddingRight: '40px' }}>
          {paper.title}
        </h2>

        {/* Authors */}
        {authorNames.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Authors
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {authorNames.join(' • ')}
            </div>
          </div>
        )}

        {/* Abstract */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={14} />
            Abstract
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '16px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            whiteSpace: 'pre-line'
          }}>
            {paper.abstract || 'No abstract text available for this paper.'}
          </div>
        </div>

        {/* Actions / External Link */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          {paper.doi && (
            <a
              href={paper.doi.startsWith('http') ? paper.doi : `https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink size={14} />
              Open via DOI / Publisher
            </a>
          )}
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

