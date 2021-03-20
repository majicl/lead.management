using System.Threading;
using System.Threading.Tasks;
using Lead.Management.Application.Handlers.Leads.Commands;
using Lead.Management.Application.Services.Interfaces;
using Moq;
using Moq.AutoMock;
using Xunit;

namespace Lead.Management.Application.Tests.Handlers.Leads.Commands
{
    public class DeclineLeadTests
    {

        private readonly Mock<ILeadManagementRepository> _leadManagementRepository;
        private readonly Mock<INotificationService> _notificationService;
        private readonly DeclineLead.Handler _target;

        public DeclineLeadTests()
        {
            var mocker = new AutoMocker();
            _leadManagementRepository = mocker.GetMock<ILeadManagementRepository>();
            _notificationService = mocker.GetMock<INotificationService>();
            _target = new DeclineLead.Handler(_leadManagementRepository.Object, _notificationService.Object);
        }

        [Fact]
        public async Task Handle_Calls_DeclineLeadByIdAsync()
        {
            //Arrange 
            var tradieId = 1;
            var command = new DeclineLead.Command(tradieId);

            //Act
            await _target.Handle(command, CancellationToken.None);

            //Assert
            _leadManagementRepository.Verify(_ => _.DeclineLeadByIdAsync(tradieId, CancellationToken.None), Times.Once);
        }

        [Fact]
        public async Task Handle_Calls_NotifyLeadChanges()
        {
            //Arrange 
            var tradieId = 1;
            var command = new DeclineLead.Command(tradieId);
             _leadManagementRepository.Setup(_ => _.DeclineLeadByIdAsync(tradieId, CancellationToken.None));

            //Act
            await _target.Handle(command, CancellationToken.None);

            //Assert
            _notificationService.Verify(_ => _.NotifyLeadChanges(), Times.Once);
        }
    }
}
