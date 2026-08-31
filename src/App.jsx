import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import PapersPage from './pages/PapersPage';
import IngestPage from './pages/IngestPage';
import UsersPage from './pages/UsersPage';
import { Loader2 } from 'lucide-react';

export default function App() {
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('papers'); // 'papers' | 'ingest' | 'users'

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        color: 'var(--text-secondary)'
      }}>
        <Loader2 size={40} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
        <div style={{ fontSize: '15px', fontWeight: 600 }}>Loading Research RAG...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ flex: 1, padding: '24px 0' }}>
        {activeTab === 'papers' && (
          <PapersPage onNavigateToIngest={() => setActiveTab('ingest')} />
        )}
        {activeTab === 'ingest' && (
          <IngestPage onNavigateToPapers={() => setActiveTab('papers')} />
        )}
        {activeTab === 'users' && (
          <UsersPage />
        )}
      </main>
    </div>
  );
}

