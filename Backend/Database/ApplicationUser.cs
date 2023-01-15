using Backend.Models;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace Backend.Database
{
    public class ApplicationUser : IdentityUser
    {
        public String firstName { get; set; }

        public String lastName { get; set; }

        public string currency { get; set; }

        public virtual String img { get; set; }

        public virtual String typeUser { get; set; }

        public virtual DateTime lastVisit { get; set; }

        [JsonIgnore]
        public virtual List<Blockchain> blockchains { get; set; }
        [JsonIgnore]
        public virtual List<Exchange> exchanges { get; set; }
        [JsonIgnore]
        public virtual List<Metamask> metamasks { get; set; }
    }
}