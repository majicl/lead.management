using System;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;

namespace Lead.Management.Infrastructure.Persistence
{
    public abstract class DapperDbContextAsync
    {
        private readonly string _connectionString;

        protected DapperDbContextAsync(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<T> WithConnection<T>(Func<IDbConnection, Task<T>> execute)
        {
            try
            {
                await using var connection = new MySqlConnection(_connectionString);
                await connection.OpenAsync();

                return
                    await execute(connection);
            }
            catch (TimeoutException ex)
            {
                throw new Exception($"{GetType().FullName}.WithConnection() experienced a SQL timeout", ex);
            }
            catch (SqlException ex)
            {
                throw new Exception(
                    $"{GetType().FullName}.WithConnection() experienced a SQL exception (not a timeout)", ex);
            }
        }
    }
}
