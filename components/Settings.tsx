
import React from 'react';
import { AppSettings, Platform, ImageStyle } from '../types';

interface SettingsProps {
  settings: AppSettings;
  onUpdate: (newSettings: AppSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdate }) => {
  const handleChange = (key: keyof AppSettings, value: any) => {
    onUpdate({ ...settings, [key]: value });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">App Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Configure your research defaults and workspace.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 space-y-6">
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Language Output</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-white"
                  value={settings.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Thai">Thai (ภาษาไทย)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Default Style</label>
                <select 
                   className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-white"
                   value={settings.defaultStyle}
                   onChange={(e) => handleChange('defaultStyle', e.target.value as ImageStyle)}
                >
                  {Object.values(ImageStyle).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Default Platform</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-white"
                  value={settings.defaultPlatform}
                  onChange={(e) => handleChange('defaultPlatform', e.target.value as Platform)}
                >
                  {Object.values(Platform).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-slate-100 space-y-4">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">API Configuration</h3>
             <div>
               <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gemini API Key</label>
               <input
                 type="password"
                 placeholder="Paste your Gemini API Key here..."
                 className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white font-mono text-sm"
                 value={settings.apiKey}
                 onChange={(e) => handleChange('apiKey', e.target.value)}
               />
               <p className="text-xs text-slate-400 mt-2">
                 Get your free API key at{' '}
                 <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                   aistudio.google.com/apikey
                 </a>
                 {' '}— Your key is stored locally in your browser only.
               </p>
             </div>
             {settings.apiKey && (
               <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 text-emerald-700 text-sm">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                 API Key is set and saved.
               </div>
             )}
             {!settings.apiKey && (
               <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-2 text-amber-700 text-sm">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 Please add your API Key to start generating research.
               </div>
             )}
          </section>

          <section className="pt-6 border-t border-slate-100">
             <div className="flex items-center justify-between">
               <div>
                 <h4 className="text-sm font-bold text-slate-800">Local Data Management</h4>
                 <p className="text-xs text-slate-500">All generation history is stored locally in your browser.</p>
               </div>
               <button 
                onClick={() => { if(confirm('Clear all history?')) { localStorage.removeItem('stock_vision_history'); window.location.reload(); } }}
                className="px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
               >
                 Clear History
               </button>
             </div>
          </section>
        </div>
      </div>

      <div className="text-center text-slate-400 text-xs">
        <p>StockVision AI v1.0 • Built for Solo Content Creators</p>
      </div>
    </div>
  );
};

export default Settings;
