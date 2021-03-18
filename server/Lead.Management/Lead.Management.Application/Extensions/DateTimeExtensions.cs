using System;

namespace Lead.Management.Application.Extensions
{
    public static class DateTimeExtensions
    {
        public static string GetDate(this DateTime date)
        {
            return date.ToUniversalTime().ToString("MMMM dd");
        }

        public static string GetTime(this DateTime date)
        {
            return date.ToUniversalTime().ToString("hh:mm tt");
        }
    }
}
