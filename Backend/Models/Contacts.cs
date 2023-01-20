using Backend.Database;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Contacts
    {
        [Key]
        public int ContactId { get; set; }

        [Required]
        public String WalletAddress { get; set; }

        [Required]
        public String WalletName { get; set; }

        public String Id { get; set; }

        public virtual ApplicationUser applicationUser { get; set; }
    }
}
