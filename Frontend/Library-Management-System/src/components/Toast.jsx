import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-24 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border border-slate-200 bg-white/95 backdrop-blur-md text-slate-800 min-w-[320px]"
        >
          {toast.isError ? (
            <div className="p-2 bg-rose-50 text-rose-600 border border-rose-200/60 rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
          
          <div className="flex-1">
            <h4 className="text-[11px] font-bold   text-slate-400">
              {toast.isError ? 'Action Failed' : 'Success'}
            </h4>
            <p className="text-sm font-medium text-slate-700">{toast.message}</p>
          </div>

          <button 
            onClick={onClose} 
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  ); 
}