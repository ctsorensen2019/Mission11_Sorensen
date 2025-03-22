using BookFun.API.Data;
using Microsoft.EntityFrameworkCore;

namespace BookFun.API.Data
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
    }
}
