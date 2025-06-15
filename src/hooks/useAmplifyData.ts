import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { HarvestRecord } from '../types';

const client = generateClient<Schema>();

// マッピング関数
const mapVegetableToEnum = (japanese: 'きゅうり' | 'なす' | 'ピーマン'): 'CUCUMBER' | 'EGGPLANT' | 'PEPPER' => {
  const mapping = {
    'きゅうり': 'CUCUMBER' as const,
    'なす': 'EGGPLANT' as const,
    'ピーマン': 'PEPPER' as const
  };
  return mapping[japanese];
};

const mapEnumToVegetable = (enumValue: 'CUCUMBER' | 'EGGPLANT' | 'PEPPER'): 'きゅうり' | 'なす' | 'ピーマン' => {
  const mapping = {
    'CUCUMBER': 'きゅうり' as const,
    'EGGPLANT': 'なす' as const,
    'PEPPER': 'ピーマン' as const
  };
  return mapping[enumValue];
};

export function useAmplifyData() {
  const [records, setRecords] = useState<HarvestRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const { data } = await client.models.HarvestRecord.list();
      // データを日本語にマッピングして返す
      const mappedData: HarvestRecord[] = data.map((record: any) => ({
        ...record,
        vegetable: mapEnumToVegetable(record.vegetable as 'CUCUMBER' | 'EGGPLANT' | 'PEPPER')
      }));
      setRecords(mappedData.sort((a: HarvestRecord, b: HarvestRecord) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const addRecord = async (recordData: { date: string; vegetable: 'きゅうり' | 'なす' | 'ピーマン'; count: number }) => {
    try {
      const { data: newRecord } = await client.models.HarvestRecord.create({
        ...recordData,
        vegetable: mapVegetableToEnum(recordData.vegetable)
      });
      if (newRecord) {
        setRecords(prev => [newRecord, ...prev]);
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      await client.models.HarvestRecord.delete({ id });
      setRecords(prev => prev.filter(record => record.id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return {
    records,
    loading,
    addRecord,
    deleteRecord,
    refetch: fetchRecords
  };
}