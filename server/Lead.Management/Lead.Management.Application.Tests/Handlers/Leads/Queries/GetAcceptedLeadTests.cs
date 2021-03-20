using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lead.Management.Application.Handlers.Leads.Queries;
using Lead.Management.Application.Services.Interfaces;
using Lead.Management.Domain;
using Moq;
using Moq.AutoMock;
using Xunit;

namespace Lead.Management.Application.Tests.Handlers.Leads.Commands
{
    public class GetAcceptedLeadTests
    {

        private readonly Mock<ILeadManagementRepository> _leadManagementRepository;
        private readonly GetAcceptedLead.Handler _target;

        public GetAcceptedLeadTests()
        {
            var mocker = new AutoMocker();
            _leadManagementRepository = mocker.GetMock<ILeadManagementRepository>();
            _target = new GetAcceptedLead.Handler(_leadManagementRepository.Object);
        }

        [Fact]
        public async Task Handle_Calls_GetAcceptedLeadsAsync()
        {
            //Arrange 
            _leadManagementRepository
                .Setup(_ => _.GetAcceptedLeadsAsync(CancellationToken.None))
                .ReturnsAsync(new List<AcceptedLead>());

            //Act
            var query = new GetAcceptedLead.Query();
            await _target.Handle(query, CancellationToken.None);

            //Assert
            _leadManagementRepository.Verify(_ => _.GetAcceptedLeadsAsync(CancellationToken.None), Times.Once);
        }

        [Fact]
        public async Task Handle_Maps_Data()
        {
            //Arrange
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("en-US");
            var lead = new AcceptedLead
            {
                Id = 1,
                Area = "Sydney",
                Category = "Painter",
                ContactEmail = "test@test.com",
                ContactName = "Alex Nouri",
                ContactPhone = "893398498",
                CreatedAt = new System.DateTime(2020, 03, 20, 18, 20, 22).ToUniversalTime(),
                Description = "descp",
                Postcode = "1234",
                Price = 1290

            };
            _leadManagementRepository
                .Setup(_ => _.GetAcceptedLeadsAsync(CancellationToken.None))
                .ReturnsAsync(new List<AcceptedLead> { lead });

            //Act
            var query = new GetAcceptedLead.Query();
            var result = await _target.Handle(query, CancellationToken.None);

            //Assert
            Assert.Single(result);
            var mappedLead = result.First();

            Assert.Equal(lead.Id, mappedLead.Id);
            Assert.Equal(lead.Category, mappedLead.Category);
            Assert.Equal(lead.ContactEmail, mappedLead.ContactEmail);
            Assert.Equal(lead.ContactPhone, mappedLead.ContactPhone);
            Assert.Equal("Alex", mappedLead.ContactFirstName);
            Assert.Equal("Nouri", mappedLead.ContactLastName);
            Assert.Equal("05:20 PM", mappedLead.CreatedAtTime);
            Assert.Equal("March 20", mappedLead.CreatedAtDate);
            Assert.Equal(lead.Description, mappedLead.Description);
        }
    }
}