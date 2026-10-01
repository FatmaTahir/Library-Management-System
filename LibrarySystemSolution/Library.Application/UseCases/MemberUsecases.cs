using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Domain.Interfaces;
using Library.Domain.Entities;
namespace Library.Application.UseCases
{
    public  class MemberUsecases
    {
        private readonly IMemberRepository _mr;
        public MemberUsecases(IMemberRepository mr)
        {
            _mr = mr;
        }
        public void AddMember(Member member) { 
          _mr.AddMember(member);
        }
        public List<Member> GetAllMembers()
        {
            return _mr.GetAllMembers();
        }
        public Member GetMemberById(int id) { 
            return _mr.GetMemberById(id);
        }
    }
}
