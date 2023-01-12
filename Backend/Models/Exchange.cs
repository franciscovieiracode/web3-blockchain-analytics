using Backend.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Exchange")]
    public class Exchange
    {
        [Key]
        public int ExchangenId { get; set; }

        public String accountName { get; set; }

        public String connectionDescription { get; set; }

        [Required]
        public String ApiKey { get; set; }

        [Required]
        public String ApliSecret { get; set; }

        public String Id { get; set; }

        public virtual ApplicationUser applicationUser { get; set; }
    }
}
