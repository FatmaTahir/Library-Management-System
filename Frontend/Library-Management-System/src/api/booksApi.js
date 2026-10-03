import api from "./axios";

// GET: /api/books
export const getAllBooks = () => api.get("/books");

// GET: /api/books/1
export const getBookById = (id) => api.get(`/books/${id}`);

// POST: /api/books
export const addBook = (bookData) => api.post("/books", bookData);

// DELETE: /api/books/1
export const deleteBook = (id) => api.delete(`/books/${id}`);

// GET: /api/books/category/Fiction
export const getBooksByCategory = (category) => api.get(`/books/category/${category}`);

// GET: /api/books/available
export const getAvailableBooks = () => api.get("/books/available");

// GET: /api/books/sorted
export const getSortedBooks = () => api.get("/books/sorted");