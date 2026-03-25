using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.Database.Entities;

public class Year
{
	[Key][Column("YearID")] public int Id { get; set; }
	[Column("Value")] public int Value { get; set; }
	public List<AreaYear> AreaYears { get; set; }

	public static void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Year>()
			.HasMany(e => e.AreaYears)
			.WithOne(e => e.Year);
	}
}
