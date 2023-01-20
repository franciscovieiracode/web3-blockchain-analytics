using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests
{
    public class AddContactsRequest
    {
        [Required]
        public String WalletAddress { get; set; }

        [Required]
        public String WalletName { get; set; }
    }
}
