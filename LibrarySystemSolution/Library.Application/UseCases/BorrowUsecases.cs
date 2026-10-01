using Library.Domain.Entities;
using Library.Domain.Events;
using Library.Domain.Interfaces;
using Library.Domain.Delegates;
using System;
using System.Linq;
using System.Collections.Generic;
using static Library.Domain.Entities.BorrowRecord;

public class BorrowUseCases
{
    private readonly IBorrowRepository _borrowRepo;
    private readonly IBookRepository _bookRepo;
    private readonly BookEvents _events = new BookEvents();

    public BorrowUseCases(IBorrowRepository borrowRepo, IBookRepository bookRepo)
    {
        _borrowRepo = borrowRepo;
        _bookRepo = bookRepo;

        _events.OnBookBorrowed += msg => Console.WriteLine(msg);
        _events.OnBookReturned += msg => Console.WriteLine(msg);
    }

    public void BorrowBook(int bookId, int memberId)
    {
        var book = _bookRepo.GetBookById(bookId);

        BorrowValidation validation = CheckAvailability;
        validation += CheckMemberValidity;

        foreach (BorrowValidation v in validation.GetInvocationList())
        {
            if (!v(book, memberId))
                throw new Exception("Validation Failed");
        }

        book.IsAvailable = false;
        _bookRepo.UpdateBook(book);

        var record = new BorrowRecord
        {
            BookId = bookId,
            MemberId = memberId,
            BorrowDate = DateTime.Now,
            Status = StatusEnum.Borrowed
        };

        _borrowRepo.BorrowBook(record);

        Action<string> log = msg => Console.WriteLine(msg);
        log("Book Borrowed Successfully");

        _events.RaiseBorrowEvent($"Book {book?.Title} borrowed");
    }

    public void ReturnBook(int recordId)
    {
        var record = _borrowRepo.GetAllRecords()
                               .FirstOrDefault(r => r.Id == recordId);

        if (record == null)
            throw new Exception("Borrow record not found");

        var book = _bookRepo.GetBookById(record.BookId);

        Func<DateTime, DateTime, bool> isLate =
            (borrow, ret) => (ret - borrow).Days > 7;

        DateTime returnDate = DateTime.Now;

        if (isLate(record.BorrowDate, returnDate))
            record.Status = StatusEnum.Late;
        else
            record.Status = StatusEnum.Returned;

        record.ReturnDate = returnDate;

        if (book != null)
        {
            book.IsAvailable = true;
            _bookRepo.UpdateBook(book);
        }

        _events.RaiseReturnEvent($"Book {book?.Title} returned");
    }

    public List<BorrowRecord> GetMemberBorrowHistory(int memberId)
    {
        return _borrowRepo.GetBorrowedBooksByMember(memberId);
    }

    private bool CheckAvailability(Book book, int memberId)
    {
        return book != null && book.IsAvailable;
    }

    private bool CheckMemberValidity(Book book, int memberId)
    {
        return memberId > 0;
    }
    public List<int> GetTopMembers()
    {
        return _borrowRepo.GetAllRecords()
            .GroupBy(r => r.MemberId)
            .OrderByDescending(g => g.Count())
            .Select(g => g.Key)
            .ToList();
    }
    public List<IGrouping<int, BorrowRecord>> GroupBorrowRecordsByMember()
    {
        return _borrowRepo.GetAllRecords()
                          .GroupBy(r => r.MemberId)
                          .ToList();
    }
}