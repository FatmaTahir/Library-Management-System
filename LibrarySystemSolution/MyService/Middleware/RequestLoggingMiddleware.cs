using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace MyService.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var endpoint = context.Request.Path;
            var time = DateTime.Now;

            Console.WriteLine($"Request: {endpoint} | Time: {time}");

            await _next(context); 
        }
    }
}