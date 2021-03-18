using System.Threading;
using System.Threading.Tasks;
using Lead.Management.Application.Services.Interfaces;
using MediatR;

namespace Lead.Management.Application.Handlers.Leads.Commands
{
    public class DeclineLead
    {
        public class Command : IRequest
        {
            public int Id { get; }

            public Command(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ILeadManagementRepository _leadManagementRepository;
            private readonly INotificationService _notificationService;
            public Handler(ILeadManagementRepository leadManagementRepository, INotificationService notificationService)
            {
                _leadManagementRepository = leadManagementRepository;
                _notificationService = notificationService;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                await _leadManagementRepository.DeclineLeadByIdAsync(request.Id, cancellationToken);
                await _notificationService.NotifyLeadChanges();

                return Unit.Value;
            }
        }
    }
}
