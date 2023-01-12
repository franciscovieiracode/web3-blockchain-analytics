using Backend.Database;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models
{
    public class GetProfileResult
    {
        public ApplicationUser user { get; set; }

        public Boolean result { get; set; }
    }
}
