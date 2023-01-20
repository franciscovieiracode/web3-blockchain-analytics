namespace Backend.Models
{
    public class AddRulesResult
    {
        public String rules { get; set; }
        public List<Object> listRules { get; set; }
        public Boolean result { get; set; }
        public String reason { get; set; }
    }
}
