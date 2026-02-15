
import React, { useState } from 'react';
import { ResearchResult } from '../types';

interface ResultCardProps {
  result: ResearchResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Metadata */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Standard Metadata
            </h3>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 uppercase">{result.platform}</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 uppercase">{result.marketType}</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <section>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Title</h4>
                <button onClick={() => copyToClipboard(result.title, 'title')} className="text-indigo-600 text-xs font-medium hover:underline">
                  {copied === 'title' ? 'Copied!' : 'Copy Title'}
                </button>
              </div>
              <p className="text-lg font-bold text-slate-800 leading-tight">{result.title}</p>
            </section>

            <section>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</h4>
                <button onClick={() => copyToClipboard(result.description, 'desc')} className="text-indigo-600 text-xs font-medium hover:underline">
                   {copied === 'desc' ? 'Copied!' : 'Copy Description'}
                </button>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{result.description}</p>
            </section>

            <section>
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Keywords</h4>
                <button onClick={() => copyToClipboard(result.keywords.join(', '), 'keys')} className="text-indigo-600 text-xs font-medium hover:underline">
                  {copied === 'keys' ? 'Copied All!' : 'Copy CSV'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 hover:bg-white transition-colors cursor-default">
                    {kw}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Commercial Angle */}
        <div className="bg-indigo-900 text-white rounded-2xl shadow-xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
          <div className="relative z-10">
            <h4 className="text-indigo-300 text-xs font-bold uppercase tracking-[0.2em] mb-4">Strategic Commercial Angle</h4>
            <p className="text-xl md:text-2xl font-light mb-6 leading-relaxed italic border-l-4 border-indigo-500 pl-6">
              "{result.commercialAngle}"
            </p>
            <div className="flex flex-wrap gap-8 pt-6 border-t border-indigo-800">
              <div>
                <span className="block text-indigo-400 text-xs font-bold uppercase mb-1">Theme</span>
                <span className="font-medium">{result.theme}</span>
              </div>
              <div>
                <span className="block text-indigo-400 text-xs font-bold uppercase mb-1">Style</span>
                <span className="font-medium">{result.style}</span>
              </div>
              <div>
                <span className="block text-indigo-400 text-xs font-bold uppercase mb-1">Target Buyer Intent</span>
                <span className="font-medium">{result.buyerIntent}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Prompt Generator Section */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              AI Creator Tool
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-fuchsia-100 text-fuchsia-600 uppercase">{result.style}</span>
          </div>
          
          <div className="p-6 flex-grow">
            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Refined AI Prompt</h4>
              <div className="relative group">
                <div className="bg-slate-900 rounded-xl p-4 text-slate-300 text-sm font-mono leading-relaxed h-64 overflow-y-auto scrollbar-hide border border-slate-800">
                  {result.aiPrompt}
                </div>
                <button 
                  onClick={() => copyToClipboard(result.aiPrompt, 'prompt')}
                  className="absolute bottom-3 right-3 bg-white text-slate-900 text-xs font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
                >
                  {copied === 'prompt' ? 'Copied' : 'Copy Prompt'}
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                <p className="font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Pro Tip:
                </p>
                This prompt is optimized for <strong>High Fidelity</strong> generation. Paste it into your favorite AI tool and append <code>--ar 3:2 --v 6.0</code> for best results.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
