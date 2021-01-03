using Microsoft.AspNetCore.Mvc;
using WebChat.Models;
using WebChat.Services;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using System.Threading.Tasks;



namespace WebChat.Controllers
{
    [Route("api/message")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly MessageService _messageService;

        public MessageController(MessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet("all")]
        public ActionResult <IEnumerable <Message>> get()
        {
            return null;
        }

        [HttpGet("{id}")]
        public string getById(string id)
        {
            return id;
        }

        [HttpPost]
        public async Task <ActionResult <Message>> create(Message msg)
        {
            await _messageService.Create(msg);
            return Ok(msg);
        }

    }
}