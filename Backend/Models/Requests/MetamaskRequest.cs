using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests
{
    public class MetamaskRequest
    {
        [Required]
        public String WalletAddress { get; set; }
    }
}
