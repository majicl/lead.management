using System.Globalization;

namespace Lead.Management.Application.Extensions
{
    public static class NumberExtensions
    {
        public static string ToCurrency(this decimal number)
        {
            //Todo: Need to use an integrated localization
            return number.ToString("C2", new CultureInfo("en-US"));
        }
    }
}
