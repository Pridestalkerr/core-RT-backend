using Microsoft.AspNetCore.Mvc;
using WebChat.Models;
using WebChat.Services;
using System;
using System.Threading.Tasks;



namespace WebChat.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task <ActionResult <AuthResponse>> Authenticate(AuthRequest model)
        {
            var response = await _userService.Authenticate(model);

            if (response == null) {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            return Ok(response);
        }

        [HttpPost("login/verifyToken")]
        public async Task <ActionResult <AuthResponse>> VerifyToken()
        {
            Console.WriteLine(HttpContext.Items["User"]);

            if (HttpContext.Items["User"] == null) {
                return BadRequest();
            }

            return Ok(HttpContext.Items["User"]);
        }

        [HttpPost("register")]
        public async Task <ActionResult <AuthResponse>> Register(User model)
        {
            var response = await _userService.Register(model);

            if (response == null) {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            return Ok(response);
        }

        // [Authorize]
        // [HttpGet]
        // public IActionResult GetAll()
        // {
        //     var users = _userService.GetAll();
        //     return Ok(users);
        // }
    }
}