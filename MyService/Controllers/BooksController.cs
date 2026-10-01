using Library.Application.UseCases;
using Library.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookUsecases _uc;
        public BooksController(BookUsecases uc)
        {
            _uc = uc;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_uc.GetAllBooks());
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var book = _uc.GetBookById(id);

            if (book == null)
                return NotFound(); 

            return Ok(book);
        }
        [HttpPost]
        public IActionResult Add([FromBody] Book book)
        {
            if (book == null)
                return BadRequest();

            _uc.AddBook(book);

            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var book = _uc.GetBookById(id);

            if (book == null)
                return NotFound();

            _uc.DeleteBook(id);

            return Ok();
        }
        [HttpGet("category/{category}")]
        public IActionResult GetByCategory(string category)
        {
            var books = _uc.SearchBookByCategory(category);

            return Ok(books);
        }
        [HttpGet("available")]
        public IActionResult GetAvailableBooks()
        {
            var books = _uc.GetAvailableBooks();
            return Ok(books);
        }

        [HttpGet("sorted")]
        public IActionResult GetBooksSortedByYear()
        {
            var books = _uc.GetBooksSortedByYear();
            return Ok(books);
        }

        [HttpGet("category-linq/{category}")]
        public IActionResult GetBooksByCategoryUsingLinq(string category)
        {
            var books = _uc.GetBooksByCategoryUsingLinq(category);
            return Ok(books);
        }
    }
}
