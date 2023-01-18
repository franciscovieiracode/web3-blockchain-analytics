using System.Numerics;

namespace Backend.Models
{
    public class GetDetailsWallet
    {
        public Boolean result { get; set; }

        public String reason { get; set; }

        public String balance { get; set; }

        public String profit { get; set; }

        public String totalInvested { get; set; }

        public String CoinDetail { get;set; }

        public String priceCoin { get; set; }
    }
}
