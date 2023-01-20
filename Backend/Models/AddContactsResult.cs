namespace Backend.Models
{
    public class AddContactsResult
    {
        public String contacts { get; set; }
        public List<Object> listAddress { get; set; }
        public Boolean result { get; set; }
        public String reason { get; set; }
    }
}
