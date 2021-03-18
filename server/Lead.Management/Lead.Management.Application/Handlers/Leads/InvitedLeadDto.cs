namespace Lead.Management.Application.Handlers.Leads
{
    public class InvitedLeadDto
    {
        public int Id { get; set; }
        public string ContactFirstName { get; set; }
        public string Category { get; set; }
        public string Suburb { get; set; }
        public string Description { get; set; }
        public string CreatedAtDate { get; set; }
        public string CreatedAtTime { get; set; }
        public decimal Price { get; set; }
    }
}
