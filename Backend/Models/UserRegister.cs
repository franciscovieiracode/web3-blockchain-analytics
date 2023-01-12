using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
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

    }
}
