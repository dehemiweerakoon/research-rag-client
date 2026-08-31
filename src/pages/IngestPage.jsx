import React, { useState } from 'react';
import { paperService } from '../services/api';
import { Database, Sparkles, CheckCircle2, AlertCircle, Loader2, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function IngestPage({ onNavigateToPapers }) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const suggestedTopics = [
    'Retrieval Augmented Generation',
    'Reinforcement Learning from Human Feedback',
    'Graph Neural Networks',
    'Quantum Computing',
    'Diffusion Models',
    'Autonomous Agents'
  ];

  const handleIngest = async (searchTopic) => {
    const targetTopic = searchTopic || topic;
    if (!targetTopic.trim()) {
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await paperService.collectPapers(targetTopic.trim());
      setResult(res.data);
    } catch (err) {
      console.error('Ingestion failed:', err);
      setError(err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to collect papers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px', paddingBottom: '60px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          background: 'rgba(99, 102, 241, 0.15)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#a5b4fc',
          marginBottom: '14px'
        }}>
          <Database size={24} />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          Ingest Scientific Papers
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '8px auto 0 auto' }}>
          Fetch academic works from OpenAlex API and store metadata, inverted index abstracts, and citation counts into Supabase PostgreSQL.
        </p>
      </div>

      {/* Ingestion Card */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '28px' }}>
        <form onSubmit={(e) => { e.preventDefault(); handleIngest(); }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Research Topic or Keyword Query
          </label>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="e.g. 'Transformer Attention', 'CRISPR Gene Editing'..."
              className="input-field"
              style={{ flex: 1, height: '48px', fontSize: '15px' }}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ height: '48px', padding: '0 24px', fontSize: '15px' }}
              disabled={loading || !topic.trim()}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Ingesting...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Fetch & Index</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Suggested Queries */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
            Try Quick Topics:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {suggestedTopics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTopic(t); handleIngest(t); }}
                className="btn btn-secondary"
                style={{ padding: '5px 12px', fontSize: '12px', borderRadius: '20px' }}
                disabled={loading}
              >
                + {t}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Loading Status Alert */}
      {loading && (
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', marginBottom: '24px', borderColor: 'rgba(99, 102, 241, 0.4)' }}>
          <Loader2 size={32} className="animate-spin" style={{ color: 'var(--accent-primary)', margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
            Collecting and Indexing Papers...
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto' }}>
            Paginating through OpenAlex works, parsing reconstructed abstracts, and upserting into Supabase. This may take a few seconds.
          </p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          color: '#fca5a5',
          marginBottom: '24px'
        }}>
          <AlertCircle size={24} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>Ingestion Error</div>
            <div style={{ fontSize: '13px', color: '#fecaca' }}>{error}</div>
          </div>
        </div>
      )}

      {/* Success Result */}
      {result && (
        <div className="glass-panel animate-fade-in" style={{ padding: '28px', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.08)', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <CheckCircle2 size={24} style={{ color: 'var(--success)' }} />
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff' }}>
                {result.response || 'Papers Ingested Successfully!'}
              </h3>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Total papers collected: <strong style={{ color: '#6ee7b7' }}>{result.totalPapers || 0}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToPapers}
            className="btn btn-primary"
            style={{ width: '100%', fontSize: '14px', padding: '12px' }}
          >
            <BookOpen size={16} />
            <span>View & Search Indexed Papers</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Architecture Highlights */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={16} style={{ color: '#a5b4fc' }} />
          How the Pipeline Works
        </h3>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'grid', gap: '8px' }}>
          <div>1. <strong>OpenAlex API Query</strong>: Calls the works endpoint with search terms and cursor-based pagination.</div>
          <div>2. <strong>Abstract Inverted Index Transformation</strong>: Reconstructs standard text from OpenAlex's word position dictionary.</div>
          <div>3. <strong>Supabase Upsert</strong>: Stores unique `paper_id`s, titles, authors, and citation counts into PostgreSQL.</div>
        </div>
      </div>

    </div>
  );
}

