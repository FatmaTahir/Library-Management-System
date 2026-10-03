import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7123/api', // Adjust your ASP.NET Core HTTPS port here
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookApi = {
  getAll: () => api.get('/books'),
  getById: (id) => api.get(`/books/${id}`),
  getByCategory: (cat) => api.get(`/books/category/${encodeURIComponent(cat)}`),
  create: (data) => api.post('/books', data),
  delete: (id) => api.delete(`/books/${id}`),
};

export const memberApi = {
  getAll: () => api.get('/members'),
  getById: (id) => api.get(`/members/${id}`),
  create: (data) => api.post('/members', data),
};

export const borrowApi = {
  borrowBook: (payload) => api.post('/borrow', payload),
  returnBook: (recordId) => api.put(`/borrow/return/${recordId}`),
  getMemberHistory: (memberId) => api.get(`/borrow/member/${memberId}`),
};

export default api;