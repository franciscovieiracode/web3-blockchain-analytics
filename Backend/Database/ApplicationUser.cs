using Backend.Models;
using Microsoft.AspNetCore.Identity;

namespace Backend.Database
{
    public class ApplicationUser : IdentityUser
    {
        public String firstName { get; set; }

        public String lastName { get; set; }

        public string currency { get; set; }

        public virtual List<Blockchain> blockchains { get; set; }

        public virtual List<Exchange> exchanges { get; set; }

        public virtual List<Metamask> metamasks { get; set; }

    }
}
