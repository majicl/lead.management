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
    public class GetAcceptedLead
    {
        public class Query : IRequest<ICollection<AcceptedLeadDto>>
        {
        }

        public class Handler : IRequestHandler<Query, ICollection<AcceptedLeadDto>>
        {
            private readonly ILeadManagementRepository _leadManagementRepository;
            public Handler(ILeadManagementRepository leadManagementRepository)
            {
                _leadManagementRepository = leadManagementRepository;
            }

            public async Task<ICollection<AcceptedLeadDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _leadManagementRepository.GetAcceptedLeadsAsync(cancellationToken);

                return Map(result);
            }

            //Todo: Could be AutoMapper Instead
            private static ICollection<AcceptedLeadDto> Map(IEnumerable<AcceptedLead> invitedLeads)
            {
                return invitedLeads.Select(lead => new AcceptedLeadDto
                {
                    Id = lead.Id,
                    Category = lead.Category,
                    Description = lead.Description,
                    Price = lead.Price.ToCurrency(),
                    Suburb = $"{lead.Area} {lead.Postcode}",
                    CreatedAtDate = lead.CreatedAt.GetDate(),
                    CreatedAtTime = lead.CreatedAt.GetTime(),
                    ContactFirstName = lead.ContactName.GetFirstPart(),
                    ContactLastName = lead.ContactName.GetSecondPart(),
                    ContactEmail = lead.ContactEmail,
                    ContactPhone = lead.ContactPhone
                }).ToList();
            }
        }
    }


}
