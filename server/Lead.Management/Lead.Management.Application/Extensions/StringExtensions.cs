namespace Lead.Management.Application.Extensions
{
    public static class StringExtensions
    {
        public static string GetFirstPart(this string fullName)
        {
            return fullName.Split(' ')[0];
        }
    }
}
