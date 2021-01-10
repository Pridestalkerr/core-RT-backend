using System.ComponentModel.DataAnnotations;



namespace WebChat.Models
{
    public class RegisterRequest
    {
    	[Required]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}