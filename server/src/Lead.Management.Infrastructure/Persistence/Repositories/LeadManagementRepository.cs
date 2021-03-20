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
                ? @"jobs.contact_phone AS ContactPhone,
                    jobs.contact_email AS ContactEmail,"
                : string.Empty;

            return $@"SELECT 
                    jobs.id AS Id,
                    jobs.contact_name AS ContactName,
                    {contactPartialQuery}
                    jobs.description AS Description,
                    jobs.price AS Price,
                    jobs.created_at AS CreatedAt,
                    categories.name as Category, 
                    suburbs.postcode as Postcode,
                    suburbs.name as Area
                    FROM jobs INNER JOIN
                    suburbs ON suburbs.id = jobs.suburb_id INNER JOIN
                    categories ON categories.id = jobs.category_id
                    WHERE jobs.status = '{status}'";
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
                var query = $"UPDATE jobs SET status = 'accepted' Where status = 'new' and id = {id}";
                var result = await c.ExecuteAsync(query, cancellationToken);
                return result;
            });
        }

        public async Task<int> DeclineLeadByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await WithConnection(async c =>
            {
                var query = $"UPDATE jobs SET status = 'declined' Where status = 'new' and id = {id}";
                var result = await c.ExecuteAsync(query, cancellationToken);
                return result;
            });
        }

        public async Task<LeadUpdate> GetLeadUpdateAsync(CancellationToken cancellationToken)
        {
            const string query = @"SELECT (SELECT count(*) FROM jobs
                        WHERE status = 'new'
                        ORDER BY created_at DESC
                        LIMIT 1) AS InvitedCount,
                        (SELECT count(*) FROM jobs
                        WHERE status = 'accepted'
                        ORDER BY updated_at DESC
                        LIMIT 1) AS AcceptedCount,
                        (SELECT created_at FROM jobs
                        WHERE status = 'new'
                        ORDER BY created_at DESC
                        LIMIT 1) AS LastInvited,
                        (SELECT updated_at FROM jobs
                        WHERE status = 'accepted'
                        ORDER BY updated_at DESC
                        LIMIT 1)  AS LastAccepted
                        FROM jobs
                            LIMIT 1";

            return await WithConnection(async c =>
            {
                var result = await c.QueryAsync<LeadUpdate>(query, cancellationToken);

                return result.FirstOrDefault();
            });
        }
    }
}
