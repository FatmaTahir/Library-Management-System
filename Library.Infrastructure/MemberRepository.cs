using Library.Domain.Entities;
using Library.Domain.Interfaces;
using Library.Infrastructure.Data;

public class MemberRepository : IMemberRepository
{
    private readonly LibraryDbContext _context;

    public MemberRepository(LibraryDbContext context)
    {
        _context = context;
    }

    public List<Member> GetAllMembers() => _context.Members.ToList();

    public Member? GetMemberById(int id) => _context.Members.FirstOrDefault(m => m.Id == id);

    public void AddMember(Member member)
    {
        _context.Members.Add(member);
        _context.SaveChanges();
    }
}