import React, { useState } from 'react';
import { HarvestRecord } from './types';
import { HarvestForm } from './components/HarvestForm';
import { HarvestList } from './components/HarvestList';
import { YearlyStats } from './components/YearlyStats';
import { LoginForm } from './components/LoginForm';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDynamicOGP } from './hooks/useDynamicOGP';
import { useAuth } from './hooks/useAuth';
import './App.css';

function App() {
  const [records, setRecords] = useLocalStorage<HarvestRecord[]>('harvestRecords', []);
  const [activeTab, setActiveTab] = useState<'input' | 'list' | 'stats' | 'login'>('stats');
  const { isAuthenticated, user, login, logout } = useAuth();
  
  // 動的OGP更新
  useDynamicOGP(records);

  const addRecord = (recordData: Omit<HarvestRecord, 'id'>) => {
    const newRecord: HarvestRecord = {
      ...recordData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setRecords([...records, newRecord]);
  };

  const deleteRecord = (id: string) => {
    setRecords(records.filter(record => record.id !== id));
  };

  const tabStyle = (tab: string) => ({
    padding: '0.75rem 1.5rem',
    margin: '0 0.25rem',
    backgroundColor: activeTab === tab ? '#4CAF50' : '#f0f0f0',
    color: activeTab === tab ? 'white' : '#333',
    border: 'none',
    borderRadius: '4px 4px 0 0',
    cursor: 'pointer',
    fontWeight: 'bold'
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div></div>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#2E7D32', marginBottom: '0.5rem' }}>🥒 野菜収穫記録</h1>
            <p style={{ color: '#666' }}>毎日の収穫を記録して、年間の成果を確認しましょう</p>
          </div>
          <div>
            {isAuthenticated ? (
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666' }}>👤 {user?.username}</p>
                <button
                  onClick={logout}
                  style={{ padding: '0.5rem 1rem', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  ログアウト
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('login')}
                style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                🔐 ログイン
              </button>
            )}
          </div>
        </div>
      </header>

      <nav style={{ marginBottom: '2rem', borderBottom: '2px solid #e0e0e0' }}>
        <button
          style={tabStyle('stats')}
          onClick={() => setActiveTab('stats')}
        >
          📊 年間統計
        </button>
        <button
          style={tabStyle('input')}
          onClick={() => setActiveTab('input')}
        >
          📝 記録入力
        </button>
        <button
          style={tabStyle('list')}
          onClick={() => setActiveTab('list')}
        >
          📋 記録一覧 ({records.length})
        </button>
      </nav>

      <main>
        {activeTab === 'login' && <LoginForm onLogin={(username, password) => {
          const success = login(username, password);
          if (success) {
            setActiveTab('input');
          }
          return success;
        }} />}
        {activeTab === 'input' && <HarvestForm onAddRecord={addRecord} isAuthenticated={isAuthenticated} />}
        {activeTab === 'list' && <HarvestList records={records} onDeleteRecord={deleteRecord} isAuthenticated={isAuthenticated} />}
        {activeTab === 'stats' && <YearlyStats records={records} />}
      </main>
    </div>
  );
}

export default App;
