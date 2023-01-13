using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests
{
    public class AddExchangeRequest
    {
        [Required]
        public String accountName { get; set; }

        public String? connectionDescription { get; set; }

        [Required]
        public String ApiKey { get; set; }

        [Required]
        public String ApliSecret { get; set; }
    }
}
