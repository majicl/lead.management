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
            public Handler(ILeadManagementRepository leadManagementRepository)
            {
                _leadManagementRepository = leadManagementRepository;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                await _leadManagementRepository.DeclineLeadByIdAsync(request.Id, cancellationToken);

                return Unit.Value;
            }
        }
    }
}
