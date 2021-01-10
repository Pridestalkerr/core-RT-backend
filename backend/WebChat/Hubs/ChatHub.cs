using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

using WebChat.Hubs.Clients;
using WebChat.Models;
using WebChat.Services;
using System;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;



namespace WebChat.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        private readonly MessageService _messageService;
        private readonly UserService _userService;

        public ChatHub(MessageService messageService, UserService userService)
        {
            _messageService = messageService;
            _userService = userService;
        }

        public async Task SendMessage(Message msg)
        {
            var token = msg.Token;
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                // var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var key = Encoding.ASCII.GetBytes("dkjasihughcdahjszbgdhjasz");
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Claims.First(x => x.Type == "id").Value;

                // attach user to context on successful jwt validation
                var user = await _userService.Get(userId);

                msg.From = user.Username;
                await _messageService.Create(msg);
                await Clients.All.ReceiveMessage(msg);

            } catch {
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }
        }
    }
}