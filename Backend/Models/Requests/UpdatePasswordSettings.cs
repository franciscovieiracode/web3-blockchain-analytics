using Microsoft.AspNetCore.Mvc;

namespace Backend.Models.Requests
{
    public class UpdatePasswordSettings
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
