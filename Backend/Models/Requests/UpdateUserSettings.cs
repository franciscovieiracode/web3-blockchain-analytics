using Microsoft.AspNetCore.Mvc;

namespace Backend.Models.Requests
{
    public class UpdateUserSettings
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
