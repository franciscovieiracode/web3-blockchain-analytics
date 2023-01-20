namespace Backend.Models
{
    public class TransactionData
    {
        public string blockNumber { get; set; }
        public string timeStamp { get; set; }
        public string hash { get; set; }
        public string blockHash { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public string value { get; set; }
        public string gas { get; set; }
        public string gasPrice { get; set; }
        public string gasUsed { get; set; }
        public string address { get; set; }
        public string criteria { get; set; }
        public string Id { get; set; }
    }
}
