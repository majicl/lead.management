using System;

namespace Lead.Management.Domain
{
    public class Lead
    {
        public int Id { get; set; }
        public string ContactName { get; set; }
        public string Category { get; set; }
        public string Postcode { get; set; }
        public string Area { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal Price { get; set; }
    }
}
