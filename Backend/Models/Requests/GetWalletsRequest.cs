namespace Backend.Models.Requests
{
    public class GetWalletsRequest
    {
        public String? walletAddress { get; set; }

        public String? accountName { get; set; }

        public String? apiKey { get; set; }

        public String? apiSecret { get; set; }
    }
}
