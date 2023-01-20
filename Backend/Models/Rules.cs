using Backend.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Rules")]
    public class Rules
    {
        [Key]
        public int RulesId { get; set; }
        [Required]
        public String Name { get; set; }
        [Required]
        public String Criteria { get; set; }
        [Required]
        public String Behaviour { get; set; }
        [Required]
        public float Tax { get; set; }

        public String Id { get; set; }
        public virtual ApplicationUser applicationUser { get; set; }
    }
}
