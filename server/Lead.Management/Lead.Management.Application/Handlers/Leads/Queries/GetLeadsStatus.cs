using System.Threading;
using System.Threading.Tasks;
using Lead.Management.Application.Services.Interfaces;
using Lead.Management.Domain;
using MediatR;

namespace Lead.Management.Application.Handlers.Leads.Queries
{
    public class GetLeadsStatus
    {
        public class Query : IRequest<LeadUpdate>
        {
        }

        public class Handler : IRequestHandler<Query, LeadUpdate>
        {
            private readonly ILeadManagementRepository _leadManagementRepository;
            public Handler(ILeadManagementRepository leadManagementRepository)
            {
                _leadManagementRepository = leadManagementRepository;
            }

            public async Task<LeadUpdate> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _leadManagementRepository.GetLeadUpdateAsync(cancellationToken);

                return result;
            }
        }
    }
}
