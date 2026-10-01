using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Domain.Events
{
    public class BookEvents
    {
        public event Action<string> OnBookBorrowed;
        public event Action<string> OnBookReturned;

        public void RaiseBorrowEvent(string message)
        {
            OnBookBorrowed?.Invoke(message);
        }

        public void RaiseReturnEvent(string message)
        {
            OnBookReturned?.Invoke(message);
        }
    }
}
