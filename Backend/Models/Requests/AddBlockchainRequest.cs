using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests
{
    public class AddBlockchainRequest
    {
        [Required]
        public string WalletName { get; set; }

        [Required]
        public string WalletAddress { get; set; }

        public string Type { get; set; }

    }
}
