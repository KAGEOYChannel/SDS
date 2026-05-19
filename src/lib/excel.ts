import * as XLSX from 'xlsx';

export interface StudentData {
  nama: string;
  nisn: string;
}

export async function loadExcelData(url: string): Promise<StudentData[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch Excel file');
    }
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Assume data is in the first sheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // Parse to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];
    
    // Transform to StudentData
    // We handle partial match for column names (e.g., "Full Name", "Nama", "NISN")
    return jsonData.map(row => {
      const nama = row['Full Name'] || row['Nama'] || row['Name'] || row['nama'] || Object.values(row)[0];
      const nisn = row['NISN'] || row['nisn'] || row['Nisn'] || Object.values(row)[1];
      
      return {
        nama: String(nama || '').trim(),
        nisn: String(nisn || '').trim(),
      };
    }).filter(item => item.nama && item.nisn);
  } catch (error) {
    console.error('Error loading Excel data:', error);
    return [];
  }
}
