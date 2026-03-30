using ATSAPI.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.Database;

public class AppDbContext(IConfiguration configuration) : DbContext, IAppDbContext
{
	public DbSet<Area> Area { get; set; }
	public DbSet<AreaYear> AreaYear { get; set; }
	public DbSet<Picture> Picture { get; set; }
	public DbSet<Role> Role { get; set; }
	public DbSet<UserAccount> UserAccount { get; set; }
	public DbSet<Year> Year { get; set; }

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder.UseSqlServer(configuration.GetValue<string>("Database:ConnectionString"));
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		ATSAPI.Database.Entities.Picture.OnModelCreating(modelBuilder);
		ATSAPI.Database.Entities.Area.OnModelCreating(modelBuilder);
	}
}
