
import React, { useState, useEffect } from 'react';
import { Platform, MarketType, ImageStyle, AppSettings, ResearchResult } from '../types';
import { generateResearch } from '../services/geminiService';
import ResultCard from './ResultCard';

interface DashboardProps {
  settings: AppSettings;
  onSave: (result: ResearchResult) => void;
  currentResult: ResearchResult | null;
  setCurrentResult: (r: ResearchResult | null) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ settings, onSave, currentResult, setCurrentResult }) => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<Platform>(settings.defaultPlatform);
  const [marketType, setMarketType] = useState<MarketType>(MarketType.EVERGREEN);
  const [style, setStyle] = useState<ImageStyle>(settings.defaultStyle);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync form fields when a result is viewed from history
  useEffect(() => {
    if (currentResult) {
      setTopic(currentResult.topic);
      setPlatform(currentResult.platform);
      setMarketType(currentResult.marketType);
      setStyle(currentResult.style);
    }
  }, [currentResult]);

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);
    setCurrentResult(null); // Clear previous result to show loading state cleanly
    
    try {
      const resultData = await generateResearch(topic, platform, marketType, style, settings.language);
      const fullResult = resultData as ResearchResult;
      onSave(fullResult);
    } catch (err) {
      setError('Failed to generate research. Please check your API key and connection.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Info */}
      <section>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Market Research</h1>
        <p className="text-slate-500 mt-2">Analyze trends and generate high-conversion stock image metadata.</p>
      </section>

      {/* Input Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleResearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="md:col-span-2 lg:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Niche / Topic</label>
            <input
              type="text"
              placeholder="e.g. Sustainable energy, Thai street food, Remote work..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Platform</label>
            <select
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
            >
              {Object.values(Platform).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Market Type</label>
            <select
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
              value={marketType}
              onChange={(e) => setMarketType(e.target.value as MarketType)}
            >
              {Object.values(MarketType).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Desired Style</label>
            <select
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
              value={style}
              onChange={(e) => setStyle(e.target.value as ImageStyle)}
            >
              {Object.values(ImageStyle).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="md:col-span-2 lg:col-span-4 mt-2">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-indigo-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Market...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Strategy
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      {/* Results Section */}
      {currentResult && (
        <div className="animate-in slide-in-from-bottom-4 duration-700">
          <ResultCard result={currentResult} />
        </div>
      )}

      {/* Empty State */}
      {!currentResult && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-lg font-medium">Ready to discover your next best-seller?</p>
          <p className="text-sm">Enter a topic above to generate a professional creative brief.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
