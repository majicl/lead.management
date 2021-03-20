using Lead.Management.Application.Services.Interfaces;
using Lead.Management.Infrastructure.Persistence.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Lead.Management.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ILeadManagementRepository>(sp => new LeadManagementRepository(configuration.GetConnectionString("LeadManagementConnection")));
            services.AddTransient<INotificationService, NotificationService>();

            return services;
        }
    }
}
