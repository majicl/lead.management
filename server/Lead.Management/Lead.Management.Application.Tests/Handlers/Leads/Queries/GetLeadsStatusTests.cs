using System.Threading;
using System.Threading.Tasks;
using Lead.Management.Application.Handlers.Leads.Queries;
using Lead.Management.Application.Services.Interfaces;
using Moq;
using Moq.AutoMock;
using Xunit;

namespace Lead.Management.Application.Tests.Handlers.Leads.Commands
{
    public class GetLeadsStatusTests
    {

        private readonly Mock<ILeadManagementRepository> _leadManagementRepository;
        private readonly GetLeadsStatus.Handler _target;

        public GetLeadsStatusTests()
        {
            var mocker = new AutoMocker();
            _leadManagementRepository = mocker.GetMock<ILeadManagementRepository>();
            _target = new GetLeadsStatus.Handler(_leadManagementRepository.Object);
        }

        [Fact]
        public async Task Handle_Calls_GetLeadUpdateAsync()
        {
            //Arrange 
            _leadManagementRepository
                .Setup(_ => _.GetLeadUpdateAsync(CancellationToken.None));

            //Act
            var query = new GetLeadsStatus.Query();
            await _target.Handle(query, CancellationToken.None);

            //Assert
            _leadManagementRepository.Verify(_ => _.GetLeadUpdateAsync(CancellationToken.None), Times.Once);
        }
    }
}