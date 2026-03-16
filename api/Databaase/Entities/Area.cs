using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ATSAPI.Databaase.Entities;

public class Area
{
	[Key] [Column("AreaID")] public int Id { get; set; }
	[Column("ParentID")] public int? ParentId { get; set; }
	[Column("Name")] public string Name { get; set; }
	public List<AreaYear> AreaYears { get; set; }
	public List<Picture>? Pictures { get; set; }
	public Area? Parent { get; set; }
}
