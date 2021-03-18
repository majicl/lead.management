using System.Threading.Tasks;

namespace Lead.Management.Application.Services.Interfaces
{
    public interface INotificationService
    {
        Task NotifyLeadChanges();
    }
}
