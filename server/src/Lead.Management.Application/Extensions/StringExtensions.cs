using System.Linq;

namespace Lead.Management.Application.Extensions
{
    public static class StringExtensions
    {
        public static string GetFirstPart(this string fullName)
        {
            return fullName.Split(' ')[0];
        }
        public static string GetSecondPart(this string fullName)
        {
            var nameParts = fullName.Split(' ');
            return nameParts.Length > 1 ? string.Join( ' ', nameParts.Skip(1)) : fullName;
        }
    }
}
