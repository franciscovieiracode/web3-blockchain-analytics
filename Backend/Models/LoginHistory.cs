using Backend.Database;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    [Table("LoginHistory")]
    public class LoginHistory
    {
        [Key]
        public int idLogin { get; set; }
        public String browser { get; set; }
        public String ip { get; set; }
        public String data { get; set; }
        public String Id { get; set; }
        public virtual ApplicationUser applicationUser { get; set; }
    }
}
