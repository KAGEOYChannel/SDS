import React, { useState, useEffect } from 'react';
import { Search, X, User, Copy, Check, Info, GraduationCap, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNISNData, useSearch } from './hooks/useNISNData';
import { cn } from './lib/utils';

// --- Components ---

const Header = () => (
  <header className="pt-12 pb-6 px-6 text-center">
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full mx-auto flex items-center justify-center shadow-xl mb-4 overflow-hidden border-2 border-blue-50 dark:border-slate-700"
    >
      <img 
        src="/logo.png" 
        alt="Madani Logo" 
        className="w-full h-full object-contain p-1"
        onError={(e) => {
          const target = e.currentTarget;
          target.parentElement!.style.backgroundColor = '#2563eb'; // blue-600
          target.style.display = 'none';
          const icon = document.createElement('div');
          icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>';
          target.parentElement!.appendChild(icon.firstChild!);
        }}
      />
    </motion.div>
    <motion.h1 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white"
    >
      Madani NISN Search
    </motion.h1>
    <motion.p 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-slate-500 dark:text-slate-400 text-sm mt-1"
    >
      Pusat Pencarian Data Siswa 2026
    </motion.p>
  </header>
);

const SearchBar = ({ value, onChange, onClear }: { value: string, onChange: (v: string) => void, onClear: () => void }) => (
  <div className="px-6 space-y-4 max-w-md mx-auto w-full mb-8">
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        placeholder="Cari nama siswa..."
        className={cn(
          "block w-full pl-11 pr-12 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl",
          "text-slate-900 dark:text-white placeholder-slate-400",
          "focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-900",
          "transition-all duration-200 shadow-sm appearance-none"
        )}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  </div>
);

interface ResultCardProps {
  student: {
    nama: string;
    nisn: string;
  };
  key?: string;
}

const ResultCard = ({ student }: ResultCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(student.nisn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const initials = (student.nama || 'Siswa')
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-4 flex items-center gap-4 shadow-sm"
    >
      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shrink-0">
        {initials}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-slate-900 dark:text-white leading-tight">
          {student.nama}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-0.5">
          NISN: {student.nisn}
        </p>
      </div>
      <button
        onClick={handleCopy}
        className={cn(
          "p-2 rounded-xl transition-all duration-200",
          copied 
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
            : "text-slate-400 hover:text-blue-600 bg-slate-50 dark:bg-slate-700 dark:hover:bg-blue-900/40"
        )}
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </button>
    </motion.div>
  );
};

const Skeleton = () => (
  <div className="space-y-4 px-4 max-w-md mx-auto w-full">
    {[1, 2, 3].map(i => (
      <div key={i} className="bg-slate-50 dark:bg-slate-800/50 h-20 rounded-2xl animate-pulse" />
    ))}
  </div>
);

const EmptyState = ({ query, hasData }: { query: string, hasData: boolean }) => (
  <div className="flex flex-col items-center justify-center pt-8 px-4 text-center">
    {!hasData ? (
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl max-w-xs ring-1 ring-amber-100 dark:ring-amber-900/40">
        <Info className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
        <h3 className="font-semibold text-amber-900 dark:text-amber-200">Data belum tersedia</h3>
        <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
          Pastikan file <code className="bg-white/50 px-1 rounded">data.xlsx</code> sudah diletakkan di folder public aplikasi.
        </p>
      </div>
    ) : (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-slate-400 dark:text-slate-500"
      >
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8" />
        </div>
        <p className="font-medium">Tidak ada hasil untuk "{query}"</p>
        <p className="text-sm mt-1">Coba kata kunci lain</p>
      </motion.div>
    )}
  </div>
);

const ConfirmationSection = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="px-6 mb-8 max-w-md mx-auto w-full"
  >
    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <Check className="w-12 h-12 text-blue-600" />
      </div>
      <div className="relative z-10">
        <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-2">
          Sudah dapat NISN?
        </h4>
        <p className="text-xs text-blue-700/80 dark:text-blue-400/80 mb-4 leading-relaxed">
          Jika Anda sudah menemukan NISN Anda, silakan lakukan konfirmasi data melalui link resmi di bawah ini.
        </p>
        <a 
          href="https://ijazah.pendidikan.go.id/konfirmasi-data" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-200 dark:shadow-none active:scale-95"
        >
          Konfirmasi Data
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { data, loading, error } = useNISNData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useSearch(data, debouncedQuery);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors selection:bg-blue-100 selection:text-blue-700">
      <div className="max-w-2xl mx-auto pb-16">
        <Header />
        
        <SearchBar 
          value={query} 
          onChange={setQuery} 
          onClear={() => setQuery('')} 
        />

        <ConfirmationSection />

        <main className="px-4">
          {loading ? (
            <Skeleton />
          ) : (
            <div className="max-w-md mx-auto w-full">
              <AnimatePresence mode="popLayout">
                {error ? (
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-red-600 dark:text-red-400 text-sm text-center">
                    {error}
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-4">
                    {results.map((student: { nama: string; nisn: string }, idx: number) => (
                      <ResultCard key={`${student.nisn}-${idx}`} student={student} />
                    ))}
                  </div>
                ) : debouncedQuery ? (
                  <EmptyState query={debouncedQuery} hasData={data.length > 0} />
                ) : (
                  <div className="text-center text-slate-400 dark:text-slate-600 pt-8">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="text-sm">Masukkan nama untuk mulai mencari</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 py-4 px-4 border-t border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-center">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
          NISN Student Search &bull; © 2026
        </p>
      </footer>
    </div>
  );
}
