using ATSAPI.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.Database;

public interface IAppDbContext
{
	public DbSet<Area> Area { get; set; }
	public DbSet<AreaYear> AreaYear { get; set; }
	public DbSet<Picture> Picture { get; set; }
	public DbSet<Role> Role { get; set; }
	public DbSet<UserAccount> UserAccount { get; set; }
	public DbSet<Year> Year { get; set; }

	public int SaveChanges();
}
