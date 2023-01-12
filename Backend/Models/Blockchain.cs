using Backend.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Blockchain")]
    public class Blockchain
    {
        [Key]
        public int BlockchainId { get; set; }
        public String WalletName { get; set; }

        [Required]
        public String WalletAddress { get; set; }
    
        public String Id { get; set; }

        public virtual ApplicationUser applicationUser { get; set; }
    }

}
