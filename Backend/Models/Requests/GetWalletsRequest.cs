namespace Backend.Models.Requests
{
    public class GetWalletsRequest
    {
        public String walletAddress { get; set; }

        public String? walletName { get; set; }
    }
}
