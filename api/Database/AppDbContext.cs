using ATSAPI.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.Database;

public class AppDbContext : DbContext, IAppDbContext
{
	public DbSet<Area> Area { get; set; }
	public DbSet<AreaYear> AreaYear { get; set; }
	public DbSet<Picture> Picture { get; set; }
	public DbSet<Role> Role { get; set; }
	public DbSet<UserAccount> UserAccount { get; set; }
	public DbSet<Year> Year { get; set; }

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder.UseSqlServer(
			@"Data Source=localhost;Database=CommunityApp;User ID=sa;Password=testPASS123;Pooling=False;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Authentication=SqlPassword;Application Name=vscode-mssql;Application Intent=ReadWrite;Command Timeout=30");
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		ATSAPI.Database.Entities.Picture.OnModelCreating(modelBuilder);
		ATSAPI.Database.Entities.Area.OnModelCreating(modelBuilder);
	}
}
