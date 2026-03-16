using ATSAPI.Databaase.Entities;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.Databaase;

public interface IAppDbContext
{
	public DbSet<Year> Year { get; set; }
	public DbSet<Area> Area { get; set; }
	public DbSet<AreaYear> AreaYear { get; set; }
}
