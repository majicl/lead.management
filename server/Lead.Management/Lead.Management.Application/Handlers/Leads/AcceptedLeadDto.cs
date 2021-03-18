namespace Lead.Management.Application.Handlers.Leads
{
    public class AcceptedLeadDto : InvitedLeadDto
    {
        public string ContactLastName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
    }
}
