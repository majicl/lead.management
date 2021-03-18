using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lead.Management.Application.Handlers.Leads;
using Lead.Management.Application.Handlers.Leads.Commands;
using Lead.Management.Application.Handlers.Leads.Queries;
using MediatR;
namespace Lead.Management.API.Controllers
{
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class LeadController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LeadController(IMediator mediator) => _mediator = mediator;


        [HttpGet("invited")]
        [ProducesResponseType(200)]
        public async Task<IEnumerable<InvitedLeadDto>> GetInvitedLeads(CancellationToken cancellationToken)
        {
            return await _mediator.Send(new GetInvitedLeads.Query(), cancellationToken);
        }

        [HttpGet("accepted")]
        [ProducesResponseType(200)]
        public async Task<IEnumerable<InvitedLeadDto>> GetAcceptedLeads(CancellationToken cancellationToken)
        {
            return await _mediator.Send(new GetAcceptedLead.Query(), cancellationToken);
        }

        [HttpPut("accept/{id:int}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> AcceptLead(int id, CancellationToken cancellationToken)
        {
             await _mediator.Send(new AcceptLead.Command(id), cancellationToken);

             return Ok();
        }

        [HttpPut("decline/{id:int}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeclineLead(int id, CancellationToken cancellationToken)
        {
            await _mediator.Send(new DeclineLead.Command(id), cancellationToken);

            return Ok();
        }
    }
}
