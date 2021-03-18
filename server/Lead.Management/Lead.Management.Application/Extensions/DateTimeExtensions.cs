using System;

namespace Lead.Management.Application.Extensions
{
    public static class DateTimeExtensions
    {
        public static string GetDate(this DateTime date)
        {
            return date.ToUniversalTime().ToShortDateString();
        }

        public static string GetTime(this DateTime date)
        {
            return date.ToUniversalTime().ToShortTimeString();
        }
    }
}
