using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using WebChat.Utils;
using WebChat.Models;
using System.Threading.Tasks;
using MongoDB.Driver;



namespace WebChat.Services
{
    public class UserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private readonly IMongoCollection <User> _users;

        public UserService(IDBSettings settings)
        {
            var client = new MongoClient(settings.Uri);
            var database = client.GetDatabase(settings.DBName);

            _users = database.GetCollection<User>(settings.Users);
        }

        public async Task <AuthResponse> Authenticate(AuthRequest model)
        {
            Console.WriteLine(model.Password);
            var user = await _users.Find<User>(user =>
                user.Username == model.Username && user.Password == model.Password
            ).FirstOrDefaultAsync();

            Console.WriteLine(user);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            Console.WriteLine(user.Id);

            return new AuthResponse(user, token);
        }

        public async Task <AuthResponse> Register(User model)
        {
            await _users.InsertOneAsync(model);

            // authentication successful so generate jwt token
            var token = generateJwtToken(model);

            return new AuthResponse(model, token);
        }

        public async Task <User> Get(string id)
        {
            return await _users.Find<User>(message =>
                message.Id == id
            ).FirstOrDefaultAsync();
        }

        // helper methods

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("dkjasihughcdahjszbgdhjasz");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}