
namespace Backend.Models
{
    public class AddTransactionsResult
    {
        public string status { get; set; }
        public string message { get; set; }
        public List<Object> result { get; set; }
        public string priceCoin { get; set; }
    }
}
