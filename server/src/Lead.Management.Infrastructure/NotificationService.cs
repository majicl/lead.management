using System.Threading;
using System.Threading.Tasks;
using Lead.Management.Application.Services.Interfaces;
using Lead.Management.Infrastructure.Socket;
using Microsoft.AspNetCore.SignalR;

namespace Lead.Management.Infrastructure
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<LeadHub> _hub;
        private readonly ILeadManagementRepository _leadManagementRepository;
        public NotificationService(IHubContext<LeadHub> hub, ILeadManagementRepository leadManagementRepository)
        {
            _hub = hub;
            _leadManagementRepository = leadManagementRepository;
        }
        public async Task NotifyLeadChanges()
        {
            var leadUpdate = await _leadManagementRepository.GetLeadUpdateAsync(CancellationToken.None);
            await _hub
                             .Clients
                             .All
                             .SendAsync(nameof(NotifyLeadChanges), leadUpdate, CancellationToken.None);
        }
    }
}
