import React from 'react';
import { Search, Bell, Database } from 'lucide-react';

export default function Header({ title, subtitle }) {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-600">
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span>In-Memory Storage</span>
        </div>
      </div>
    </header>
  );
}