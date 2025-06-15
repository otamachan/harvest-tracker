import React, { useState } from 'react';
import { HarvestRecord, VegetableType } from '../types';

interface HarvestFormProps {
  onAddRecord: (record: Omit<HarvestRecord, 'id'>) => void;
  isAuthenticated: boolean;
}

const vegetables: VegetableType[] = ['きゅうり', 'なす', 'ピーマン'];

export const HarvestForm: React.FC<HarvestFormProps> = ({ onAddRecord, isAuthenticated }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [vegetable, setVegetable] = useState<VegetableType>('きゅうり');
  const [count, setCount] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRecord({ date, vegetable, count });
    setCount(1);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        marginBottom: '2rem', 
        padding: '2rem', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center'
      }}>
        <h2>収穫記録入力</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          🔒 収穫記録を追加するには、ログインが必要です
        </p>
        <p style={{ color: '#999', fontSize: '0.9rem' }}>
          記録の閲覧はログインなしでも可能です
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>収穫記録入力</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          日付:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          野菜:
          <select
            value={vegetable}
            onChange={(e) => setVegetable(e.target.value as VegetableType)}
            style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
          >
            {vegetables.map((veg) => (
              <option key={veg} value={veg}>
                {veg}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          個数:
          <input
            type="number"
            min="1"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            required
            style={{ marginLeft: '0.5rem', padding: '0.25rem', width: '80px' }}
          />
        </label>
      </div>
      <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        記録追加
      </button>
    </form>
  );
};