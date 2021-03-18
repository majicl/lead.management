using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lead.Management.Application.Extensions;
using Lead.Management.Application.Services.Interfaces;
using Lead.Management.Domain;
using MediatR;

namespace Lead.Management.Application.Handlers.Leads.Queries
{
    public class GetInvitedLeads
    {
        public class Query : IRequest<ICollection<InvitedLeadDto>>
        {
        }

        public class Handler : IRequestHandler<Query, ICollection<InvitedLeadDto>>
        {
            private readonly ILeadManagementRepository _leadManagementRepository;
            public Handler(ILeadManagementRepository leadManagementRepository)
            {
                _leadManagementRepository = leadManagementRepository;
            }

            public async Task<ICollection<InvitedLeadDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _leadManagementRepository.GetInvitedLeadsAsync(cancellationToken);

                return Map(result);
            }

            private static ICollection<InvitedLeadDto> Map(IEnumerable<InvitedLead> invitedLeads)
            {
                return invitedLeads.Select(lead => new InvitedLeadDto
                {
                    Id = lead.Id,
                    Category = lead.Category,
                    Description = lead.Description,
                    Price = lead.Price,
                    Suburb = lead.Suburb,
                    CreatedAtDate = lead.CreatedAt.GetDate(),
                    CreatedAtTime = lead.CreatedAt.GetTime(),
                    ContactFirstName = lead.ContactName.GetFirstPart()
                }).ToList();
            }
        }
    }


}
