using Backend.Database;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models
{
    public class PutProfileResult
    {
        public ApplicationUser user { get; set; }

        public Boolean result { get; set; }

        public string message { get; set; }
    }
}
