using System.Collections.Generic;
using System.Linq;
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

        // Todo: Majid: Don't like to maintain queries 🤦‍♂️! Use an ORM
        private static string GetQuery(string status, bool contactIncluded = false)
        {
            var contactPartialQuery = contactIncluded
                ? @"hipages.jobs.contact_phone AS ContactPhone,
                    hipages.jobs.contact_email AS ContactEmail,"
                : string.Empty;

            return $@"SELECT 
                    hipages.jobs.id AS Id,
                    hipages.jobs.contact_name AS ContactName,
                    {contactPartialQuery}
                    hipages.jobs.description AS Description,
                    hipages.jobs.price AS Price,
                    hipages.jobs.created_at AS CreatedAt,
                    hipages.categories.name as Category, 
                    hipages.suburbs.postcode as Postcode,
                    hipages.suburbs.name as Area
                    FROM hipages.jobs INNER JOIN
                    hipages.suburbs ON hipages.suburbs.id = hipages.jobs.suburb_id INNER JOIN
                    hipages.categories ON hipages.categories.id = hipages.jobs.category_id
                    WHERE hipages.jobs.status = '{status}'";
        }


        public async Task<ICollection<AcceptedLead>> GetAcceptedLeadsAsync(CancellationToken cancellationToken)
        {
            return await WithConnection(async c =>
            {
                var query = GetQuery("accepted", true);
                var result = await c.QueryAsync<AcceptedLead>(query, cancellationToken);

                return result.ToList();
            });
        }

        public async Task<ICollection<InvitedLead>> GetInvitedLeadsAsync(CancellationToken cancellationToken)
        {
            return await WithConnection(async c =>
            {
                var query = GetQuery("new");
                var result = await c.QueryAsync<InvitedLead>(query, cancellationToken);

                return result.ToList();
            });
        }

        public async Task<int> AcceptLeadByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await WithConnection(async c =>
            {
                var query = $"UPDATE hipages.jobs SET status = 'accepted' Where status = 'new' and id = {id}";
                var result = await c.ExecuteAsync(query, cancellationToken);
                return result;
            });
        }

        public async Task<int> DeclineLeadByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await WithConnection(async c =>
            {
                var query = $"UPDATE hipages.jobs SET status = 'declined' Where status = 'new' and id = {id}";
                var result = await c.ExecuteAsync(query, cancellationToken);
                return result;
            });
        }
    }
}
