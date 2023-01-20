using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests
{
    public class AddRulesRequest
    {

        public String? Name { get; set; }

        public String? Description { get; set; }

        public String? Criteria { get; set; }

        public String? Behaviour { get; set; }

        public decimal? Tax { get; set; }
    }
}
