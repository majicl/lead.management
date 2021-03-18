using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using Lead.Management.Application.Services.Interfaces;
using Lead.Management.Domain;

namespace Lead.Management.Infrastructure.Persistence.Repositories
{
    public class LeadManagementRepository : DapperDbContextAsync, ILeadManagementRepository
    {
        public LeadManagementRepository(string connectionString) : base(connectionString)
        {
        }

        public async Task<ICollection<InvitedLead>> GetInvitedLeadsAsync(CancellationToken cancellationToken)
        {
            return await WithConnection(async c =>
            {
                const string query = "";
                var result = await c.QueryAsync<InvitedLead>(query, cancellationToken);

                return result.ToList();
            });
        }
    }
}
