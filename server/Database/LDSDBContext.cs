using server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace server.Database
{
	public class LDSDBContext : IdentityDbContext
	{
		public LDSDBContext(DbContextOptions options) : base(options)
		{

		}

		public DbSet<User> Users { get; set; }
	}
}

