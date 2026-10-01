using Library.Domain.Interfaces;
using Library.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Application.UseCases
{
    public class BookUsecases
    {
        private readonly IBookRepository _br;
        public BookUsecases(IBookRepository br)
        {
            _br = br;
        }
        public List<Book> GetAllBooks()
        {
          var books=  _br.GetAllBooks();
            return books;
        }
        public void AddBook(Book book)
        {
            _br.AddBook(book);
        }
        public void UpdateBook(Book book)
        {
            _br.UpdateBook(book);
        }
        public void DeleteBook(int id)
        {
            _br.DeleteBook(id);
        }
        public List<Book> SearchBookByCategory(string category)
        {
            return _br.GetBooksByCategory(category);
        }
        public Book GetBookById(int id)
        {
            return _br.GetBookById(id);
        }
        public List<Book> GetAvailableBooks()
        {
            return _br.GetAllBooks()
                      .Where(b => b.IsAvailable)
                      .ToList();
        }
        public List<Book> GetBooksByCategoryUsingLinq(string category)
        {
            return _br.GetAllBooks()
                      .Where(b => b.Category.ToLower() == category.ToLower())
                      .ToList();
        }
        public List<Book> GetBooksSortedByYear()
        {
            return _br.GetAllBooks()
                      .OrderBy(b => b.PublishedYear)
                      .ToList();
        }
    }
}
