import { useEffect } from 'react';
import { HarvestRecord, VegetableType } from '../types';

export function useDynamicOGP(records: HarvestRecord[]) {
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearRecords = records.filter(record => new Date(record.date).getFullYear() === currentYear);
    
    const totals: Record<VegetableType, number> = {
      'きゅうり': 0,
      'なす': 0,
      'ピーマン': 0
    };

    yearRecords.forEach(record => {
      totals[record.vegetable] += record.count;
    });

    const grandTotal = Object.values(totals).reduce((sum, count) => sum + count, 0);

    // 収穫量を含む動的なタイトルとdescriptionを生成
    const harvestSummary = Object.entries(totals)
      .filter(([, count]) => count > 0)
      .map(([veg, count]) => `${veg}${count}個`)
      .join('、');

    const title = grandTotal > 0 
      ? `🥒 ${currentYear}年の収穫実績：合計${grandTotal}個！`
      : `🥒 野菜収穫記録 - 今年の収穫を記録しよう`;
    
    const description = grandTotal > 0
      ? `${currentYear}年の収穫実績：${harvestSummary}、合計${grandTotal}個を収穫しました！`
      : '毎日の野菜収穫を記録して年間の成果を確認！きゅうり、なす、ピーマンの収穫量を管理するWebアプリです。';

    // meta tagを動的に更新
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    
    // ページタイトルも更新
    document.title = title;
  }, [records]);
}

function updateMetaTag(property: string, content: string) {
  // Twitter Card用
  let element = document.querySelector(`meta[name="${property}"]`);
  if (!element) {
    // Open Graph用
    element = document.querySelector(`meta[property="${property}"]`);
  }
  
  if (element) {
    element.setAttribute('content', content);
  }
}