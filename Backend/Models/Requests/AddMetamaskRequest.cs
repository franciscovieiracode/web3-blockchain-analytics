using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests
{
    public class AddMetamaskRequest
    {
        [Required]
        public String WalletAddress { get; set; }
    }
}
