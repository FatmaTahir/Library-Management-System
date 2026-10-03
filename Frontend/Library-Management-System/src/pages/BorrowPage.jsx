import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, RotateCcw, History, Sparkles } from 'lucide-react';

export default function BorrowPage({ books, members, onBorrowBook, onReturnBook, onFetchHistory, memberHistory }) {
  const [borrowForm, setBorrowForm] = useState({ bookId: '', memberId: '' });
  const [returnRecordId, setReturnRecordId] = useState('');
  const [selectedMemberForHistory, setSelectedMemberForHistory] = useState('');

  const handleBorrowSubmit = (e) => {
    e.preventDefault();
    onBorrowBook({
      bookId: parseInt(borrowForm.bookId),
      memberId: parseInt(borrowForm.memberId),
    });
    setBorrowForm({ bookId: '', memberId: '' });
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    onReturnBook(returnRecordId);
    setReturnRecordId('');
  };

  const handleHistoryFetch = (e) => {
    e.preventDefault();
    if (selectedMemberForHistory) onFetchHistory(selectedMemberForHistory);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      
      {/* Top Operations Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Borrow Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-blue-600" /> Borrow Book
            </h3>
            
          </div>

          <form onSubmit={handleBorrowSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase  mb-1.5">Select Book</label>
              <select
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                value={borrowForm.bookId}
                onChange={(e) => setBorrowForm({ ...borrowForm, bookId: e.target.value })}
              >
                <option value="">-- Choose Book --</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id} disabled={!book.isAvailable}>
                    #{book.id} - {book.title} {!book.isAvailable ? '(Unavailable)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase  mb-1.5">Select Member</label>
              <select
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                value={borrowForm.memberId}
                onChange={(e) => setBorrowForm({ ...borrowForm, memberId: e.target.value })}
              >
                <option value="">-- Choose Member --</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    #{m.id} - {m.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all"
            >
              Confirm Borrow Operation
            </button>
          </form>
        </div>

        {/* Return Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-emerald-600" /> Return Book
            </h3>
            
          </div>

          <form onSubmit={handleReturnSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase  mb-1.5">Borrow Record ID</label>
              <input
                type="number"
                required
                placeholder="e.g. 1"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                value={returnRecordId}
                onChange={(e) => setReturnRecordId(e.target.value)}
              />
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
              Returning updates inventory state and calculates delay policies via C# Func delegate.
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              Process Book Return
            </button>
          </form>
        </div>
      </div>

      {/* Member History Lookup */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 ">
            <History className="w-5 h-5 text-blue-600 f" /> Member Borrowing History
          </h3>
          <form onSubmit={handleHistoryFetch} className="flex gap-2">
            <select
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={selectedMemberForHistory}
              onChange={(e) => setSelectedMemberForHistory(e.target.value)}
            >
              <option value="">Select Member...</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  #{m.id} - {m.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
            >
              Query History
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold   text-slate-500">
                <th className="py-3 px-4">Record ID</th>
                <th className="py-3 px-4">Book ID</th>
                <th className="py-3 px-4">Borrow Date</th>
                <th className="py-3 px-4">Return Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {memberHistory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-400">
                    Select a member to inspect borrowing history logs.
                  </td>
                </tr>
              ) : (
                memberHistory.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">#{rec.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">Book #{rec.bookId}</td>
                    <td className="py-3.5 px-4 text-slate-600">{new Date(rec.borrowDate).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {rec.returnDate ? new Date(rec.returnDate).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}