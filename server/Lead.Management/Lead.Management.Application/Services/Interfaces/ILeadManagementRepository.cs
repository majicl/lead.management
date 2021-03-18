using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lead.Management.Domain;

namespace Lead.Management.Application.Services.Interfaces
{
    public interface ILeadManagementRepository
    {
        Task<ICollection<InvitedLead>> GetInvitedLeadsAsync(CancellationToken cancellationToken);
        Task<ICollection<AcceptedLead>> GetAcceptedLeadsAsync(CancellationToken cancellationToken);
    }
}
