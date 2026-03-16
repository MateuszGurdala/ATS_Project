using System.ComponentModel.DataAnnotations.Schema;

namespace ATSAPI.Databaase.Entities;

public class Area
{
	[Column("AreaID")] public int Id { get; set; }
	[Column("ParentID")] public int? ParentId { get; set; }
	[Column("Name")] public string Name { get; set; }
	public List<AreaYear> AreaYears { get; set; }
	public Area? Parent { get; set; }
}
