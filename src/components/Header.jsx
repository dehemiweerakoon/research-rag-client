import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, SlidersHorizontal, Bell, Settings, ChevronDown } from 'lucide-react';

export default function Header({ onSearch, defaultQuery }) {
  const { user } = useAuth();
  const [query, setQuery] = useState(defaultQuery || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 24px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #f1f0fb',
      gap: '16px',
      flexShrink: 0
    }}>
      {/* Filter icon */}
      <button style={{
        width: '38px', height: '38px', borderRadius: '10px',
        background: '#f8fafc', border: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#64748b', cursor: 'pointer', flexShrink: 0
      }}>
        <SlidersHorizontal size={17} />
      </button>

      {/* Search bar */}
      <form onSubmit={handleSubmit} style={{ flex: 1, maxWidth: '480px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '11px', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search papers, authors, topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '40px',
              paddingRight: '14px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              fontSize: '13px',
              fontFamily: 'inherit',
              color: '#1e293b',
              outline: 'none'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            height: '40px',
            padding: '0 20px',
            borderRadius: '10px',
            background: '#6d28d9',
            color: '#ffffff',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          Search
        </button>
      </form>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
        <button style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: '#f8fafc', border: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#64748b', cursor: 'pointer'
        }}>
          <Settings size={17} />
        </button>

        <div style={{ position: 'relative' }}>
          <button style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: '#f8fafc', border: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#64748b', cursor: 'pointer'
          }}>
            <Bell size={17} />
          </button>
          <div style={{
            position: 'absolute', top: '6px', right: '6px',
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: '#f43f5e', border: '2px solid #ffffff'
          }} />
        </div>

        {/* User chip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '6px 14px 6px 6px', borderRadius: '12px',
          background: '#f8fafc', border: '1px solid #e2e8f0',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6d28d9, #a855f7)',
            color: '#fff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '13px', fontWeight: 800
          }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
            {user?.name || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
}
