using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lead.Management.Application.Handlers.Leads;
using Lead.Management.Application.Handlers.Leads.Queries;
using MediatR;
namespace Lead.Management.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeadController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LeadController(IMediator mediator) => _mediator = mediator;


        [HttpGet("invited")]
        public async Task<IEnumerable<InvitedLeadDto>> GetInvitedLeads(CancellationToken cancellationToken)
        {
            return await _mediator.Send(new GetInvitedLeads.Query(), cancellationToken);
        }

        [HttpGet("accepted")]
        public async Task<IEnumerable<InvitedLeadDto>> GetAcceptedLeads(CancellationToken cancellationToken)
        {
            return await _mediator.Send(new GetAcceptedLead.Query(), cancellationToken);
        }
    }
}
