using WebChat.Models;



namespace WebChat.Models
{
    public class AuthResponse
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }


        public AuthResponse(User user, string token)
        {
            Id = user.Id;
            Username = user.Username;
            Token = token;
        }
    }
}