using Library.Application.UseCases;
using Library.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly MemberUsecases _uc;

        public MemberController(MemberUsecases uc)
        {
            _uc = uc;
        }
        [HttpPost]
        public IActionResult Register(Member member)
        {
            if (member == null)
                return BadRequest();

            _uc.AddMember(member);

            return Ok();
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var members = _uc.GetAllMembers();
            return Ok(members);
        }
    }
}
