using Library.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Domain.Interfaces
{
    public interface IMemberRepository
    {
        List<Member> GetAllMembers();
        Member GetMemberById(int id);
        void AddMember(Member member);
    }
}
