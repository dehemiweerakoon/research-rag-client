import React, { useState, useEffect } from 'react';
import { paperService } from '../services/api';
import PaperCard from '../components/PaperCard';
import PaperModal from '../components/PaperModal';
import { Search, Loader2, BookOpen, Filter, Database, RefreshCw, AlertCircle } from 'lucide-react';

export default function PapersPage({ onNavigateToIngest }) {
  const [query, setQuery] = useState('');
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [sortBy, setSortBy] = useState('citations'); // 'citations' | 'year' | 'title'
  const [searched, setSearched] = useState(false);

  // Search papers API
  const handleSearch = async (searchTerm) => {
    const term = searchTerm !== undefined ? searchTerm : query;
    if (!term || !term.trim()) {
      return;
    }
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const res = await paperService.searchPapers(term.trim());
      setPapers(res.data?.papers || []);
    } catch (err) {
      console.error('Failed to search papers:', err);
      setError(err.response?.data?.message || err.message || 'Failed to search papers');
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  // Perform a default broad search on first mount (e.g. search for common term or all papers)
  useEffect(() => {
    handleSearch('learning');
    setQuery('learning');
  }, []);

  // Sort papers based on current filter
  const sortedPapers = [...papers].sort((a, b) => {
    if (sortBy === 'citations') {
      return (b.citation_count || 0) - (a.citation_count || 0);
    }
    if (sortBy === 'year') {
      return (b.publication_year || 0) - (a.publication_year || 0);
    }
    if (sortBy === 'title') {
      return (a.title || '').localeCompare(b.title || '');
    }
    return 0;
  });

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      
      {/* Search Header Banner */}
      <div className="glass-panel" style={{ padding: '32px 24px', marginBottom: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Explore Scientific Research Papers
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 24px auto' }}>
          Search indexed papers stored in Supabase PostgreSQL, read abstracts, examine citations, and discover scientific knowledge.
        </p>

        {/* Search Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '10px' }}
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search papers by keyword, topic, or title (e.g., 'deep learning', 'transformers')..."
              className="input-field"
              style={{ paddingLeft: '44px', height: '48px', fontSize: '15px', borderRadius: '10px' }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ height: '48px', padding: '0 24px', borderRadius: '10px', fontSize: '15px' }}
            disabled={loading}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Filter and Count Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {sortedPapers.length} {sortedPapers.length === 1 ? 'Paper found' : 'Papers found'}
          </span>
          {searched && (
            <span className="badge badge-indigo" style={{ fontSize: '12px' }}>
              Query: "{query}"
            </span>
          )}
        </div>

        {/* Sorting controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={14} /> Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '13px', borderRadius: '8px' }}
          >
            <option value="citations">Most Cited</option>
            <option value="year">Newest First</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#fca5a5',
          marginBottom: '24px'
        }}>
          <AlertCircle size={20} />
          <div>{error}</div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
          <Loader2 size={36} className="animate-spin" style={{ margin: '0 auto 16px auto', color: 'var(--accent-primary)' }} />
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Searching database...</div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Querying Supabase PostgreSQL tables</div>
        </div>
      )}

      {/* Paper Results Grid */}
      {!loading && sortedPapers.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px',
        }}>
          {sortedPapers.map((paper, idx) => (
            <PaperCard
              key={paper.id || paper.paper_id || idx}
              paper={paper}
              onOpenModal={(p) => setSelectedPaper(p)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && searched && sortedPapers.length === 0 && (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 24px', marginTop: '20px' }}>
          <BookOpen size={48} style={{ margin: '0 auto 16px auto', color: 'var(--text-muted)' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            No papers matched your search
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 20px auto' }}>
            Try searching for a different keyword or ingest fresh papers from OpenAlex into the database.
          </p>
          <button
            onClick={onNavigateToIngest}
            className="btn btn-primary"
            style={{ fontSize: '14px' }}
          >
            <Database size={16} />
            Go to Ingestion Tool
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedPaper && (
        <PaperModal
          paper={selectedPaper}
          onClose={() => setSelectedPaper(null)}
        />
      )}

    </div>
  );
}

