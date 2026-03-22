using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.Database.Entities;

[PrimaryKey(nameof(AreaId), nameof(YearId))]
public class AreaYear
{
	[Column("AreaID")] public int AreaId { get; set; }
	[Column("YearID")] public int YearId { get; set; }
	public Area Area { get; set; }
	public Year Year { get; set; }
}
