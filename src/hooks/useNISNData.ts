import { useState, useEffect, useMemo } from 'react';
import { loadExcelData, StudentData } from '../lib/excel';

export function useNISNData() {
  const [data, setData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // We expect data.xlsx to be in the public folder
        const jsonData = await loadExcelData('/data.xlsx');
        if (jsonData.length === 0) {
          // If no data or error, we might want to show a warning
          // but for now we just set it
        }
        setData(jsonData);
      } catch (err) {
        setError('Gagal memuat data NISN. Pastikan file data.xlsx tersedia.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useSearch(data: StudentData[], query: string) {
  return useMemo(() => {
    if (!query.trim()) return [];
    
    const normalizedQuery = query.toLowerCase();
    return data.filter(student => 
      student.nama.toLowerCase().includes(normalizedQuery) ||
      student.nisn.includes(normalizedQuery)
    );
  }, [data, query]);
}
