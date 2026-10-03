import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Plus, RotateCcw, CheckCircle2, Clock, Trash2, Filter } from 'lucide-react';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';

export default function BooksPage({ books, loading, onAddBook, onDeleteBook, onSearchCategory, onResetSearch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');
  const [form, setForm] = useState({ title: '', author: '', isbn: '', category: '', publishedYear: 2026 });

  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.isAvailable).length;
  const borrowedBooks = totalBooks - availableBooks;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook(form);
    setForm({ title: '', author: '', isbn: '', category: '', publishedYear: 2026 });
    setIsModalOpen(false);
  };

  const handleCategorySearch = (e) => {
    e.preventDefault();
    if (categoryInput.trim()) onSearchCategory(categoryInput);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      
      {/* Overview Analytics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Inventory" value={totalBooks} subtext="Cataloged Books" icon={BookOpen} color="blue" />
        <StatCard title="Available to Borrow" value={availableBooks} subtext="In Library Stock" icon={CheckCircle2} color="emerald" />
        <StatCard title="Currently Borrowed" value={borrowedBooks} subtext="In Active Circulation" icon={Clock} color="amber" />
      </div>

      {/* Actions & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleCategorySearch} className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Filter category using LINQ..."
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl border border-slate-300 transition-colors flex items-center gap-2"
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button
            type="button"
            onClick={() => { setCategoryInput(''); onResetSearch(); }}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl border border-slate-200 transition-colors"
            title="Reset Search"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </form>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Book
        </button>
      </div>

      {/* Book Catalog Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px]  text-slate-500">
              <th className="py-4 px-6">ID</th>
              <th className="py-4 px-6">Title & Author</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">ISBN</th>
              <th className="py-4 px-6">Published</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {loading ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-400">Loading library database...</td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-400">No books found in database.</td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs text-slate-400">#{book.id}</td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-slate-800">{book.title}</p>
                    <p className="text-xs text-slate-500">{book.author}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-200 text-xs font-semibold rounded-full">
                      {book.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-500">{book.isbn}</td>
                  <td className="py-4 px-6 text-slate-600">{book.publishedYear}</td>
                  <td className="py-4 px-6 text-center">
                    {book.isAvailable ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold rounded-full">
                        <Clock className="w-3.5 h-3.5" /> Borrowed
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onDeleteBook(book.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Book"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Book">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500   mb-1.5">Book Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Clean Architecture"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500  mb-1.5">Author</label>
            <input
              type="text"
              required
              placeholder="e.g. Robert C. Martin"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500  mb-1.5">ISBN</label>
              <input
                type="text"
                required
                placeholder="9780134494166"
                value={form.isbn}
                onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500  mb-1.5">Published Year</label>
              <input
                type="number"
                required
                value={form.publishedYear}
                onChange={(e) => setForm({ ...form, publishedYear: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500  mb-1.5">Category</label>
            <input
              type="text"
              required
              placeholder="Software Development"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors border border-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all"
            >
              Save Book
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}