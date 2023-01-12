using Microsoft.AspNetCore.Mvc;

namespace Backend.Models
{
    public class UpdateUser
    {
        public Guid UserId { get; set; }
        public string? Img { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? UserRole { get; set; }
        public string? LastVisitme { get; set; }

    }
}
