import { useState, useEffect } from 'react';
import api from './api/axios';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import BooksPage from './pages/BooksPage';
import MembersPage from './pages/MembersPage';
import BorrowPage from './pages/BorrowPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [memberHistory, setMemberHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to fetch books', true);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await api.get('/members');
      setMembers(res.data);
    } catch (err) {
      showToast('Failed to load registered members', true);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchMembers();
  }, []);

  const handleAddBook = async (bookData) => {
    try {
      await api.post('/books', { ...bookData, publishedYear: parseInt(bookData.publishedYear) });
      showToast('Book registered successfully!');
      fetchBooks();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create book', true);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      showToast('Book removed from inventory');
      fetchBooks();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete book', true);
    }
  };

  const handleSearchCategory = async (category) => {
    try {
      setLoading(true);
      const res = await api.get(`/books/category/${encodeURIComponent(category)}`);
      setBooks(res.data);
    } catch (err) {
      showToast('No books found for this category', true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterMember = async (memberData) => {
    try {
      await api.post('/members', memberData);
      showToast('Member registered successfully!');
      fetchMembers();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to register member', true);
    }
  };

  const handleBorrowBook = async (payload) => {
    try {
      await api.post('/borrow', payload);
      showToast('Book borrowed! Delegates validated and events fired.');
      fetchBooks();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to borrow book', true);
    }
  };

  const handleReturnBook = async (recordId) => {
    try {
      await api.put(`/borrow/return/${recordId}`);
      showToast('Book returned successfully!');
      fetchBooks();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to return book', true);
    }
  };

  const handleFetchHistory = async (memberId) => {
    try {
      const res = await api.get(`/borrow/member/${memberId}`);
      setMemberHistory(res.data);
    } catch (err) {
      showToast('Failed to retrieve borrowing history', true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Toast toast={toast} onClose={() => setToast(null)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'books' && (
          <BooksPage
            books={books}
            loading={loading}
            onAddBook={handleAddBook}
            onDeleteBook={handleDeleteBook}
            onSearchCategory={handleSearchCategory}
            onResetSearch={fetchBooks}
          />
        )}
        {activeTab === 'members' && (
          <MembersPage members={members} onRegisterMember={handleRegisterMember} />
        )}
        {activeTab === 'borrow' && (
          <BorrowPage
            books={books}
            members={members}
            onBorrowBook={handleBorrowBook}
            onReturnBook={handleReturnBook}
            onFetchHistory={handleFetchHistory}
            memberHistory={memberHistory}
          />
        )}
      </main>
    </div>
  );
}