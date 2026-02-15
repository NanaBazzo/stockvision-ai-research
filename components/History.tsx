
import React, { useState, useMemo } from 'react';
import { ResearchResult } from '../types';

interface HistoryProps {
  items: ResearchResult[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetail: (item: ResearchResult) => void;
}

const History: React.FC<HistoryProps> = ({ items, onToggleFavorite, onDelete, onViewDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || (filter === 'favorites' && item.isFavorite);
      return matchesSearch && matchesFilter;
    });
  }, [items, searchTerm, filter]);

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Creative Library</h2>
          <p className="text-slate-500 text-sm">You have saved {items.length} generations.</p>
        </div>

        <div className="flex items-center gap-2">
           <div className="relative">
             <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             <input 
               type="text" 
               placeholder="Search topics..." 
               className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none w-full md:w-64"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <div className="flex bg-white p-1 rounded-xl border border-slate-200">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('favorites')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === 'favorites' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Favorites
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{formatDate(item.timestamp)}</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => onToggleFavorite(item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${item.isFavorite ? 'text-rose-500 bg-rose-50' : 'text-slate-300 hover:text-rose-400 hover:bg-slate-50'}`}
                  >
                    <svg className="w-5 h-5" fill={item.isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-slate-800 line-clamp-1 mb-1">{item.topic}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4 italic leading-relaxed">"{item.title}"</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-bold uppercase">{item.platform}</span>
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase">{item.style}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">{item.keywords.length} keywords</span>
              <button 
                onClick={() => onViewDetail(item)}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-slate-400 font-medium">No saved research found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default History;
