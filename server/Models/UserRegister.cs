using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class UserRegister
    {
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string PasswordConfirmation { get; set; }

        [Required]
        public string test { get; set; }

    }
}
