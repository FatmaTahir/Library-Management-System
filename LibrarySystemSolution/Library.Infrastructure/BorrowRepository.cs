using Library.Domain.Entities;
using Library.Domain.Interfaces;
using Library.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public class BorrowRepository : IBorrowRepository
{
    private readonly LibraryDbContext _context;
    public BorrowRepository(LibraryDbContext context)
    {
        _context = context;
    }

    public List<BorrowRecord> GetAllRecords()
    {
        return _context.BorrowRecords
                       .Include(r => r.Book)    // Fetch related Book
                       .Include(r => r.Member)  // Fetch related Member
                       .ToList();
    }

    public void BorrowBook(BorrowRecord record)
    {
        _context.BorrowRecords.Add(record);
        _context.SaveChanges();
    }

    public void ReturnBook(int recordId)
    {
        var record = _context.BorrowRecords.FirstOrDefault(r => r.Id == recordId);
        if (record != null)
        {
            _context.BorrowRecords.Remove(record);
            _context.SaveChanges();
        }
    }

    public List<BorrowRecord> GetBorrowedBooksByMember(int memberId)
    {
        return _context.BorrowRecords
                       .Include(r => r.Book)
                       .Include(r => r.Member)
                       .Where(r => r.MemberId == memberId)
                       .ToList();
    }
}