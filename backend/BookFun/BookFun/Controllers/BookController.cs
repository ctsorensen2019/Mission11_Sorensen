using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookFun.API.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BookFun.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? category = null)
        {
            string? favBookType = Request.Cookies["FavoriteBookType"];

            var query = _bookContext.Books.AsQueryable();

            if (category != null && category.Any())
            {
                query = query.Where(b => category.Contains(b.Category));
            }

            if (sortOrder.ToLower() == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }
            else
            {
                query = query.OrderBy(b => b.Title);
            }


            var something = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = query.Count();

            var someObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }

        [HttpGet("FictionBooks")]
        public IEnumerable<Book> GetFictionBooks(int pageSize = 10, int pageNum = 1)
        {
            string? fincBookType = Request.Cookies["FictionBookType"];
            Console.WriteLine("~~~~~~~~COOKIE~~~~~~~~~\n" + fincBookType);

            HttpContext.Response.Cookies.Append("FictionBookType", "Victor Hugo", new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1),
            });


            var something = _bookContext.Books.Where(b => b.Classification == "Fiction")
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return something;
        }


        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }
    }
}
