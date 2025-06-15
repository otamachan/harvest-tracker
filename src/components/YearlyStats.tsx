import React from 'react';
import { HarvestRecord, VegetableType } from '../types';

interface YearlyStatsProps {
  records: HarvestRecord[];
}

export const YearlyStats: React.FC<YearlyStatsProps> = ({ records }) => {
  const years = Array.from(new Set(records.map(record => new Date(record.date).getFullYear()))).sort((a, b) => b - a);

  const calculateYearlyTotals = (year: number) => {
    const yearRecords = records.filter(record => new Date(record.date).getFullYear() === year);
    const totals: Record<VegetableType, number> = {
      'きゅうり': 0,
      'なす': 0,
      'ピーマン': 0
    };

    yearRecords.forEach(record => {
      totals[record.vegetable] += record.count;
    });

    return totals;
  };

  if (years.length === 0) {
    return <p>統計を表示するデータがありません。</p>;
  }

  return (
    <div>
      <h2>年間収穫統計</h2>
      {years.map(year => {
        const totals = calculateYearlyTotals(year);
        const grandTotal = Object.values(totals).reduce((sum, count) => sum + count, 0);

        return (
          <div key={year} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>{year}年の収穫実績</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              {Object.entries(totals).map(([vegetable, count]) => (
                <div key={vegetable} style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>{vegetable}</div>
                  <div style={{ fontSize: '1.5rem', color: '#4CAF50', fontWeight: 'bold' }}>{count}個</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: '#e8f5e8', borderRadius: '4px', fontWeight: 'bold' }}>
              合計: {grandTotal}個
            </div>
          </div>
        );
      })}
    </div>
  );
};