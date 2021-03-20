using System;

namespace Lead.Management.Domain
{
   public class LeadUpdate
    {
        public int InvitedCount { get; set; }
        public int AcceptedCount { get; set; }
        public DateTime LastAccepted { get; set; }
        public DateTime LastInvited { get; set; }
    }
}
