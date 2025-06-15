import React from 'react';
import { HarvestRecord } from '../types';

interface HarvestListProps {
  records: HarvestRecord[];
  onDeleteRecord: (id: string) => void;
  isAuthenticated: boolean;
}

export const HarvestList: React.FC<HarvestListProps> = ({ records, onDeleteRecord, isAuthenticated }) => {
  if (records.length === 0) {
    return <p>まだ記録がありません。</p>;
  }

  const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>収穫記録一覧</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>日付</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>野菜</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>個数</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {sortedRecords.map((record) => (
            <tr key={record.id}>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                {new Date(record.date).toLocaleDateString('ja-JP')}
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{record.vegetable}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>{record.count}個</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                {isAuthenticated ? (
                  <button
                    onClick={() => onDeleteRecord(record.id)}
                    style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    削除
                  </button>
                ) : (
                  <span style={{ color: '#999', fontSize: '0.8rem' }}>🔒</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};