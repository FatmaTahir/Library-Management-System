using Library.Domain.Entities;
using Library.Domain.Interfaces;
using Library.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Infrastructure
{
    public class BookRepository : IBookRepository
    {
        private readonly LibraryDbContext _context;

        public BookRepository(LibraryDbContext context)
        {
            _context = context;
        }
        
        public List<Book> GetAllBooks()
        {
            return _context.Books.ToList();
        }
        
        public Book? GetBookById(int id)
        {
            return _context.Books.FirstOrDefault(b => b.Id == id);
        }
        public void AddBook(Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();  
        }
        public void UpdateBook(Book book)
        {
            _context.Books.Update(book);
            _context.SaveChanges();
        }
        public void DeleteBook(int id)
        {
            var book = _context.Books.FirstOrDefault(b => b.Id == id);
            if (book != null)
            {
                _context.Books.Remove(book);
                _context.SaveChanges();
            }
        }
      
        public List<Book> GetBooksByCategory(string category)
        {
            return _context.Books
                .Where(b => b.Category.ToLower() == category.ToLower())
                .ToList();
        }
    }
}
