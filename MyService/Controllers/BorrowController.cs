using Library.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Library.Application.UseCases;

namespace MyService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowController : ControllerBase
    {
        private readonly BorrowUseCases _uc;

        public BorrowController(BorrowUseCases uc)
        {
            _uc = uc;
        }
        [HttpPost]
        public IActionResult BorrowBook([FromBody] BorrowRecord record)
        {
            try
            {
                _uc.BorrowBook(record.BookId, record.MemberId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

    
        [HttpPut("return/{recordId}")]
        public IActionResult ReturnBook(int recordId)
        {
            try
            {
                _uc.ReturnBook(recordId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("member/{memberId}")]
        public IActionResult GetHistory(int memberId)
        {
            var records = _uc.GetMemberBorrowHistory(memberId);
            return Ok(records);
        }
        [HttpGet("topMembers")]
        public IActionResult GetTopMembers()
        {
            var members = _uc.GetTopMembers(); 
            return Ok(members);
        }

        [HttpGet("groupBymember")]
        public IActionResult GetGroupedBorrowRecords()
        {
            var groups = _uc.GroupBorrowRecordsByMember();
            return Ok(groups); 
        }

        
        
    }
}