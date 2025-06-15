export interface HarvestRecord {
  id: string;
  date: string;
  vegetable: VegetableType;
  count: number;
}

export type VegetableType = 'きゅうり' | 'なす' | 'ピーマン';

export interface YearlyStats {
  year: number;
  totals: Record<VegetableType, number>;
}