import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください');
      return;
    }

    const success = onLogin(username, password);
    if (!success) {
      setError('ユーザー名またはパスワードが間違っています');
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '2rem auto', 
      padding: '2rem', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2E7D32' }}>
        🔐 ログイン
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
        収穫記録を追加・削除するにはログインが必要です
      </p>
      
      {error && (
        <div style={{ 
          padding: '0.75rem', 
          marginBottom: '1rem', 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          borderRadius: '4px',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            ユーザー名:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="ユーザー名を入力"
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            パスワード:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="パスワードを入力"
          />
        </div>
        
        <button 
          type="submit"
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          ログイン
        </button>
      </form>
      
      <div style={{ 
        marginTop: '1.5rem', 
        padding: '1rem', 
        backgroundColor: '#e8f5e8', 
        borderRadius: '4px',
        fontSize: '0.85rem',
        color: '#2E7D32'
      }}>
        <strong>デモ用アカウント:</strong><br />
        ユーザー名: admin<br />
        パスワード: harvest2025
      </div>
    </div>
  );
};