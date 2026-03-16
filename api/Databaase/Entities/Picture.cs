using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ATSAPI.Databaase.Entities;

public class Picture
{
	[Key][Column("PictureID")] public long Id { get; set; }
	[Column("AreaID")] public int AreaId { get; set; }
	[Column("Extension")] public string Extension { get; set; }
	[Column("Title")] public string Title { get; set; }
	[Column("Description")] public string? Description { get; set; }
	public Area Area { get; set; }
}
