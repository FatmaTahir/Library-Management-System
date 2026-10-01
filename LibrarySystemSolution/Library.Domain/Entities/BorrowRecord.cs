using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Domain.Entities
{
    public class BorrowRecord
    {
        public int Id { get; set; }
        public int BookId {  get; set; }
        public int MemberId { get; set; }
        public DateTime BorrowDate { get; set; }= DateTime.Now;
        public DateTime? ReturnDate { get; set; }
        public StatusEnum Status { get; set; }
    
        public enum StatusEnum { Borrowed,Returned,Late}
        //for efcore
        public Book Book { get; set; }  
        public Member Member {  get; set; }
   


    }
}
