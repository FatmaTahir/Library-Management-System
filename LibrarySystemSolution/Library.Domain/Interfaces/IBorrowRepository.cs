using Library.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Domain.Interfaces
{
    public interface IBorrowRepository
    {
        List<BorrowRecord> GetAllRecords();
        void BorrowBook(BorrowRecord record);
        void ReturnBook(int recordId);
        List<BorrowRecord> GetBorrowedBooksByMember(int memberId);

    }
}
