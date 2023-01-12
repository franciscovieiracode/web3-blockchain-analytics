using Backend.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Metamask")]
    public class Metamask
    {
        [Key]
        public int MetamaskId { get; set; }

        [Required]
        public String WalletAddress { get; set; }

        public String Id { get; set; }

        public virtual ApplicationUser applicationUser { get; set; }
    }
}
