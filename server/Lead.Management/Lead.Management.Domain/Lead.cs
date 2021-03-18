using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lead.Management.Domain
{
    public class Lead
    {
        public int Id { get; set; }
        public string ContactName { get; set; }
        public string Category { get; set; }
        public string Suburb { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal Price { get; set; }
    }
}
