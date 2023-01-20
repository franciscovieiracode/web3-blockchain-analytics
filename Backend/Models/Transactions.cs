using Backend.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Transactions")]
    public class Transactions
    {
        [Key]
        public String hash { get; set; }
        public String blockNumber { get; set; }
        public String timeStamp { get; set; }
        public String blockHash { get; set; }
        public String from { get; set; }
        public String to { get; set; }
        public String value { get; set; }
        public String gas { get; set; }
        public String gasPrice { get; set; }
        public String gasUsed { get; set; }
        public String address { get; set; }
        public String criteria { get; set; }
        public String Id { get; set; }
        public virtual ApplicationUser applicationUser { get; set; }
    }
}
